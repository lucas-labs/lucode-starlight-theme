---
title: Installation
description: Detailed installation instructions for different environments and package managers.
---

## Quick Install

Install the package using your preferred package manager:

```bash
# npm
npm install lucode-starlight

# pnpm
pnpm add lucode-starlight

# yarn
yarn add lucode-starlight
```

## System Requirements

Ensure your environment meets these minimum requirements:

- Node.js 18.0 or later
- npm 9.0+, pnpm 8.0+, or yarn 1.22+
- Operating system: macOS, Windows, or Linux
- At least 512 MB of available RAM for the build process

## Adding the Integration

After installing the package, register it in your Astro configuration:

```ts
// astro.config.mjs
import { defineConfig } from 'astro/config';
import lucode from 'lucode-starlight';

export default defineConfig({
  integrations: [
    lucode({
      title: 'My Documentation',
    }),
  ],
});
```

## Monorepo Setup

If you're working in a monorepo, install the package at the workspace root and reference it from your docs project:

```bash
# From the workspace root
pnpm add lucode-starlight --filter docs
```

Make sure your `tsconfig.json` includes the correct path mappings:

```ts
{
  "compilerOptions": {
    "paths": {
      "lucode-starlight": ["../../packages/lucode-starlight/index.ts"]
    }
  }
}
```

## Troubleshooting

Common issues during installation:

- **Peer dependency warnings** — Ensure you have a compatible version of Astro installed (v4.0+)
- **Permission errors on macOS/Linux** — Avoid using `sudo` with npm; fix your global directory permissions instead
- **Stale lockfile** — Delete `node_modules` and your lockfile, then run a fresh install
