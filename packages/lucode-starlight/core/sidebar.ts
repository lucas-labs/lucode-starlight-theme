import type { StarlightRouteData } from '@astrojs/starlight/route-data';

export type SidebarEntry = StarlightRouteData['sidebar'][number];
export type SidebarGroup = Extract<SidebarEntry, { type: 'group' }>;
export type SidebarLink = Extract<SidebarEntry, { type: 'link' }>;

/** Every link reachable from `entries`, at any depth. */
export function flattenSidebar(entries: SidebarEntry[]): SidebarLink[] {
    return entries.flatMap((entry) =>
        entry.type === 'group' ? flattenSidebar(entry.entries) : [entry]
    );
}

/**
 * Whether a group renders expanded.
 *
 * `collapsed` is the author's default, but a group holding the current page always opens, otherwise
 * the reader would land on a page with no idea where they are in the tree.
 */
export function isSidebarGroupOpen(group: SidebarGroup): boolean {
    return !group.collapsed || flattenSidebar(group.entries).some((link) => link.isCurrent);
}
