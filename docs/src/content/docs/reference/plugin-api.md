---
title: Plugin API
description: Type-level reference for lucode-starlight plugin options and frontmatter extensions.
---

## Import

```ts
import lucode from 'lucode-starlight';
```

Use the default export inside Starlight's `plugins` array:

```js
starlight({
  plugins: [lucode()],
});
```

## `LucodeStarlightUserConfig`

```ts
type LucodeStarlightUserConfig = {
  navLinks?: Link[];
  footerText?: string | Record<string, string>;
  warnOverrides?: boolean;
  docs?: {
    includeAiUtilities?: boolean;
  };
};
```

### `navLinks`

Header navigation links rendered by the theme.

```ts
type Link = {
  link: string;
  badge?: string;
  translations?: Record<string, string>;
  label: string | Record<string, string>;
  attrs?: Record<string, string | number | boolean | undefined>;
};
```

```js
lucode({
  navLinks: [
    {
      label: 'Docs',
      link: '/guides/getting-started/',
      translations: {
        es: 'Documentación',
      },
    },
    {
      link: '/reference/plugin-api/',
      label: {
        en: 'API',
        es: 'API',
      },
    },
    {
      label: 'GitHub',
      attrs: { target: '_blank', rel: 'noreferrer' },
      link: 'https://github.com/lucas-labs/lucode-starlight-theme',
    },
  ],
});
```

Prefer Starlight sidebar style (`label` string + `translations`) or a locale map on `label`. Keys
may be BCP-47 tags (`en`, `es`) or locale paths; Lucode tries both.

### `footerText`

Markdown rendered in the footer text slot. Accepts a string or a locale map (same shape as
Starlight's `title`).

```js
lucode({
  footerText: {
    es: 'Hecho con [Lucode Starlight](https://github.com/lucas-labs/lucode-starlight-theme).',
    en: 'Built with [Lucode Starlight](https://github.com/lucas-labs/lucode-starlight-theme).',
  },
});
```

If omitted, the theme uses its built-in credit line. When using the object form, include a key for
your default language.

### `warnOverrides`

Defaults to `true`. The theme installs its own component overrides, and skips any component you have
already overridden in your Starlight configuration, warning you when it does so. Set this to `false`
to silence those warnings if the overrides are intentional.

```js
lucode({
  warnOverrides: false,
});
```

### `docs.includeAiUtilities`

Defaults to `false`. Set it to `true` to render an "AI tools" dropdown next to page titles, with
links that open the current page in ChatGPT or Claude alongside a prompt asking the assistant to
explain it.

```js
lucode({
  docs: { includeAiUtilities: true },
});
```

## Frontmatter Extension

Import `ExtendDocsSchema` from `lucode-starlight/schema` and pass it to Starlight's `docsSchema()`.

```ts
import { ExtendDocsSchema } from 'lucode-starlight/schema';

schema: docsSchema({ extend: ExtendDocsSchema });
```

The extension adds:

```ts
type LucodeDocsFrontmatter = {
  hero?: {
    layout?: 'centered' | 'centered-top' | 'split-left' | 'split-right' | 'banner';
    announcement?: {
      text: string;
      link: string;
    };
    actions?: Array<{
      variant?: 'default' | 'link' | 'secondary' | 'outline' | 'ghost' | 'destructive';
    }>;
  };
};
```

`hero.layout` defaults to `centered`.

### `hero.actions[].variant`

Starlight already defines `hero.actions` with a `variant` limited to `primary`, `secondary`, and
`minimal`. The extension widens that field to the theme's full button styles, so splash page actions
can use any variant without overriding the `Hero` component:

```md
---
title: Integration Platform
template: splash
hero:
  actions:
    - text: Start building
      link: /guides/getting-started/
      icon: right-arrow
    - text: Read the API reference
      link: /reference/plugin-api/
      variant: outline
---
```

Defaults to `default`. Starlight's `primary` and `minimal` are still accepted, as aliases of
`default` and `ghost`, so existing frontmatter keeps working.

The other keys — `text`, `link`, `icon`, and `attrs` — come from Starlight and are unchanged. `icon`
takes either a built-in Starlight icon name or an inline `<svg>` string.

:::caution

Widening `variant` requires `@astrojs/starlight` 0.41.4 or newer. That is the first release whose
`docsSchema({ extend })` deep-merges your schema over Starlight's; earlier versions build a Zod
intersection, which cannot replace a field Starlight already declares.

:::

## Package Exports

```ts
import lucode from 'lucode-starlight';
import { ExtendDocsSchema } from 'lucode-starlight/schema';
import { ContainerSection, LinkButton } from 'lucode-starlight/components';
```

The package also exports the internal Starlight override components and CSS files for advanced
composition:

- `lucode-starlight/styles/layers`
- `lucode-starlight/styles/theme`
- `lucode-starlight/styles/base`
- `lucode-starlight/components/overrides/Header.astro`
- `lucode-starlight/components/overrides/Hero.astro`
- `lucode-starlight/components/overrides/Footer.astro`

Prefer the plugin for normal sites. Reach for direct exports only when you are building a custom
integration or intentionally composing with one of the theme overrides.
