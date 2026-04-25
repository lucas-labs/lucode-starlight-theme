---
title: API Reference
description: Complete API reference for all exported functions, types, and utilities.
---

## defineConfig

The main configuration helper that provides type-safe options and validation.

```ts
import { defineConfig } from 'lucode-starlight';

const config = defineConfig({
  title: 'My Site',
  description: 'A documentation site',
});
```

**Parameters:**

- `options` (`LucodeConfig`) — The configuration object

**Returns:** `ResolvedConfig`

## createTheme

Generate a custom theme object that can be passed to the integration.

```ts
import { createTheme } from 'lucode-starlight';

const theme = createTheme({
  colors: {
    primary: '#6366f1',
    accent: '#f59e0b',
  },
  fonts: {
    body: 'Inter, sans-serif',
  },
});
```

**Parameters:**

- `tokens` (`ThemeTokens`) — An object containing color, font, and spacing overrides

**Returns:** `Theme`

## getCollection

Retrieve all entries from a content collection, with optional filtering.

```ts
import { getCollection } from 'lucode-starlight';

const guides = await getCollection('docs', (entry) => {
  return entry.slug.startsWith('guides/');
});
```

**Parameters:**

- `collection` (`string`) — The name of the collection to query
- `filter` (`(entry: CollectionEntry) => boolean`) — Optional predicate to filter entries

**Returns:** `Promise<CollectionEntry[]>`

## Types

Commonly used TypeScript types exported from the package:

- `LucodeConfig` — The top-level configuration object
- `SidebarItem` — A single sidebar navigation entry
- `CollectionEntry` — A content collection document with frontmatter and body
- `Theme` — A resolved theme token set
- `LucodePlugin` — Interface for authoring plugins
