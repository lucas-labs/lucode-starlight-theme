---
title: Configuration
description: A complete overview of all configuration options available for customizing your site.
---

## Configuration File

All configuration lives in your `astro.config.mjs` file. The integration accepts an options object where you can control site metadata, navigation, and behavior.

```ts
import { defineConfig } from 'astro/config';
import lucode from 'lucode-starlight';

export default defineConfig({
  integrations: [
    lucode({
      title: 'My Docs',
      description: 'Documentation for my project',
      logo: './src/assets/logo.svg',
      defaultLocale: 'en',
    }),
  ],
});
```

## Site Metadata

Control how your site appears in search engines and browser tabs:

- `title` — The site title shown in the header and browser tab
- `description` — A short description used in meta tags
- `logo` — Path to a logo image displayed in the navigation bar
- `favicon` — Path to a custom favicon file

## Social Links

Add links to your social profiles and repository:

```ts
lucode({
  social: {
    github: 'https://github.com/your-org/your-repo',
    discord: 'https://discord.gg/your-server',
    twitter: 'https://twitter.com/your-handle',
  },
});
```

## Internationalization

Enable multi-language support by defining your locales:

```ts
lucode({
  defaultLocale: 'en',
  locales: {
    en: { label: 'English' },
    es: { label: 'Español' },
    ja: { label: '日本語' },
  },
});
```

Each locale requires a matching content directory under `src/content/docs/`.

## Environment Variables

Some settings can be overridden with environment variables for flexibility across deployment environments:

- `SITE_URL` — Override the canonical site URL
- `BASE_PATH` — Set a base path prefix for all routes
- `ENABLE_DRAFTS` — Show draft pages in development mode

Create a `.env` file in your project root:

```bash
SITE_URL=https://docs.example.com
BASE_PATH=/docs
ENABLE_DRAFTS=true
```
