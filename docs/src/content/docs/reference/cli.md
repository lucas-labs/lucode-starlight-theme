---
title: CLI Reference
description: All available command-line interface commands and their options.
---

## Overview

The CLI provides commands for developing, building, and managing your documentation site. All commands are available through your package manager's run script.

## dev

Start the development server with hot reload:

```bash
npm run dev
```

**Options:**

- `--port <number>` — Port to listen on (default: `4321`)
- `--host` — Expose the server to the local network
- `--open` — Open the site in your default browser on start

```bash
npm run dev -- --port 3000 --host --open
```

## build

Create an optimized production build:

```bash
npm run build
```

**Options:**

- `--outDir <path>` — Output directory (default: `dist`)
- `--verbose` — Show detailed build output
- `--drafts` — Include draft pages in the build

The build process performs the following steps:

- Collects and validates all content entries
- Renders pages to static HTML
- Bundles and minifies CSS and JavaScript
- Copies public assets to the output directory

## preview

Preview the production build locally:

```bash
npm run preview
```

This serves the `dist/` directory on a local HTTP server. Useful for verifying the build output before deploying.

## check

Run diagnostics to identify common issues:

```bash
npx lucode check
```

**Checks performed:**

- Validates frontmatter in all content files
- Detects broken internal links
- Ensures required configuration fields are present
- Reports unused assets in the public directory
