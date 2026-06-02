// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { initApp } from '../src/popup/App';
import { MessageType, ClipType, type ClipEntry, type UserSettings } from '../src/lib/types';
import { DEFAULT_SETTINGS } from '../src/lib/constants';

function makeClip(id: string, pinned = false): ClipEntry {
  return {
    id,
    content: `Content of ${id}`,
    type: ClipType.PlainText,
    sourceUrl: '',
    sourceTitle: '',
    timestamp: Date.now(),
    pinned,
    isSnippet: false,
    hash: id,
    charCount: 10,
  };
}

const testClips = [makeClip('c1', false), makeClip('c2', true)];

function setupChrome(opts: { togglePinRejects?: boolean; settings?: Partial<UserSettings> } = {}) {
  (globalThis as unknown as { chrome: unknown }).chrome = {
    runtime: {
      id: 'test-clipjar-id',
      sendMessage: vi.fn((msg: { type: MessageType }) => {
        if (msg.type === MessageType.GET_CLIPS) return Promise.resolve([...testClips]);
        if (msg.type === MessageType.CLIP_COUNT) return Promise.resolve({ count: 2 });
        if (msg.type === MessageType.GET_SETTINGS) {
          return Promise.resolve({ ...DEFAULT_SETTINGS, ...(opts.settings ?? {}) });
        }
        if (msg.type === MessageType.TOGGLE_PIN) {
          return opts.togglePinRejects
            ? Promise.reject(new Error('server error'))
            : Promise.resolve({ pinned: true });
        }
        return Promise.resolve(null);
      }),
      onMessage: { addListener: vi.fn() },
    },
    storage: {
      onChanged: { addListener: vi.fn() },
      sync: {
        get: vi.fn().mockResolvedValue({}),
        set: vi.fn().mockResolvedValue(undefined),
      },
    },
    tabs: { query: vi.fn().mockResolvedValue([]) },
  };
}

describe('initApp — pin behavior', () => {
  let root: HTMLDivElement;

  beforeEach(() => {
    setupChrome();
    root = document.createElement('div');
    document.body.appendChild(root);
  });

  afterEach(() => {
    document.documentElement.removeAttribute('data-clipjar-text-size');
    document.body.removeChild(root);
  });

  it('renders loaded clips in the DOM', async () => {
    initApp(root);
    await vi.waitFor(() => root.querySelectorAll('[data-id]').length === 2);
    expect(root.querySelectorAll('[data-id]')).toHaveLength(2);
    expect(root.style.width).toBe('var(--j-popup-width)');
    expect(root.style.maxHeight).toBe('var(--j-popup-height)');
  });

  it('applies the saved text size setting', async () => {
    setupChrome({ settings: { textSize: 'x-large' } });

    initApp(root);

    await vi.waitFor(() =>
      document.documentElement.getAttribute('data-clipjar-text-size') === 'x-large',
    );
  });

  it('c1 starts unpinned, c2 starts pinned', async () => {
    initApp(root);
    await vi.waitFor(() => root.querySelector('[data-id="c1"]') !== null);

    expect(root.querySelector('[data-id="c1"] .jar-pin')?.classList.contains('pinned')).toBe(false);
    expect(root.querySelector('[data-id="c2"] .jar-pin')?.classList.contains('pinned')).toBe(true);
  });

  it('optimistic update flips pin state synchronously in the DOM', async () => {
    initApp(root);
    await vi.waitFor(() => root.querySelector('[data-id="c1"]') !== null);

    root.querySelector<HTMLButtonElement>('[data-id="c1"] .jar-pin')!.click();

    // Optimistic update is synchronous — DOM reflects new state immediately
    expect(root.querySelector('[data-id="c1"] .jar-pin')?.classList.contains('pinned')).toBe(true);
  });

  it('sends TOGGLE_PIN message with correct id', async () => {
    initApp(root);
    await vi.waitFor(() => root.querySelector('[data-id="c1"]') !== null);

    root.querySelector<HTMLButtonElement>('[data-id="c1"] .jar-pin')!.click();

    const chrome = (globalThis as unknown as { chrome: { runtime: { sendMessage: ReturnType<typeof vi.fn> } } }).chrome;
    expect(chrome.runtime.sendMessage).toHaveBeenCalledWith(
      expect.objectContaining({ type: MessageType.TOGGLE_PIN, payload: { id: 'c1' } }),
    );
  });

  it('rolls back pin state when server rejects', async () => {
    setupChrome({ togglePinRejects: true });

    initApp(root);
    await vi.waitFor(() => root.querySelector('[data-id="c1"]') !== null);

    root.querySelector<HTMLButtonElement>('[data-id="c1"] .jar-pin')!.click();

    // Optimistic: temporarily pinned
    expect(root.querySelector('[data-id="c1"] .jar-pin')?.classList.contains('pinned')).toBe(true);

    // After async rejection, rolls back to unpinned
    await vi.waitFor(() =>
      root.querySelector('[data-id="c1"] .jar-pin')?.classList.contains('pinned') === false,
    );
  });

  it('on favorites tab, waits for server before refreshing', async () => {
    // Set up: favorites tab shows only pinned clips
    (globalThis as unknown as { chrome: { runtime: { sendMessage: ReturnType<typeof vi.fn> } } })
      .chrome.runtime.sendMessage = vi.fn((msg: { type: MessageType }) => {
      if (msg.type === MessageType.GET_CLIPS) return Promise.resolve([makeClip('c2', true)]);
      if (msg.type === MessageType.CLIP_COUNT) return Promise.resolve({ count: 1 });
      if (msg.type === MessageType.TOGGLE_PIN) return Promise.resolve({ pinned: false });
      return Promise.resolve(null);
    });

    initApp(root);
    await vi.waitFor(() => root.querySelector('[data-id="c2"]') !== null);

    // Switch to favorites tab
    const favTab = Array.from(root.querySelectorAll('.jar-tab'))
      .find((el) => el.textContent?.includes('Fave')) as HTMLButtonElement | undefined;
    favTab?.click();

    await vi.waitFor(() => root.querySelector('[data-id="c2"]') !== null);

    // On favorites: clicking unpin should await before reload
    root.querySelector<HTMLButtonElement>('[data-id="c2"] .jar-pin')!.click();

    // After server confirms and reload, list refreshes
    await vi.waitFor(() =>
      (globalThis as unknown as { chrome: { runtime: { sendMessage: ReturnType<typeof vi.fn> } } })
        .chrome.runtime.sendMessage.mock.calls.some(
          (c: unknown[]) => (c[0] as { type: MessageType })?.type === MessageType.TOGGLE_PIN,
        ),
    );
  });
});

