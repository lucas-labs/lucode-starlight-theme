---
title: Testing
description: Strategies and tools for testing your documentation site and custom components.
---

## Testing Approach

A well-tested documentation site catches broken links, invalid frontmatter, and rendering issues before they reach production. We recommend a layered testing strategy:

- **Linting** — Validate Markdown and frontmatter with automated rules
- **Unit tests** — Test utility functions and custom logic
- **Integration tests** — Verify that pages render correctly
- **End-to-end tests** — Simulate real user interactions in a browser

## Unit Testing with Vitest

Use Vitest to test helper functions and configuration logic:

```bash
npm install -D vitest
```

```ts
// tests/utils.test.ts
import { describe, it, expect } from 'vitest';
import { slugify } from '../src/utils';

describe('slugify', () => {
  it('converts a title to a URL-safe slug', () => {
    expect(slugify('Getting Started')).toBe('getting-started');
  });

  it('removes special characters', () => {
    expect(slugify('API & CLI Reference!')).toBe('api-cli-reference');
  });
});
```

Run the test suite:

```bash
npx vitest run
```

## Link Validation

Check for broken internal and external links after building:

```bash
npx lucode check --links
```

This scans all generated HTML files and reports:

- Internal links pointing to non-existent pages
- Anchor references to missing heading IDs
- External URLs that return error status codes

## Visual Regression Testing

Capture screenshots of key pages and compare them against baselines to detect unintended visual changes:

```ts
// tests/visual.test.ts
import { test, expect } from '@playwright/test';

test('homepage matches snapshot', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveScreenshot('homepage.png', {
    maxDiffPixelRatio: 0.01,
  });
});
```

## Continuous Integration

Add testing to your CI pipeline to catch issues on every pull request:

- Run `npm run build` to verify the site builds without errors
- Run `vitest run` for unit tests
- Run `npx lucode check` for content validation
- Optionally run Playwright tests for critical user flows
