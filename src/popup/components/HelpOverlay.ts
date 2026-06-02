export function renderHelpOverlay(container: HTMLElement): () => void {
  const overlay = document.createElement('div');
  overlay.className = 'jar-overlay';

  const header = document.createElement('div');
  header.className = 'jar-overlay-header';

  const title = document.createElement('span');
  title.className = 'jar-overlay-title';
  title.textContent = 'How to use Clipjar';

  const closeBtn = document.createElement('button');
  closeBtn.textContent = '✕';
  closeBtn.className = 'jar-overlay-close';
  closeBtn.addEventListener('click', hide);

  header.appendChild(title);
  header.appendChild(closeBtn);

  const body = document.createElement('div');
  body.className = 'jar-overlay-body';

  const sections: { heading: string; items: string[] }[] = [
    {
      heading: 'Copying',
      items: ['Click any clip to copy it instantly.', 'Or navigate with \u2191\u2193 and press Enter.'],
    },
    {
      heading: 'Keyboard shortcuts',
      items: [
        '\u2191 \u2193  \u2014 navigate',
        'Enter  \u2014 copy selected',
        'Tab / Shift+Tab  \u2014 switch tabs',
        '\u2318\u232B or Ctrl+\u232B  \u2014 delete clip',
        '\u2318S or Ctrl+S  \u2014 pin/unpin',
        'Esc  \u2014 close',
      ],
    },
    {
      heading: 'Favorites',
      items: [
        'Click \u2605 on any clip to pin it.',
        'Pinned clips appear in the Faves tab.',
      ],
    },
    {
      heading: 'Snippets',
      items: [
        'Go to Snippets and click + New Snippet.',
        'Enter a :shortcut and expansion text.',
        'Type the shortcut anywhere. It expands the moment you finish typing it.',
      ],
    },
    {
      heading: 'Search',
      items: ['Fuzzy search across all clips. Handles partial matches.'],
    },
  ];

  for (const section of sections) {
    const group = document.createElement('div');
    group.className = 'jar-help-section';

    const heading = document.createElement('div');
    heading.className = 'jar-help-heading';
    heading.textContent = section.heading;
    group.appendChild(heading);

    for (const item of section.items) {
      const p = document.createElement('p');
      p.className = 'jar-help-item';
      p.textContent = item;
      group.appendChild(p);
    }

    body.appendChild(group);
  }

  overlay.appendChild(header);
  overlay.appendChild(body);
  container.appendChild(overlay);

  // The popup auto-sizes to its content, so the clip list stays compact. The
  // help guide needs more room, so pin the body to the full popup height while
  // it's open and release it on close. Setting document.body.style.height
  // directly is what reliably makes Chrome regrow the popup; toggling a class
  // on a nested element leaves the popup stuck until a reflow. The side panel
  // is a fixed docked surface that already fills its height, so it opts out.
  const resizesPopup = location.pathname.includes('/popup/');

  function show(): void {
    overlay.classList.add('visible');
    if (resizesPopup) document.body.style.height = 'var(--j-popup-height)';
  }

  function hide(): void {
    overlay.classList.remove('visible');
    if (resizesPopup) document.body.style.height = '';
  }

  return show;
}
