// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import lucode from 'lucode-starlight';

// https://astro.build/config
export default defineConfig({
    integrations: [
        starlight({
            title: 'My Docs',
            logo: {
                src: './src/assets/logo.svg',
                alt: 'Lucode logo',
                replacesTitle: true,
            },
            customCss: ['./src/styles/global.css'],
            plugins: [
                lucode({
                    navLinks: [
                        { label: 'Docs', link: '/guides/getting-started/' },
                        { label: 'Components', link: '/reference/components/' },
                        { label: 'Themes', link: '/guides/theming/' },
                    ],
                }),
            ],
            social: [
                { icon: 'github', label: 'GitHub', href: 'https://github.com/withastro/starlight' },
            ],
            sidebar: [
                {
                    label: 'Guides',
                    autogenerate: { directory: 'guides' },
                },
                {
                    label: 'Reference',
                    autogenerate: { directory: 'reference' },
                },
            ],
        }),
    ],

    vite: {
        plugins: [],
    },
});
