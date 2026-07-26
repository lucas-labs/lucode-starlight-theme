---
title: Configuration
description: Configure the Lucode Starlight plugin, Starlight options, and docs content schema.
---

Lucode Starlight is configured inside the Starlight integration. The plugin handles theme wiring; your site still owns regular Starlight options like `title`, `logo`, `sidebar`, `social`, and `customCss`.

## Minimal Config

```js
// astro.config.mjs
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import lucode from 'lucode-starlight';

export default defineConfig({
  integrations: [
    starlight({
      title: 'My Docs',
      plugins: [lucode()],
    }),
  ],
});
```

## Plugin Options

Pass options to `lucode()` when you want custom top navigation or footer text.

```js
lucode({
  navLinks: [
    { label: 'Docs', link: '/guides/getting-started/' },
    { label: 'Showcase', link: '/showcase/starlight-components/' },
    { label: 'GitHub', link: 'https://github.com/lucas-labs/lucode-starlight-theme' },
  ],
  footerText:
    'Built with [Lucode Starlight](https://github.com/lucas-labs/lucode-starlight-theme).',
});
```

`navLinks` renders links in the custom header. Each item supports:

| Option | Type | Notes |
| --- | --- | --- |
| `label` | `string` or locale map | Default label, or a map keyed by BCP-47 / locale path. |
| `translations` | locale map | Optional labels when `label` is a string (Starlight sidebar style). |
| `link` | `string` | Internal path or external URL. |
| `badge` | `string` | Optional badge text beside the label. |
| `attrs` | HTML attributes | Extra attributes passed to the anchor. |

`footerText` accepts Markdown as a string, or a locale map like Starlight's `title`. The default credits shadcn/ui for the documentation theme inspiration, starlight-theme-black as the Astro Starlight base, and lucas-labs for this package.

### Multilingual examples

Starlight sidebar style (`label` + `translations`):

```js
lucode({
  navLinks: [
    {
      label: 'Docs',
      link: '/getting-started/',
      translations: {
        es: 'Documentación',
      },
    },
  ],
  footerText: {
    es: 'Hecho con [Astro](https://astro.build) y [Lucode](https://lucas-labs.github.io/lucode-starlight-theme/).',
    en: 'Built with [Astro](https://astro.build) and [Lucode](https://lucas-labs.github.io/lucode-starlight-theme/).',
  },
});
```

Locale map style (same shape as Starlight `title`):

```js
lucode({
  navLinks: [
    {
      link: '/getting-started/',
      label: {
        en: 'Docs',
        es: 'Documentación',
      },
    },
  ],
});
```

Lookup tries the active `lang` (BCP-47), then the locale path, then the default locale — including a case-insensitive fallback — so keys like `en` / `es` stay aligned with your Starlight `locales` config.

## Recommended Starlight Config

Most sites should configure the usual Starlight surface next to the plugin:

```js
starlight({
  title: 'Acme Docs',
  logo: {
    src: './src/assets/logo.svg',
    alt: 'Acme logo',
    replacesTitle: true,
  },
  customCss: ['./src/styles/global.css'],
  social: [
    { icon: 'github', label: 'GitHub', href: 'https://github.com/acme/docs' },
  ],
  plugins: [
    lucode({
      navLinks: [
        { label: 'Docs', link: '/guides/getting-started/' },
        { label: 'Reference', link: '/reference/plugin-api/' },
      ],
    }),
  ],
  sidebar: [
    {
      label: 'Guides',
      autogenerate: { directory: 'guides' },
    },
    {
      label: 'Reference',
      autogenerate: { directory: 'reference' },
    },
  ],
});
```

## Content Schema

Add `ExtendDocsSchema` if you want the extra splash hero frontmatter used by this theme:

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

## What the Plugin Wires Up

During Starlight config setup, Lucode Starlight:

- Registers Lucode component overrides for the Starlight page frame, header, sidebar, hero, footer, search, table of contents, and markdown content.
- Appends `lucode-starlight/styles/layers`, `lucode-starlight/styles/theme`, and `lucode-starlight/styles/base` to `customCss`.
- Applies the package Expressive Code configuration.
- Adds an Astro integration with the Vite plugin that receives the parsed `navLinks` and `footerText` config.

If you already override one of the same Starlight components, the plugin leaves your override in place and logs a warning with the fallback component path.

## Component Overrides

You can still override Starlight components yourself. When you do, import or re-render the Lucode component you want to keep.

```js
starlight({
  components: {
    Header: './src/components/Header.astro',
  },
  plugins: [lucode()],
});
```
