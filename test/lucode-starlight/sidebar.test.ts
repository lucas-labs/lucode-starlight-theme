import { describe, expect, it } from 'vitest';
import {
    flattenSidebar,
    isSidebarGroupOpen,
    type SidebarEntry,
} from '../../packages/lucode-starlight/core/sidebar';

function link(label: string, isCurrent = false): SidebarEntry {
    return {
        type: 'link',
        label,
        href: `/${label.toLowerCase()}/`,
        isCurrent,
        badge: undefined,
        attrs: {},
    } as SidebarEntry;
}

function group(label: string, entries: SidebarEntry[], collapsed = false): SidebarEntry {
    return { type: 'group', label, entries, collapsed, badge: undefined } as SidebarEntry;
}

describe('flattenSidebar', () => {
    it('returns links at the top level', () => {
        const flattened = flattenSidebar([link('One'), link('Two')]);

        expect(flattened.map((entry) => entry.label)).toEqual(['One', 'Two']);
    });

    it('descends through nested groups', () => {
        const tree = [
            link('Top'),
            group('Outer', [link('Middle'), group('Inner', [link('Deep')])]),
        ];

        expect(flattenSidebar(tree).map((entry) => entry.label)).toEqual(['Top', 'Middle', 'Deep']);
    });

    it('returns nothing for a group with no links', () => {
        expect(flattenSidebar([group('Empty', [])])).toEqual([]);
    });
});

describe('isSidebarGroupOpen', () => {
    it('opens a group that is not collapsed', () => {
        const entry = group('Guides', [link('One')]) as Extract<SidebarEntry, { type: 'group' }>;

        expect(isSidebarGroupOpen(entry)).toBe(true);
    });

    it('keeps a collapsed group closed when nothing inside is current', () => {
        const entry = group('Guides', [link('One')], true) as Extract<
            SidebarEntry,
            { type: 'group' }
        >;

        expect(isSidebarGroupOpen(entry)).toBe(false);
    });

    it('opens a collapsed group holding the current page', () => {
        const entry = group('Guides', [link('One'), link('Two', true)], true) as Extract<
            SidebarEntry,
            { type: 'group' }
        >;

        expect(isSidebarGroupOpen(entry)).toBe(true);
    });

    it('opens a collapsed group when the current page is nested deeper', () => {
        const entry = group('Outer', [group('Inner', [link('Deep', true)], true)], true) as Extract<
            SidebarEntry,
            { type: 'group' }
        >;

        expect(isSidebarGroupOpen(entry)).toBe(true);
    });
});
