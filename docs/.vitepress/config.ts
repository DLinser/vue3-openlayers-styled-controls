import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Vue3 OpenLayers Styled Controls',
  description: '一套基于 Vue 3 和 OpenLayers 的可定制样式地图控件库',
  base: '/vue3-openlayers-styled-controls/',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      { text: '指南', link: '/guide/getting-started' },
      { text: '组件', link: '/components/' }
    ],

    sidebar: [
      {
        text: '指南',
        items: [
          { text: '介绍', link: '/guide/introduction' },
          { text: '快速开始', link: '/guide/getting-started' },
          { text: '主题定制', link: '/guide/theming' },
          { text: '国际化', link: '/guide/i18n' }
        ]
      },
      {
        text: '组件',
        items: [
          { text: '控件栏', link: '/components/control-bar' },
          { text: '缩放控件', link: '/components/zoom-controls' },
          { text: '全屏控件', link: '/components/fullscreen-control' },
          { text: '测量控件', link: '/components/measure-controls' },
          { text: '清除控件', link: '/components/clear-control' },
          { text: '卷帘控件', link: '/components/swipe-control' },
          { text: '图层切换控件', link: '/components/base-layer-switcher' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/DLinser/vue3-openlayers-styled-controls' }
    ],

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2023-present Your Name'
    }
  }
})
