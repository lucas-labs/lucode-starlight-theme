/**
 * Starlight validates frontmatter with `z.object`, which strips keys it does not know about. When
 * `docsSchema()` is called without `extend: ExtendDocsSchema`, the theme's own `hero` fields are
 * therefore dropped without any error, and splash pages silently fall back to the default layout.
 *
 * Detecting that from the parsed frontmatter is unreliable: Starlight builds some entries in code
 * rather than through the schema — its fallback 404 route hardcodes `hero` — so those look stripped
 * even on a correctly configured site. Instead, `lucode-starlight/schema` records that it was
 * imported, which answers the actual question: did the user wire the extension up at all?
 */
const LOADED = Symbol.for('lucode-starlight.docs-schema-loaded');

/** Called by `lucode-starlight/schema` on import. */
export function markDocsSchemaLoaded(): void {
    (globalThis as Record<symbol, unknown>)[LOADED] = true;
}

export function isDocsSchemaExtended(): boolean {
    return (globalThis as Record<symbol, unknown>)[LOADED] === true;
}

let warned = false;

/**
 * Emits {@link missingDocsSchemaWarning} the first time a page with a hero is rendered on a site
 * that never imported the schema. Returns whether it warned; later calls are no-ops, so a site with
 * several splash pages does not repeat the same advice once per page.
 */
export function warnAboutMissingDocsSchemaOnce(
    hero: unknown,
    warn: (message: string) => void = console.warn
): boolean {
    if (warned || hero == null || isDocsSchemaExtended()) return false;

    warned = true;
    warn(missingDocsSchemaWarning());
    return true;
}

/** Test seam: clears the once-per-process guard used by {@link warnAboutMissingDocsSchemaOnce}. */
export function resetDocsSchemaWarning(): void {
    warned = false;
}

/** The advice printed when the schema extension is missing. */
export function missingDocsSchemaWarning(): string {
    return [
        '[lucode-starlight] This page sets `hero` frontmatter, but the docs schema is not extended,',
        "so Starlight is dropping the theme's hero fields. `hero.layout`, `hero.announcement` and the",
        'extra `hero.actions[].variant` values have no effect until you extend it:',
        '',
        "    import { ExtendDocsSchema } from 'lucode-starlight/schema';",
        '',
        '    schema: docsSchema({ extend: ExtendDocsSchema }),',
        '',
        'See https://lucas-labs.github.io/lucode-starlight-theme/guides/configuration/#content-schema',
    ].join('\n');
}
