---
title: Data Fetching
description: Load external data at build time or on-demand to enrich your documentation pages.
---

## Build-Time Fetching

Fetch data during the build process to embed dynamic content into static pages. Use the `fetch` API inside any `.astro` component's frontmatter:

```ts
---
const response = await fetch('https://api.example.com/stats');
const stats = await response.json();
---

<p>Total downloads: {stats.totalDownloads}</p>
```

Build-time data is baked into the HTML output, so there are no runtime requests from the browser.

## Content Collections

The recommended approach for structured data is to use content collections. Define a schema and let the build system validate your entries:

```ts
// src/content.config.ts
import { defineCollection, z } from 'astro:content';

const changelog = defineCollection({
  schema: z.object({
    version: z.string(),
    date: z.string(),
    summary: z.string(),
  }),
});

export const collections = { changelog };
```

Query the collection in your pages:

```ts
---
import { getCollection } from 'astro:content';
const entries = await getCollection('changelog');
---
```

## Remote Data Sources

For data that changes frequently, consider fetching from remote APIs with appropriate caching:

- Use `Cache-Control` headers to manage staleness
- Implement incremental static regeneration for hybrid sites
- Store API keys in environment variables, never in source code

```ts
const data = await fetch('https://api.example.com/releases', {
  headers: { Authorization: `Bearer ${import.meta.env.API_TOKEN}` },
});
```

## Error Handling

Always handle potential failures when fetching external data:

```ts
try {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data = await res.json();
} catch (err) {
  console.error('Failed to fetch data:', err);
}
```

Build-time errors will cause the build to fail, ensuring broken data never reaches production.
