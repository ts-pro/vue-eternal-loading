module.exports = {
  title: 'Vue eternal loading',
  description: 'Infinity loading component vue3 projects.',
  themeConfig: {
    repo: 'ts-pro/vue-eternal-loading',
    docsDir: 'docs',

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
        { text: 'Installation', link: '/test' },
        { text: 'Simple usage', link: '/test' },
      ]
    },
    {
      text: 'Examples',
      children: [
        { text: 'Loading states', link: '/guide/frontmatter' },
        { text: 'Styling with slots', link: '/guide/frontmatter' },
        { text: 'Manually change states', link: '/guide/frontmatter' },
        { text: 'Initial loading', link: '/guide/frontmatter' },
        { text: 'Preloaded data', link: '/guide/frontmatter' },
        { text: 'Loader positions', link: '/guide/frontmatter' },
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
