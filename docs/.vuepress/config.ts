import { defaultTheme, defineUserConfig } from 'vuepress';
import { registerComponentsPlugin } from '@vuepress/plugin-register-components';
import { searchPlugin } from '@vuepress/plugin-search';
import { getDirname, path } from '@vuepress/utils';
import { description } from '../../package.json';

const __dirname = getDirname(import.meta.url);

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
    theme: defaultTheme({
        logo: 'cclogo-v.svg',
        notFound: ['The page you are looking for does not exist'],
        navbar: [
            {
                text: 'Guides',
                // notice the trailing / (for the automatic next and prev links based on the sidebar)
                link: '/guides/',
            },
            {
                text: 'Go to Course Critique',
                link: 'https://app.coursecritique.app/',
            },
        ],
        // notice there's a difference between /songs and /songs/
        // We have the /songs to enable this sidebar for /songs and /songs/ paths
        sidebar: {
            '/guides': [
                {
                    text: 'Guides',
                    children: [
                        '/guides/01-getting-started',
                        '/guides/02-creating-your-first-survey',
                        '/guides/03-analyzing-results',
                        '/guides/2023-09-02/index-1',
                    ],
                },
            ],
        },
    }),

    // Replace footer
    alias: {
        '@theme/HomeFooter.vue': path.resolve(__dirname, './components/MyHomeFooter.vue'),
    },

    // plugin
    plugins: [
        registerComponentsPlugin({
            // options
            // Absolute path to the components directory
            componentsDir: path.resolve(__dirname, './components'),
        }),
        searchPlugin({
            // options
            // Default shortcut is key '/'
        }),
    ],
});
