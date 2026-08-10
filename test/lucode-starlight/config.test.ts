import { describe, expect, it } from 'vitest';
import { PAGE_TITLE_ID } from '../../packages/lucode-starlight/core/config/constants';
import { expressiveCode } from '../../packages/lucode-starlight/core/config/expresive-code';
import { override } from '../../packages/lucode-starlight/core/config/override';
import { LucodeStarlightConfigSchema } from '../../packages/lucode-starlight/core/config/schemas';
import { vitePlugin } from '../../packages/lucode-starlight/core/config/vite';
import { ExtendDocsSchema, heroLayoutSchema } from '../../packages/lucode-starlight/schema';

type VitePluginLike = {
    resolveId: ((id: string) => string | undefined) | undefined;
    load: ((id: string) => string | undefined) | undefined;
};

function asPlugin(value: ReturnType<typeof vitePlugin>): VitePluginLike {
    if (!value || Array.isArray(value) || typeof value !== 'object' || 'then' in value) {
        throw new Error('Expected vitePlugin() to return a single Vite plugin object.');
    }

    return value as unknown as VitePluginLike;
}

describe('LucodeStarlightConfigSchema', () => {
    it('applies defaults to optional fields', () => {
        const result = LucodeStarlightConfigSchema.parse({});

        expect(result.docs.includeAiUtilities).toBe(false);
        expect(result.footerText).toContain('Inspired by');
        expect(result.navLinks).toBeUndefined();
    });

    it('accepts nav links with HTML attributes', () => {
        const result = LucodeStarlightConfigSchema.parse({
            navLinks: [
                {
                    label: 'GitHub',
                    link: 'https://github.com/lucas-labs',
                    attrs: {
                        target: '_blank',
                        tabindex: 0,
                        hidden: false,
                    },
                },
            ],
        });

        expect(result.navLinks).toEqual([
            {
                label: 'GitHub',
                link: 'https://github.com/lucas-labs',
                attrs: {
                    target: '_blank',
                    tabindex: 0,
                    hidden: false,
                },
            },
        ]);
    });

    it('accepts nav link translations and localized footerText', () => {
        const result = LucodeStarlightConfigSchema.parse({
            navLinks: [
                {
                    label: 'Docs',
                    link: '/getting-started/',
                    translations: {
                        en: 'Docs',
                        es: 'Documentación',
                    },
                },
            ],
            footerText: {
                es: 'Hecho con Astro.',
                en: 'Built with Astro.',
            },
        });

        expect(result.navLinks).toEqual([
            {
                label: 'Docs',
                link: '/getting-started/',
                translations: {
                    en: 'Docs',
                    es: 'Documentación',
                },
                attrs: {},
            },
        ]);
        expect(result.footerText).toEqual({
            es: 'Hecho con Astro.',
            en: 'Built with Astro.',
        });
    });

    it('accepts locale-map nav labels (BCP-47 keys)', () => {
        const result = LucodeStarlightConfigSchema.parse({
            navLinks: [
                {
                    link: '/getting-started/',
                    label: {
                        en: 'Docs',
                        es: 'Documentación',
                    },
                },
            ],
        });

        expect(result.navLinks?.[0]?.label).toEqual({
            en: 'Docs',
            es: 'Documentación',
        });
    });
});

describe('vitePlugin', () => {
    it('exposes the virtual config module', () => {
        const config = LucodeStarlightConfigSchema.parse({
            docs: { includeAiUtilities: true },
            footerText: 'Custom footer',
        });
        const plugin = asPlugin(vitePlugin(config));

        expect(plugin.resolveId?.('virtual:lucode-starlight-config')).toBe(
            '\0virtual:lucode-starlight-config'
        );
        expect(plugin.resolveId?.('virtual:another-module')).toBeUndefined();
        expect(plugin.load?.('\0virtual:lucode-starlight-config')).toBe(
            `export default ${JSON.stringify(config)}`
        );
        expect(plugin.load?.('virtual:another-module')).toBeUndefined();
    });
});

