import { defaultTheme, defineUserConfig } from 'vuepress';
import { registerComponentsPlugin } from '@vuepress/plugin-register-components';
import { searchPlugin } from '@vuepress/plugin-search';
import { viteBundler } from '@vuepress/bundler-vite';
import { getDirname, path } from '@vuepress/utils';
import { glob } from 'glob';

let songFiles = glob.sync('docs/guides/**/*.md').map((f) => f.replace('docs', '').replace('index.md', ''));

import { description } from '../../package.json';

const __dirname = getDirname(import.meta.url);

import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

const fooTheme = (options) => {
    // returns a theme object
    return {
        name: 'vuepress-theme-foo',
        extends: defaultTheme(options),
        clientConfigFile: path.resolve(__dirname, 'client.ts'),
        templateBuild: path.resolve(__dirname, 'templates/build.html'),
        templateDev: path.resolve(__dirname, 'templates/build.html'),
    };
};
export default defineUserConfig({
    lang: 'en-US',
    // Global title in HTML <head>.
    // If page has title (in frontmatter) or h1 then: <page title/h1> | <global title>
    // e.g <title>Vuepress-DecapCMS-Netlify | VueDN</title>
    title: 'Course Critique',
    // Global description in in HTML <head>.
    // If page has description (in frontmatter) then: <global description is replaced by <page description>
    // <meta name="description" content="...">
    description: description,
    head: [
        [
            'script',
            {
                src: 'https://identity.netlify.com/v1/netlify-identity-widget.js',
            },
        ],
    ],

    // theme and its config
    theme: fooTheme({
        logo: 'logo.png',
        notFound: ['The page you are looking for does not exist'],
        // navbar: [
        //     {
        //         text: 'Guides',
        //         // notice the trailing / (for the automatic next and prev links based on the sidebar)
        //         link: '/guides/',
        //     },
        //     {
        //         text: 'Go to Course Critique',
        //         link: 'https://app.coursecritique.app/',
        //     },
        // ],
        // notice there's a difference between /songs and /songs/
        // We have the /songs to enable this sidebar for /songs and /songs/ paths
        sidebar: {
            '/guides': [
                {
                    text: 'Guides',
                    children: songFiles,
                },
            ],
        },
    }),

    // Replace footer
    alias: {
        '@theme/Navbar.vue': path.resolve(__dirname, './components/Navbar.vue'),
        '@theme/Sidebar.vue': path.resolve(__dirname, './components/Sidebar.vue'),
        '@theme/ToggleColorModeButton.vue': path.resolve(__dirname, './components/ToggleColorModeButton.vue'),
        // '@theme/NavbarBrand.vue': path.resolve(__dirname, './components/NavbarBrand.vue'),
        // '@theme/HomeFooter.vue': path.resolve(__dirname, './components/MyHomeFooter.vue'),
    },

    plugins: [
        registerComponentsPlugin({
            componentsDir: path.resolve(__dirname, './components'),
        }),
        searchPlugin({}),
    ],

    bundler: viteBundler({
        viteOptions: {
            css: {
                postcss: {
                    plugins: [tailwindcss, autoprefixer],
                },
            },
        },
    }),
});
