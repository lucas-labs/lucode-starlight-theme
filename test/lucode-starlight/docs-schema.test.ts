import { beforeEach, describe, expect, it } from 'vitest';
import {
    isDocsSchemaExtended,
    markDocsSchemaLoaded,
    missingDocsSchemaWarning,
    resetDocsSchemaWarning,
    warnAboutMissingDocsSchemaOnce,
} from '../../packages/lucode-starlight/core/config/docs-schema';

const LOADED = Symbol.for('lucode-starlight.docs-schema-loaded');

function forgetSchemaImport() {
    delete (globalThis as Record<symbol, unknown>)[LOADED];
}

describe('isDocsSchemaExtended', () => {
    beforeEach(forgetSchemaImport);

    it('is false until the schema module is imported', () => {
        expect(isDocsSchemaExtended()).toBe(false);
    });

    it('is true once the schema module records itself', () => {
        markDocsSchemaLoaded();

        expect(isDocsSchemaExtended()).toBe(true);
    });

    it('is set as a side effect of importing `lucode-starlight/schema`', async () => {
        await import('../../packages/lucode-starlight/schema');

        expect(isDocsSchemaExtended()).toBe(true);
    });
});

describe('warnAboutMissingDocsSchemaOnce', () => {
    beforeEach(() => {
        resetDocsSchemaWarning();
        forgetSchemaImport();
    });

    it('warns once and stays quiet afterwards', () => {
        const messages: string[] = [];
        const warn = (message: string) => messages.push(message);

        expect(warnAboutMissingDocsSchemaOnce({ tagline: 'x' }, warn)).toBe(true);
        expect(warnAboutMissingDocsSchemaOnce({ tagline: 'x' }, warn)).toBe(false);
        expect(messages).toHaveLength(1);
    });

    it('stays quiet when the schema was imported', () => {
        markDocsSchemaLoaded();
        const messages: string[] = [];

        expect(warnAboutMissingDocsSchemaOnce({ tagline: 'x' }, (m) => messages.push(m))).toBe(
            false
        );
        expect(messages).toHaveLength(0);
    });

    it('stays quiet on pages without a hero', () => {
        const messages: string[] = [];
        const warn = (message: string) => messages.push(message);

        expect(warnAboutMissingDocsSchemaOnce(undefined, warn)).toBe(false);
        expect(warnAboutMissingDocsSchemaOnce(null, warn)).toBe(false);
        expect(messages).toHaveLength(0);
    });

    it('points at the fix', () => {
        const message = missingDocsSchemaWarning();

        expect(message).toContain('ExtendDocsSchema');
        expect(message).toContain('docsSchema({ extend: ExtendDocsSchema })');
        expect(message).toContain('lucode-starlight');
    });
});
