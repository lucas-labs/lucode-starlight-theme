---
title: Plugins
description: Extend your site with first-party and community plugins.
---

## Plugin System

Plugins allow you to add new features, modify the build pipeline, or integrate with third-party services. They hook into the build lifecycle and can inject components, styles, and routes.

## Installing a Plugin

Install plugins from npm and register them in your configuration:

```bash
npm install @lucode/plugin-search @lucode/plugin-analytics
```

```ts
// astro.config.mjs
import search from '@lucode/plugin-search';
import analytics from '@lucode/plugin-analytics';

export default defineConfig({
  integrations: [
    lucode({
      plugins: [
        search({ provider: 'algolia' }),
        analytics({ trackingId: 'UA-XXXXXXX' }),
      ],
    }),
  ],
});
```

## Available Plugins

A selection of officially maintained plugins:

- **@lucode/plugin-search** — Full-text search powered by Algolia or Pagefind
- **@lucode/plugin-analytics** — Privacy-friendly analytics integration
- **@lucode/plugin-rss** — Automatically generate an RSS feed from your content
- **@lucode/plugin-sitemap** — Create an XML sitemap for search engine indexing
- **@lucode/plugin-i18n** — Enhanced internationalization utilities

## Writing a Custom Plugin

Create your own plugin by exporting a function that returns a plugin object:

```ts
// my-plugin.ts
import type { LucodePlugin } from 'lucode-starlight';

export default function myPlugin(options: { enabled: boolean }): LucodePlugin {
  return {
    name: 'my-custom-plugin',
    hooks: {
      setup({ config, addIntegration }) {
        if (options.enabled) {
          addIntegration(myAstroIntegration());
        }
      },
    },
  };
}
```

## Plugin Lifecycle

Plugins can hook into several lifecycle events:

- `setup` — Runs once during configuration, before the build starts
- `beforeBuild` — Runs after all pages are collected but before rendering
- `afterBuild` — Runs after the static files have been written to disk
- `injectRoute` — Register dynamic routes handled by the plugin
