import type { AstroBuiltinAttributes } from 'astro';
import type { HTMLAttributes } from 'astro/types';
import { z } from 'astro/zod';

const linkHTMLAttributesSchema = z.record(
    z.string(),
    z.union([z.string(), z.number(), z.boolean(), z.undefined()])
) as z.Schema<Omit<HTMLAttributes<'a'>, keyof AstroBuiltinAttributes | 'children'>>;

const LinkItemHTMLAttributesSchema = () => linkHTMLAttributesSchema.default({});

export const linkSchema = z.object({
    /**
     * An optional badge to display next to the topic label.
     *
     * This option accepts the same configuration as the Starlight badge sidebar item configuration.
     * @see https://starlight.astro.build/guides/sidebar/#badges
     */
    badge: z.string().optional(),
    /**
     * The link label.
     *
     * - A string used as the default-locale label (pair with `translations` for other languages).
     * - Or a locale map keyed by BCP-47 tags / locale paths (e.g. `en`, `es`).
     *
     * @see https://starlight.astro.build/guides/sidebar/#internationalization
     */
    label: z.union([z.string(), z.record(z.string(), z.string())]),
    /**
     * Optional labels for other languages when `label` is a string.
     * Keys should be BCP-47 tags (e.g. `en`, `es`), matching Starlight sidebar translations.
     *
     * @see https://starlight.astro.build/guides/sidebar/#internationalization
     */
    translations: z.record(z.string(), z.string()).optional(),
    /**
     * The link to the topic’s content which an be a relative link to local files or the full URL of an external page.
     *
     * For internal links, the link can either be a page included in the items array or a different page acting as the
     * topic’s landing page.
     */
    link: z.string(),
    /** HTML attributes to add to the link item. */
    attrs: LinkItemHTMLAttributesSchema().optional(),
});

export type Link = z.infer<typeof linkSchema>;

export const LucodeStarlightConfigSchema = z.object({
    navLinks: z.array(linkSchema).optional(),
    docs: z
        .object({
            includeAiUtilities: z.boolean().optional().default(false),
        })
        .optional()
        .default({ includeAiUtilities: false }),
    /**
     * Footer Markdown text. Can be a string, or for multilingual sites an object with values for
     * each locale. Keys may be BCP-47 tags (e.g. `en`, `es`) or locale paths.
     *
     * @see https://starlight.astro.build/reference/configuration/#title
     */
    footerText: z
        .union([z.string(), z.record(z.string(), z.string())])
        .optional()
        .default(
            'Inspired by the [shadcn/ui](https://ui.shadcn.com/) documentation theme and based on [starlight-theme-black](https://github.com/adrian-ub/starlight-theme-black). Ported to Astro Starlight by [lucas-labs](https://github.com/lucas-labs).'
        ),
});

export type LucodeStarlightUserConfig = z.input<typeof LucodeStarlightConfigSchema>;
export type LucodeStarlightConfig = z.output<typeof LucodeStarlightConfigSchema>;
