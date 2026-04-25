---
title: Deployment
description: Deploy your documentation site to popular hosting platforms.
---

## Build Output

Before deploying, generate a production build:

```bash
npm run build
```

This outputs static files to the `dist/` directory. The output is fully static and can be served by any file host or CDN.

## Deploying to Vercel

The simplest deployment option is Vercel. Connect your Git repository and Vercel will handle the rest automatically.

```bash
npm install -g vercel
vercel deploy
```

Or add a `vercel.json` for custom settings:

```ts
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "astro"
}
```

## Deploying to Netlify

Create a `netlify.toml` in your project root:

```bash
[build]
  command = "npm run build"
  publish = "dist"
```

Then push to your connected Git repository. Netlify will detect the configuration and build automatically.

## Deploying to GitHub Pages

Add the GitHub Pages adapter and configure your base path:

```ts
// astro.config.mjs
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://your-username.github.io',
  base: '/your-repo-name',
});
```

Create a GitHub Actions workflow at `.github/workflows/deploy.yml`:

- Checkout the repository
- Install dependencies and build
- Upload the `dist/` directory as a Pages artifact
- Deploy to the `gh-pages` environment

## Custom Server

For self-hosted environments, serve the `dist/` folder with any static file server:

```bash
npx serve dist --listen 8080
```

Make sure to configure proper cache headers and HTTPS termination through your reverse proxy or load balancer.
