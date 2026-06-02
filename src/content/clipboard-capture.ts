import { MessageType } from '../lib/types';
import type { ClipCapturedPayload } from '../lib/types';

// Reloading or updating the extension orphans this content script in tabs that
// were already open: chrome.runtime is then dead and sendMessage throws. Guard
// against it so copying in a stale tab fails silently instead of erroring.
function extensionAlive(): boolean {
  try {
    return Boolean(chrome.runtime?.id);
  } catch {
    return false;
  }
}

function isPasswordField(): boolean {
  const active = document.activeElement;
  if (!active) return false;

  if (active instanceof HTMLInputElement && active.type === 'password') return true;

  if (active.shadowRoot) {
    const inner = active.shadowRoot.activeElement;
    if (inner instanceof HTMLInputElement && inner.type === 'password') return true;
  }

  const ariaLabel = active.getAttribute('aria-label')?.toLowerCase() ?? '';
  if (ariaLabel.includes('password')) return true;

  return false;
}

function getRichContent(): string | undefined {
  const selection = window.getSelection();
  if (!selection || selection.rangeCount === 0) return undefined;

  try {
    const range = selection.getRangeAt(0);
    const fragment = range.cloneContents();
    const div = document.createElement('div');
    div.appendChild(fragment);
    const html = div.innerHTML;
    if (html && html !== div.textContent) return html;
  } catch {
    // Shadow DOM or restricted context
  }

  return undefined;
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (sender.id !== chrome.runtime.id) return false;

  if (message.type === MessageType.WRITE_CLIPBOARD) {
    navigator.clipboard.writeText(message.payload.text)
      .then(() => sendResponse({ success: true }))
      .catch(() => sendResponse({ success: false }));
    return true;
  }

  if (message.type === MessageType.WRITE_CLIPBOARD_IMAGE) {
    fetch(message.payload.url)
      .then((r) => r.blob())
      .then((blob) => {
        const mimeType = blob.type || 'image/png';
        return navigator.clipboard.write([new ClipboardItem({ [mimeType]: blob })]);
      })
      .then(() => sendResponse({ success: true }))
      .catch(() => sendResponse({ success: false }));
    return true;
  }
});

document.addEventListener('copy', () => {
  if (!extensionAlive()) return;
  if (isPasswordField()) return;

  const text = window.getSelection()?.toString();
  if (!text || text.trim().length === 0) return;

  const payload: ClipCapturedPayload = {
    content: text,
    richContent: getRichContent(),
    sourceUrl: location.href,
    sourceTitle: document.title,
  };

  try {
    chrome.runtime.sendMessage({
      type: MessageType.CLIP_CAPTURED,
      payload,
    });
  } catch {
    // Extension was reloaded; this orphaned content script can't reach it.
  }
});