describe('initApp — clipboard capture', () => {
  let root: HTMLDivElement;

  function setClipboard(text: string): ReturnType<typeof vi.fn> {
    const readText = vi.fn().mockResolvedValue(text);
    Object.defineProperty(navigator, 'clipboard', { value: { readText }, configurable: true });
    return readText;
  }

  function getSendMessage(): ReturnType<typeof vi.fn> {
    return (globalThis as unknown as { chrome: { runtime: { sendMessage: ReturnType<typeof vi.fn> } } })
      .chrome.runtime.sendMessage;
  }

  function capturedContents(): (string | undefined)[] {
    return getSendMessage().mock.calls
      .map((c: unknown[]) => c[0] as { type: MessageType; payload?: { content?: string } })
      .filter((m) => m.type === MessageType.CLIP_CAPTURED)
      .map((m) => m.payload?.content);
  }

  const flush = () => new Promise((r) => setTimeout(r, 0));

  beforeEach(() => {
    setupChrome();
    root = document.createElement('div');
    document.body.appendChild(root);
  });

  afterEach(() => {
    document.documentElement.removeAttribute('data-clipjar-text-size');
    document.body.removeChild(root);
    delete (navigator as unknown as { clipboard?: unknown }).clipboard;
  });

  it('captures new clipboard text not yet in history when the surface opens', async () => {
    setupChrome({ settings: { captureFromClipboard: true } });
    setClipboard('https://example.com/from-address-bar');
    initApp(root);

    await vi.waitFor(() =>
      expect(capturedContents()).toContain('https://example.com/from-address-bar'),
    );
  });

  it('does not re-capture when the clipboard matches the most recent clip', async () => {
    setupChrome({ settings: { captureFromClipboard: true } });
    setClipboard('Content of c1'); // c1 is the most recent clip in testClips
    initApp(root);

    await vi.waitFor(() => root.querySelectorAll('[data-id]').length === 2);
    await flush();

    expect(capturedContents()).not.toContain('Content of c1');
  });

  it('does not read the clipboard when the setting is off', async () => {
    setupChrome({ settings: { captureFromClipboard: false } });
    const readText = setClipboard('https://example.com/should-be-ignored');
    initApp(root);

    await vi.waitFor(() => root.querySelectorAll('[data-id]').length === 2);
    await flush();

    expect(readText).not.toHaveBeenCalled();
    expect(capturedContents()).toHaveLength(0);
  });
});
