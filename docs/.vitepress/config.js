module.exports = {
  title: 'vue-eternal-loading',
  description: 'Infinity loading component vue3 projects.',
  base: '/vue-eternal-loading/',
  head: [
    ['link', { rel: "icon", type: "image/png", sizes: "16x16", href: "/logo.png"}],
  ],
  themeConfig: {
    repo: 'ts-pro/vue-eternal-loading',
    docsDir: 'docs',
    logo: '/logo.png',

    editLinks: true,
    editLinkText: 'Edit this page on GitHub',
    lastUpdated: 'Last Updated',

    nav: [
      { text: 'Guide', link: '/' },
      {
        text: 'API Reference',
        link: '/config/basics',
        activeMatch: '^/config/'
      },
      {
        text: 'Release Notes',
        link: 'https://github.com/ts-pro/vue-eternal-loading/releases'
      }
    ],

    sidebar: {
      '/api/': getApiSidebar(),
      '/': getGuideSidebar()
    }
  },
}

function getGuideSidebar() {
  return [
    {
      text: 'Getting started',
      children: [
        { text: 'Introduction', link: '/' },
        { text: 'Installation', link: '/installation' },
        { text: 'Simple usage', link: '/simple-usage' },
      ]
    },
    {
      text: 'Examples',
      children: [
        { text: 'Loading states', link: '/loading-states' },
        { text: 'Styling with slots', link: '/styling-with-slots' },
        { text: 'Manually change states', link: '/manually-change-states' },
        { text: 'Reset state', link: '/reset-state' },
        { text: 'Preloaded data', link: '/preloaded-data' },
        { text: 'Loader positions', link: '/loader-positions' },
      ]
    }
  ]
}

function getApiSidebar() {
  return [
    {
      text: 'App Config',
      children: [{ text: 'Basics', link: '/config/basics' }]
    },
    {
      text: 'Theme Config',
      children: [
        { text: 'Homepage', link: '/config/homepage' },
        { text: 'Algolia Search', link: '/config/algolia-search' },
        { text: 'Carbon Ads', link: '/config/carbon-ads' }
      ]
    }
  ]
}
