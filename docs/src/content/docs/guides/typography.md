---
title: Typography
description: A showcase of all typography styles used in this theme.
---

This page demonstrates how different typography elements render in the theme.

## Heading Level 2

Content below an h2 heading. This is how body text looks alongside section headings.

### Heading Level 3

Content below an h3 heading. Subsections use this heading level.

#### Heading Level 4

Content below an h4 heading for deeper nesting.

##### Heading Level 5

Content below an h5 heading.

###### Heading Level 6

Content below an h6 heading.

## Inline Elements

This is a paragraph with **bold text**, *italic text*, and ***bold italic*** text. You can also use `inline code` within sentences. Here's a [link to another page](/guides/example/) and an [external link](https://astro.build).

~~Strikethrough text~~ is also supported.

## Blockquotes

> This is a blockquote. It can contain **bold**, *italic*, and `code`.
>
> It can also span multiple paragraphs.

> Nested blockquotes:
>
> > Are also possible and should render correctly.

## Lists

### Unordered List

- First item
- Second item
  - Nested item A
  - Nested item B
    - Deeply nested
- Third item

### Ordered List

1. First step
2. Second step
   1. Sub-step A
   2. Sub-step B
3. Third step

## Code

Inline `code` looks like this. Here's a longer inline code span: `const theme = "shadcn"`.

```ts
// A fenced code block
import { defineConfig } from "astro/config";

export default defineConfig({
  integrations: [],
  site: "https://example.com",
});
```

```css
/* CSS code block */
:root {
  --background: oklch(14.5% 0 0);
  --foreground: oklch(98.5% 0 0);
  --radius: 0.625rem;
}
```

## Tables

| Feature       | Status      | Notes                          |
|---------------|-------------|--------------------------------|
| Dark Mode     | ✅ Supported | First-class theme switching    |
| Responsive    | ✅ Supported | Mobile-first breakpoints       |
| Accessibility | ✅ Supported | WAI-ARIA compliant             |
| RTL           | ⚠️ Partial   | Some components need work      |

## Horizontal Rule

Content above the rule.

---

Content below the rule.

## Images

![Houston, the Astro mascot](../../../assets/houston.webp)

## Keyboard Shortcuts

Press <kbd>Ctrl</kbd> + <kbd>K</kbd> to open search.

## Definition-style Content

**Term One**
: Definition of the first term.

**Term Two**
: Definition of the second term with `code` and a [link](#).
