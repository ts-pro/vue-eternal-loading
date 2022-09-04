import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'en-US',
  title: 'vue-eternal-loading',
  description: 'Infinity loading component vue3 projects.',
  base: '/vue-eternal-loading/',
  head: [
    ['link', { rel: "icon", type: "image/png", sizes: "16x16", href: "/vue-eternal-loading/logo.png"}],
  ],
  themeConfig: {
    logo: '/logo.png',

    nav: [
      { text: 'Guide', link: '/', activeMatch: '^/$|^/guide/' },
      {
        text: 'API Reference',
        link: '/api/props',
        activeMatch: '^/api/'
      },
      {
        text: 'Release Notes',
        link: 'https://github.com/ts-pro/vue-eternal-loading/releases'
      }
    ],

    sidebar: {
      '/guide/': getGuideSidebar(),
      '/api/': getApiSidebar(),
      '/': getGuideSidebar(),
    }
  },
})

function getGuideSidebar() {
  return [
    {
      text: 'Getting started',
      items: [
        { text: 'Introduction', link: '/' },
        { text: 'Installation', link: '/guide/installation' },
        { text: 'Simple usage', link: '/guide/simple-usage' },
      ]
    },
    {
      text: 'Examples',
      items: [
        { text: 'Loading states', link: '/guide/loading-states' },
        { text: 'Styling with slots', link: '/guide/styling-with-slots' },
        { text: 'Manually change states', link: '/guide/manually-change-states' },
        { text: 'Reset state', link: '/guide/reset-state' },
        { text: 'Preloaded data', link: '/guide/preloaded-data' },
        { text: 'Loader positions', link: '/guide/loader-positions' },
        { text: 'Loader margin', link: '/guide/loader-margin' },
        { text: 'Retry loading', link: '/guide/retry-loading' },
      ]
    }
  ]
}

function getApiSidebar() {
  return [
    {
      text: 'API',
      items: [
        { text: 'Props', link: '/api/props' },
        { text: 'Slots', link: '/api/slots' },
        { text: 'Types', link: '/api/types' },
      ]
    },
  ]
}
