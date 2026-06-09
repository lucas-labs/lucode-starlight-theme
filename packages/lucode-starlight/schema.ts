import { z } from 'astro/zod';

export const heroLayoutSchema = z
    .enum(['centered', 'centered-top', 'split-left', 'split-right', 'banner'])
    .default('centered')
    .describe(
        'The layout of the hero section. "centered" places the image below the text, "centered-top" places it above, "split-left" places text left and image right, "split-right" places text right and image left.'
    );

export type HeroLayout = z.infer<typeof heroLayoutSchema>;

export const ExtendDocsSchema = z.object({
    hero: z
        .object({
            layout: heroLayoutSchema,
            announcement: z
                .object({
                    text: z.string(),
                    link: z.string(),
                })
                .optional(),
            shadcn: z
                .object({
                    actions: z
                        .object({
                            text: z.string(),
                            link: z.string(),
                            variant: z
                                .enum([
                                    'default',
                                    'link',
                                    'secondary',
                                    'outline',
                                    'ghost',
                                    'destructive',
                                ])
                                .default('default'),
                            icon: z.string().optional(),
                            attrs: z
                                .record(z.string(), z.union([z.string(), z.number(), z.boolean()]))
                                .optional(),
                        })
                        .array()
                        .default([]),
                })
                .optional(),
        })
        .optional(),
});
