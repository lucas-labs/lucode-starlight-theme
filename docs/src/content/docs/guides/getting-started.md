---
title: Getting Started
description: Learn how to set up your first project from scratch and get up and running in minutes.
---

## Prerequisites

Before you begin, make sure you have the following tools installed on your system:

- **Node.js** version 18.0 or higher
- **npm**, **yarn**, or **pnpm** as your package manager
- A code editor such as VS Code with the recommended extensions

You can verify your Node.js installation by running:

```bash
node --version
npm --version
```

## Creating a New Project

The fastest way to get started is by using our project scaffolding tool. Open your terminal and run the following command:

```bash
npm create lucode-app@latest my-project
```

You'll be prompted with a few options:

- **Template**: Choose between a blank starter, blog, or documentation site
- **TypeScript**: Enable or disable TypeScript support
- **Package manager**: Select your preferred package manager

Once the scaffolding is complete, navigate into your project directory:

```bash
cd my-project
npm install
```

## Project Structure

After initialization, your project will have the following structure:

```
my-project/
├── src/
│   ├── content/
│   │   └── docs/
│   ├── assets/
│   └── styles/
├── public/
├── astro.config.mjs
├── package.json
└── tsconfig.json
```

- `src/content/` — Where your Markdown and MDX content lives
- `src/assets/` — Images, fonts, and other static assets processed at build time
- `public/` — Files served directly without processing
- `astro.config.mjs` — Your main configuration file

## Running the Development Server

Start the local development server to preview your site:

```bash
npm run dev
```

This will start a local server at `http://localhost:4321`. The server supports hot module replacement, so changes to your content and components will be reflected instantly in the browser.

You can customize the port and host if needed:

```ts
// astro.config.mjs
import { defineConfig } from 'astro/config';

export default defineConfig({
  server: {
    port: 3000,
    host: true,
  },
});
```

## Adding Your First Page

Create a new Markdown file inside the `src/content/docs/` directory:

```bash
touch src/content/docs/my-first-page.md
```

Add some frontmatter and content:

```md
---
title: My First Page
description: A brief introduction to the project.
---

## Welcome

This is your first documentation page. You can write content using
standard Markdown syntax, including **bold**, *italics*, and `code`.
```

The page will automatically appear in the sidebar navigation based on your file structure.

## Configuring Navigation

The sidebar is generated automatically from your file system, but you can customize it in your configuration:

```ts
// astro.config.mjs
import { defineConfig } from 'astro/config';
import lucode from 'lucode-starlight';

export default defineConfig({
  integrations: [
    lucode({
      sidebar: [
        { label: 'Home', link: '/' },
        {
          label: 'Guides',
          autogenerate: { directory: 'guides' },
        },
        {
          label: 'Reference',
          items: [
            { label: 'API', link: '/reference/api' },
            { label: 'CLI', link: '/reference/cli' },
          ],
        },
      ],
    }),
  ],
});
```

## Building for Production

When you're ready to deploy, create an optimized production build:

```bash
npm run build
```

The output will be placed in the `dist/` directory. You can preview the production build locally before deploying:

```bash
npm run preview
```

## Next Steps

Now that you have a working project, explore the following guides to learn more:

- [Installation](/guides/installation) — Advanced installation options and environment setup
- [Configuration](/guides/configuration) — Customize every aspect of your site
- [Theming](/guides/theming) — Adjust colors, fonts, and layout to match your brand
- [Deployment](/guides/deployment) — Ship your site to production
