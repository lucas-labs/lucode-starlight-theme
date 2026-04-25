---
title: Theming
description: Customize the look and feel of your site with theme tokens, colors, and typography.
---

## Theme Overview

The theming system is built on CSS custom properties, making it easy to adjust colors, spacing, and typography without touching component code.

All theme tokens are defined in a central stylesheet and can be overridden in your project's `global.css`.

## Color Palette

Override the default color palette by setting custom properties in your stylesheet:

```css
/* src/styles/global.css */
:root {
  --color-primary: #6366f1;
  --color-primary-light: #818cf8;
  --color-primary-dark: #4f46e5;
  --color-background: #ffffff;
  --color-surface: #f8fafc;
  --color-text: #1e293b;
}
```

Dark mode colors are scoped under the `[data-theme="dark"]` selector:

```css
[data-theme='dark'] {
  --color-background: #0f172a;
  --color-surface: #1e293b;
  --color-text: #e2e8f0;
}
```

## Typography

Customize fonts by importing your preferred typeface and updating the font tokens:

```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');

:root {
  --font-body: 'Inter', system-ui, sans-serif;
  --font-heading: 'Inter', system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
}
```

Available typography tokens include:

- `--font-body` — Body text font family
- `--font-heading` — Heading font family
- `--font-mono` — Code block and inline code font
- `--font-size-base` — Base font size (default: `1rem`)
- `--line-height-body` — Line height for body content

## Custom Components

You can override any built-in component by placing a file with the same name in your project's component directory:

```ts
// astro.config.mjs
lucode({
  components: {
    Header: './src/components/CustomHeader.astro',
    Footer: './src/components/CustomFooter.astro',
  },
});
```

## Layout Options

Control the page layout width and sidebar behavior through configuration:

- `contentWidth` — Maximum width of the main content area (default: `48rem`)
- `sidebarWidth` — Width of the sidebar panel (default: `18rem`)
- `tocPosition` — Position of the table of contents: `"right"`, `"left"`, or `"hidden"`
