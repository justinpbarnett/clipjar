// Reads the system clipboard from an extension UI surface (popup or side panel).
// This is the only MV3 path that captures copies made outside web pages, such as
// the address bar, bookmarks manager, or other applications, since those never
// fire a `copy` event in a content script. Requires the `clipboardRead` permission
// and a focused document, both of which hold when a Clipjar surface is open.
export async function readClipboardText(): Promise<string | null> {
  if (!navigator.clipboard?.readText) return null;

  try {
    const text = await navigator.clipboard.readText();
    return text && text.trim().length > 0 ? text : null;
  } catch {
    // No focus, no permission, or empty clipboard. Nothing to capture.
    return null;
  }
}
