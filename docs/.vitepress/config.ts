import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'react-blogger-api',
  description:
    'Typed React hooks, providers, and clients for the Blogger API v3.',
  lang: 'en-US',
  base: '/',
  cleanUrls: true,
  lastUpdated: true,
  head: [
    ['meta', { name: 'theme-color', content: '#3b82f6' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: 'react-blogger-api' }],
    [
      'meta',
      {
        property: 'og:description',
        content:
          'Typed React hooks, providers, and clients for the Blogger API v3.',
      },
    ],
  ],
  themeConfig: {
    siteTitle: 'react-blogger-api',
    nav: [
      { text: 'Guide', link: '/guide/installation', activeMatch: '^/guide/' },
      { text: 'API', link: '/api/providers', activeMatch: '^/api/' },
    ],
    sidebar: {
      '/guide/': [
        {
          text: 'Introduction',
          items: [
            { text: 'Installation', link: '/guide/installation' },
            { text: 'Quick Start', link: '/guide/quick-start' },
          ],
        },
        {
          text: 'Advanced',
          items: [
            { text: 'Caching', link: '/guide/advanced/cache' },
            { text: 'Testing', link: '/guide/advanced/testing' },
          ],
        },
      ],
      '/api/': [
        {
          text: 'API Reference',
          items: [
            { text: 'Providers', link: '/api/providers' },
            { text: 'Hooks', link: '/api/hooks' },
            { text: 'Client', link: '/api/client' },
            { text: 'Types', link: '/api/types' },
            { text: 'Errors', link: '/api/errors' },
          ],
        },
      ],
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/itokun99/react-blogger-api' },
    ],
    search: {
      provider: 'local',
    },
    outline: {
      level: [2, 3],
    },
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2026 react-blogger-api contributors',
    },
  },
})
