Design tokens and usage guidelines for eSIM Myanmar visual system.

Color palette

- Background: `#1e2f3c` (Deep blue)
- Accent: `#00ffff` (Cyan)
- Graphite (secondary): Use neutral graphite tones for borders and subtle text
- Transparent pearl: `rgba(255,255,255,0.06)` for overlays and glass layers

Usage guidance

- Primary actions (primary buttons, links, active controls): use `#00ffff` on `#1e2f3c` or white text on accent backgrounds.
- Secondary elements (borders, subtle text, secondary icons): use graphite tones with 40% opacity.
- Pearl overlays and glass effects: apply `backdrop-filter: blur(20px) brightness(1.05)` with `Transparent pearl` layer on top of background.
- Borders: 1px solid rgba(255,255,255,0.06) for glass cards.
- Highlights and focus states: 2px ring using `#00ffff` at 24% opacity.

Accessibility

- Ensure contrast ratios meet WCAG AA for normal text and AAA for headings where applicable.
- Avoid using color alone to indicate state; include text or iconography.

Typography

- Primary: Segoe UI Variable (system/var font face)
- Myanmar: Leelawadee UI for Myanmar script
- Fallback: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial

No emoji policy

- All UI and documentation must use plain text only. No emoji characters in markup, content, or assets.

Design intent

- iOS 26 design flow: edge-to-edge hero sections, dynamic headers, fluid motion, layered depth, fixed bottom navigation on mobile.

