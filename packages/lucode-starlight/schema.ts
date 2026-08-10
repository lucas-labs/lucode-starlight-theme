import { z } from 'astro/zod';
import { markDocsSchemaLoaded } from './core/config/docs-schema';

// Lets `Hero.astro` tell "the user never wired up the schema" apart from "this page has no extra
// hero fields", so it only warns in the first case. See `core/config/docs-schema.ts`.
markDocsSchemaLoaded();

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
            actions: z
                .array(
                    z.object({
                        /**
                         * Button style to use. Starlight's own `primary` and `minimal` are accepted
                         * as aliases of `default` and `ghost` so existing frontmatter keeps working.
                         *
                         * Requires `@astrojs/starlight >= 0.41.4`, which is the first version whose
                         * `docsSchema({ extend })` deep-merges instead of intersecting — an
                         * intersection cannot widen an enum Starlight already declares.
                         */
                        variant: z
                            .enum([
                                'default',
                                'link',
                                'secondary',
                                'outline',
                                'ghost',
                                'destructive',
                                'primary',
                                'minimal',
                            ])
                            .default('default'),
                    })
                )
                .default([]),
        })
        .optional(),
});