describe('override', () => {
    const starlightConfig = { components: { Header: './src/components/Header.astro' } };

    function collectWarnings() {
        const warnings: string[] = [];
        return {
            warnings,
            logger: {
                warn(message: string) {
                    warnings.push(message);
                },
            },
        };
    }

    it('adds package overrides without replacing existing ones', () => {
        const { warnings, logger } = collectWarnings();

        const components = override(
            starlightConfig as never,
            LucodeStarlightConfigSchema.parse({}),
            ['Header', 'Footer'] as never,
            logger as never
        );

        expect(components).toEqual({
            Header: './src/components/Header.astro',
            Footer: 'lucode-starlight/components/overrides/Footer.astro',
        });
        expect(warnings).toHaveLength(2);
        expect(warnings[0]).toContain('Header');
        expect(warnings[1]).toContain('lucode-starlight/components/overrides/Header.astro');
    });

    it('silences the warnings when `warnOverrides` is false', () => {
        const { warnings, logger } = collectWarnings();

        const components = override(
            starlightConfig as never,
            LucodeStarlightConfigSchema.parse({ warnOverrides: false }),
            ['Header', 'Footer'] as never,
            logger as never
        );

        expect(components).toEqual({
            Header: './src/components/Header.astro',
            Footer: 'lucode-starlight/components/overrides/Footer.astro',
        });
        expect(warnings).toHaveLength(0);
    });
});

describe('expressiveCode', () => {
    it('returns false when expressive code is disabled', () => {
        expect(expressiveCode({ expressiveCode: false } as never)).toBe(false);
    });

    it('merges Lucode defaults with user expressive-code settings', () => {
        const result = expressiveCode({
            expressiveCode: {
                themes: ['custom-theme'],
                styleOverrides: {
                    frames: {
                        copyIcon: 'custom-copy-icon',
                    },
                    textMarkers: {
                        markBackground: 'var(--custom-mark)',
                    },
                },
            },
        } as never);

        expect(result).not.toBe(false);
        if (result === false) return;

        expect(result).toMatchObject({
            themes: ['custom-theme'],
            styleOverrides: {
                codeBackground: 'var(--code-background)',
                textMarkers: {
                    markBackground: 'var(--custom-mark)',
                    markBorderColor: 'var(--border)',
                },
                frames: {
                    editorBackground: 'var(--code-background)',
                    copyIcon: 'custom-copy-icon',
                },
            },
        });
    });
});

describe('schema exports', () => {
    it('defaults the hero layout to centered', () => {
        const result = ExtendDocsSchema.parse({
            hero: {
                announcement: {
                    text: 'New release',
                    link: '/guides/getting-started',
                },
            },
        });

        expect(result.hero?.layout).toBe('centered');
    });

    it('rejects unsupported hero layouts', () => {
        expect(() => heroLayoutSchema.parse('stacked')).toThrow();
    });

    it('defaults the hero action variant to default', () => {
        const result = ExtendDocsSchema.parse({ hero: { actions: [{}] } });

        expect(result.hero?.actions?.[0]?.variant).toBe('default');
    });

    it.each(['default', 'link', 'secondary', 'outline', 'ghost', 'destructive'])(
        'accepts the shadcn hero action variant %s',
        (variant) => {
            const result = ExtendDocsSchema.parse({ hero: { actions: [{ variant }] } });

            expect(result.hero?.actions?.[0]?.variant).toBe(variant);
        }
    );

    // Starlight's own variant names must keep parsing so existing frontmatter does not break.
    it.each(['primary', 'secondary', 'minimal'])(
        "accepts Starlight's hero action variant %s",
        (variant) => {
            const result = ExtendDocsSchema.parse({ hero: { actions: [{ variant }] } });

            expect(result.hero?.actions?.[0]?.variant).toBe(variant);
        }
    );

    it('rejects unsupported hero action variants', () => {
        expect(() =>
            ExtendDocsSchema.parse({ hero: { actions: [{ variant: 'fancy' }] } })
        ).toThrow();
    });
});

describe('constants', () => {
    it('exports the page title anchor id', () => {
        expect(PAGE_TITLE_ID).toBe('_top');
    });
});
