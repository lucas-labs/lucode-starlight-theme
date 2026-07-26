import { describe, expect, it } from 'vitest';
import {
    createLocaleLookup,
    pickLang,
    pickLocalized,
    resolveLabel,
    resolveLocalizedString,
    resolveNavLabel,
} from '../../packages/lucode-starlight/core/i18n';

describe('i18n helpers', () => {
    it('picks a translation by language tag', () => {
        expect(pickLang({ es: 'Documentación', en: 'Docs' }, 'es')).toBe('Documentación');
        expect(pickLang({ es: 'Documentación' }, 'en')).toBeUndefined();
        expect(pickLang(undefined, 'en')).toBeUndefined();
    });

    it('resolves BCP-47 keys when the active locale is the path (es-es vs es-ES)', () => {
        const labels = {
            en: 'Docs',
            'es-ES': 'Documentación',
        };

        expect(pickLocalized(labels, ['es-es', 'es-ES'])).toBe('Documentación');

        expect(
            resolveNavLabel(labels, undefined, {
                lang: 'es-ES',
                locale: 'es-es',
                defaultLang: 'en',
                defaultLocale: 'en',
            })
        ).toBe('Documentación');

        expect(
            resolveNavLabel(labels, undefined, {
                lang: 'en',
                locale: 'en',
                defaultLang: 'en',
                defaultLocale: 'en',
            })
        ).toBe('Docs');
    });

    it('resolves sidebar-style labels with translations fallback', () => {
        const translations = { es: 'Documentación' };
        const keys = createLocaleLookup({
            lang: 'es',
            locale: 'es',
            defaultLang: 'en',
            defaultLocale: 'en',
        });

        expect(resolveLabel('Docs', translations, 'es')).toBe('Documentación');
        expect(resolveLabel('Docs', translations, 'en')).toBe('Docs');
        expect(resolveLabel('Docs', undefined, 'es')).toBe('Docs');
        expect(resolveNavLabel('Docs', translations, keys)).toBe('Documentación');
        expect(
            resolveNavLabel('Docs', translations, {
                lang: 'en',
                locale: 'en',
                defaultLang: 'en',
            })
        ).toBe('Docs');
    });

    it('resolves title-style localized strings with locale path fallback', () => {
        const footerText = {
            en: 'Built with Astro.',
            es: 'Hecho con Astro.',
        };

        expect(resolveLocalizedString(footerText, 'es', 'en')).toBe('Hecho con Astro.');
        expect(resolveLocalizedString(footerText, 'fr', 'en')).toBe('Built with Astro.');
        expect(resolveLocalizedString('Plain footer', 'es', 'en')).toBe('Plain footer');
        expect(
            resolveLocalizedString(footerText, {
                locale: 'ES',
                defaultLang: 'en',
                defaultLocale: 'en',
            })
        ).toBe('Hecho con Astro.');
    });

    it('throws when a localized object is missing the default language', () => {
        expect(() => resolveLocalizedString({ es: 'Hecho con Astro.' }, 'fr', 'en')).toThrow(
            /default language "en"/
        );

        expect(() =>
            resolveNavLabel({ es: 'Documentación' }, undefined, {
                defaultLang: 'en',
                locale: 'en',
            })
        ).toThrow(/default language "en"/);
    });
});
