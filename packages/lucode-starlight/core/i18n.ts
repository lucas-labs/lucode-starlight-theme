export type LocaleLookup = {
    /** BCP-47 tag from the active locale (`locales[x].lang`), e.g. `en`. */
    lang?: string;
    /** Locale path key (`Astro.currentLocale`), e.g. `en`. */
    locale?: string;
    /** Default locale BCP-47 tag or path used as fallback. */
    defaultLang: string;
    /** Default locale path key, e.g. `en`. */
    defaultLocale?: string;
};

/**
 * Pick a value from a locale dictionary.
 *
 * Tries exact then case-insensitive matches for active locale candidates first,
 * then the same for fallback/default candidates. This covers Starlight setups
 * where config keys are BCP-47 (`es-ES`) but `Astro.currentLocale` is the path
 * (`es-es`), without letting the default locale shadow an active case-insensitive hit.
 */
export function pickLocalized(
    dictionary: Record<string, string> | undefined,
    candidates: Array<string | undefined>,
    fallbacks: Array<string | undefined> = []
): string | undefined {
    if (!dictionary) {
        return undefined;
    }

    const lowerMap = Object.fromEntries(
        Object.entries(dictionary).map(([key, value]) => [key.toLowerCase(), value])
    );

    const pickExact = (keys: Array<string | undefined>) => {
        for (const key of keys) {
            if (key && dictionary[key]) {
                return dictionary[key];
            }
        }
        return undefined;
    };

    const pickCaseInsensitive = (keys: Array<string | undefined>) => {
        for (const key of keys) {
            if (!key) {
                continue;
            }

            const match = lowerMap[key.toLowerCase()];
            if (match) {
                return match;
            }
        }
        return undefined;
    };

    return (
        pickExact(candidates) ??
        pickCaseInsensitive(candidates) ??
        pickExact(fallbacks) ??
        pickCaseInsensitive(fallbacks)
    );
}

/** @deprecated Prefer `pickLocalized`. Kept for existing call sites/tests. */
export function pickLang(
    dictionary: Record<string, string> | undefined,
    lang: string
): string | undefined {
    return pickLocalized(dictionary, [lang]);
}

function activeKeys({ lang, locale }: LocaleLookup): Array<string | undefined> {
    return [lang, locale];
}

function fallbackKeys({ defaultLang, defaultLocale }: LocaleLookup): Array<string | undefined> {
    return [defaultLang, defaultLocale];
}

/**
 * Resolve a nav link label.
 *
 * Supports both APIs:
 * - Starlight sidebar style: `label: string` + optional `translations`
 * - Locale map style: `label: Record<BCP-47 | locale-path, string>`
 */
export function resolveNavLabel(
    label: string | Record<string, string>,
    translations: Record<string, string> | undefined,
    keys: LocaleLookup
): string {
    const primary = activeKeys(keys);
    const fallback = fallbackKeys(keys);

    if (typeof label === 'string') {
        return pickLocalized(translations, primary, fallback) || label;
    }

    const resolved = pickLocalized(label, primary, fallback);
    if (resolved) {
        return resolved;
    }

    throw new Error(
        `Localized label must include a key for the default language "${keys.defaultLang}".`
    );
}

/**
 * Resolve a sidebar-style label: `translations[lang] ?? label`.
 * Accepts a LocaleLookup or a bare lang string for convenience.
 */
export function resolveLabel(
    label: string,
    translations: Record<string, string> | undefined,
    langOrKeys: string | LocaleLookup
): string {
    if (typeof langOrKeys === 'string') {
        return pickLocalized(translations, [langOrKeys]) || label;
    }

    return resolveNavLabel(label, translations, langOrKeys);
}

/**
 * Resolve a title-style localized string (`string | Record<string, string>`).
 * Prefers the active language/locale, then falls back to the default language.
 */
export function resolveLocalizedString(
    value: string | Record<string, string>,
    langOrKeys: string | LocaleLookup,
    defaultLang?: string
): string {
    if (typeof value === 'string') {
        return value;
    }

    const keys: LocaleLookup =
        typeof langOrKeys === 'string'
            ? { lang: langOrKeys, defaultLang: defaultLang ?? langOrKeys }
            : langOrKeys;

    const resolved = pickLocalized(value, activeKeys(keys), fallbackKeys(keys));
    if (resolved) {
        return resolved;
    }

    throw new Error(
        `Localized string must include a key for the default language "${keys.defaultLang}".`
    );
}

/** Build a LocaleLookup from Starlight + Astro locale values. */
export function createLocaleLookup(options: {
    lang?: string;
    locale?: string;
    defaultLang?: string;
    defaultLocale?: string;
}): LocaleLookup {
    const result: LocaleLookup = {
        defaultLang: options.defaultLang || options.defaultLocale || 'en',
    };

    if (options.lang !== undefined) {
        result.lang = options.lang;
    }
    if (options.locale !== undefined) {
        result.locale = options.locale;
    }
    if (options.defaultLocale !== undefined) {
        result.defaultLocale = options.defaultLocale;
    }

    return result;
}
