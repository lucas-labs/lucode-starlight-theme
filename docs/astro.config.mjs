// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import lucode from 'lucode-starlight';

// https://astro.build/config
export default defineConfig({
    integrations: [
        starlight({
            title: 'Lucode Starlight',
            logo: {
                src: './src/assets/logo.svg',
                alt: 'Lucode logo',
                replacesTitle: true,
            },
            customCss: ['./src/styles/global.css'],
            editLink: {
                baseUrl: 'https://github.com/lucas-labs/lucode-starlight-theme/edit/master/docs',
            },
            lastUpdated: true,
            plugins: [
                lucode({
                    navLinks: [
                        { label: 'Docs', link: '/guides/getting-started/' },
                        { label: 'Showcase', link: '/showcase/starlight-components/' },
                        { label: 'API', link: '/reference/plugin-api/' },
                    ],
                }),
            ],
            social: [
                {
                    icon: 'github',
                    label: 'GitHub',
                    href: 'https://github.com/lucas-labs/lucode-starlight-theme',
                },
            ],
            sidebar: [
                {
                    label: 'Start Here',
                    items: [
                        { label: 'Getting Started', link: '/guides/getting-started/' },
                        { label: 'Configuration', link: '/guides/configuration/' },
                        { label: 'Customize the Theme', link: '/guides/theming/' },
                    ],
                },
                {
                    label: 'Showcase',
                    items: [
                        { label: 'Starlight Components', link: '/showcase/starlight-components/' },
                        { label: 'Splash Pages', link: '/showcase/splash-pages/' },
                        { label: 'Typography', link: '/showcase/typography/' },
                    ],
                },
                {
                    label: 'Splash Examples',
                    items: [
                        { label: 'Centered', link: '/showcase/splash/centered/' },
                        { label: 'Centered Top', link: '/showcase/splash/centered-top/' },
                        { label: 'Split Left', link: '/showcase/splash/split-left/' },
                        { label: 'Split Right', link: '/showcase/splash/split-right/' },
                        { label: 'Banner', link: '/showcase/splash/banner/' },
                    ],
                },
                {
                    label: 'Reference',
                    items: [
                        { label: 'Theme Components', link: '/reference/components/' },
                        { label: 'Plugin API', link: '/reference/plugin-api/' },
                    ],
                },
            ],
        }),
    ],

    vite: {
        plugins: [],
    },
});
