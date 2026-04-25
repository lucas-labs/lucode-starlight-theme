import { z } from 'astro/zod';

export const heroLayoutSchema = z
    .enum(['centered', 'centered-top', 'split-left', 'split-right', 'banner'])
    .default('centered')
    .describe(
        'The layout of the hero section. "centered" places the image below the text, "centered-top" places it above, "split-left" places text left and image right, "split-right" places text right and image left.'
    );

export const ExtendDocsSchema = z.object({
    links: z
        .object({
            doc: z.string().optional(),
            api: z.string().optional(),
        })
        .optional(),
    hero: z
        .object({
            layout: heroLayoutSchema,
        })
        .optional(),
});
