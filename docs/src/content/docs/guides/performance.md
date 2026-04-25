---
title: Performance
description: Optimize your documentation site for fast load times and smooth user experience.
---

## Performance Defaults

The build system applies several optimizations automatically:

- HTML minification removes whitespace and comments
- CSS is bundled, tree-shaken, and minified
- Images are converted to modern formats like WebP and AVIF
- JavaScript is code-split and lazy-loaded where possible

## Image Optimization

Use the built-in `Image` component instead of raw `<img>` tags to get automatic optimization:

```ts
---
import { Image } from 'astro:assets';
import diagram from '../assets/architecture.png';
---

<Image src={diagram} alt="Architecture diagram" width={800} />
```

This generates responsive `srcset` attributes and serves the smallest appropriate format for each browser.

## Reducing Bundle Size

Keep your client-side JavaScript to a minimum:

- Prefer static rendering over client-side interactivity
- Use `client:visible` or `client:idle` directives to defer hydration
- Audit your dependencies with `npx bundlesize` to track growth

```ts
<!-- Only hydrates when the component scrolls into view -->
<InteractiveChart client:visible data={chartData} />
```

## Caching Strategy

Configure proper cache headers on your hosting platform for optimal repeat visits:

- **HTML pages** — `Cache-Control: public, max-age=0, must-revalidate`
- **Hashed assets** — `Cache-Control: public, max-age=31536000, immutable`
- **Fonts** — `Cache-Control: public, max-age=31536000`

## Measuring Performance

Use Lighthouse or WebPageTest to benchmark your site. Key metrics to monitor:

- **Largest Contentful Paint (LCP)** — Target under 2.5 seconds
- **First Input Delay (FID)** — Target under 100 milliseconds
- **Cumulative Layout Shift (CLS)** — Target under 0.1
- **Time to First Byte (TTFB)** — Optimize server response time

```bash
npx lighthouse https://your-docs-site.com --output=json --output-path=./report.json
```
