---
title: Getting Started
description: Install Lucode Starlight in an Astro Starlight project and enable the theme plugin.
---

## Prerequisites

Lucode Starlight is a theme plugin for existing Starlight sites. You need:

- Astro with `@astrojs/starlight`.
- `@astrojs/starlight` version `0.38.3` or newer.
- A package manager. This repository uses Bun, but the theme works with npm, pnpm, yarn, or Bun.

If you are starting from nothing, create a Starlight site first:

```bash
npm create astro@latest -- --template starlight
```

## Install the Theme

Install the package in the Starlight app:

```bash
npm install lucode-starlight
```

Or with Bun:

```bash
bun add lucode-starlight
```

## Add the Plugin

Import the plugin and add it to Starlight's `plugins` array.

```js
// astro.config.mjs
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import lucode from 'lucode-starlight';

export default defineConfig({
  integrations: [
    starlight({
      title: 'My Docs',
      plugins: [
        lucode({
          navLinks: [
            { label: 'Docs', link: '/guides/getting-started/' },
            { label: 'API', link: '/reference/plugin-api/' },
          ],
        }),
      ],
    }),
  ],
});
```

Lucode Starlight automatically adds its component overrides, CSS layers, theme tokens, base styles, and Expressive Code configuration.

## Extend the Docs Schema

The theme adds frontmatter for splash hero layouts and announcement links. Extend Starlight's docs schema to use those fields with type checking.

```ts
// src/content.config.ts
import { defineCollection } from 'astro:content';
import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema } from '@astrojs/starlight/schema';
import { ExtendDocsSchema } from 'lucode-starlight/schema';

export const collections = {
  docs: defineCollection({
    loader: docsLoader(),
    schema: docsSchema({ extend: ExtendDocsSchema }),
  }),
};
```

## Create a Splash Homepage

Use Starlight's `template: splash` and Lucode's `hero.layout` field on any docs page.

```md
---
title: My Product Docs
description: Product documentation for teams that ship.
template: splash
hero:
  layout: split-left
  announcement:
    text: New docs theme
    link: /guides/getting-started/
  actions:
    - text: Start building
      link: /guides/getting-started/
      icon: right-arrow
    - text: View components
      link: /showcase/starlight-components/
      variant: minimal
---
```

Available layouts are `centered`, `centered-top`, `split-left`, `split-right`, and `banner`.

## Run the Site

Start Astro normally:

```bash
npm run dev
```

In this monorepo, run the docs app with:

```bash
bun run docs
```

## Next Steps

- Read [Configuration](/guides/configuration/) for plugin options and recommended Starlight settings.
- Read [Customize the Theme](/guides/theming/) for CSS tokens and component override strategy.
- Visit [Starlight Components](/showcase/starlight-components/) to inspect the full component surface.
- Browse [Splash Pages](/showcase/splash-pages/) to choose a landing-page layout.
