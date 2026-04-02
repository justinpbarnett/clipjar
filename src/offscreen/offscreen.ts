import { MessageType } from '../lib/types';

chrome.runtime.onMessage.addListener((msg, _sender, sendResponse) => {
  if (msg.type === MessageType.WRITE_CLIPBOARD) {
    const textarea = document.getElementById('cb');
    if (!(textarea instanceof HTMLTextAreaElement)) {
      sendResponse({ success: false });
      return false;
    }
    textarea.value = msg.payload.text;
    textarea.select();
    const success = document.execCommand('copy');
    sendResponse({ success });
    return false;
  }

  if (msg.type === MessageType.WRITE_CLIPBOARD_IMAGE) {
    fetch(msg.payload.url)
      .then((r) => r.blob())
      .then((blob) => {
        const mimeType = blob.type || 'image/png';
        return navigator.clipboard.write([new ClipboardItem({ [mimeType]: blob })]);
      })
      .then(() => sendResponse({ success: true }))
      .catch(() => sendResponse({ success: false }));
    return true;
  }

  return false;
});
