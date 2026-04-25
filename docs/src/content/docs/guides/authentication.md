---
title: Authentication
description: Protect your documentation pages with authentication and access control.
---

## Overview

You can restrict access to your documentation site or specific sections using built-in authentication middleware. This is useful for internal docs, early-access content, or gated resources.

## Basic Auth

Enable simple password protection for the entire site:

```ts
// astro.config.mjs
lucode({
  auth: {
    provider: 'basic',
    credentials: {
      username: import.meta.env.AUTH_USER,
      password: import.meta.env.AUTH_PASS,
    },
  },
});
```

Set the credentials in your environment file:

```bash
AUTH_USER=admin
AUTH_PASS=supersecretpassword
```

## OAuth Providers

Integrate with third-party OAuth providers for a seamless login experience:

- **GitHub** — Authenticate with a GitHub account
- **Google** — Use Google Workspace credentials
- **Custom OIDC** — Connect any OpenID Connect-compatible provider

```ts
lucode({
  auth: {
    provider: 'github',
    clientId: import.meta.env.GITHUB_CLIENT_ID,
    clientSecret: import.meta.env.GITHUB_CLIENT_SECRET,
    allowedOrgs: ['your-organization'],
  },
});
```

## Page-Level Access Control `code`

Restrict individual pages or directories by adding an `access` field to frontmatter:

```md
---
title: Internal Roadmap
access: authenticated
---
```

Supported values:

- `public` — Accessible to everyone (default)
- `authenticated` — Requires any valid login
- `role:admin` — Requires a specific role claim from the auth provider

## Session Management

Sessions are stored in encrypted HTTP-only cookies by default. You can configure the session duration and storage backend:

```ts
lucode({
  auth: {
    session: {
      maxAge: 60 * 60 * 24 * 7, // 7 days
      secure: true,
    },
  },
});
```
