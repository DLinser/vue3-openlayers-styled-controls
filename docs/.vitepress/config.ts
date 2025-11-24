import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'vue3-openlayers-styled-controls',
  base: '/vue3-openlayers-styled-controls/',
  // 多语言配置
  locales: {
    root: {
      label: '简体中文',
      lang: 'zh-CN',
      description: '一套基于 Vue 3 和 OpenLayers 的可定制样式地图控件库',
      link: '/',
      themeConfig: {
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
              { text: '图层切换控件', link: '/components/base-layer-switcher' },
              { text: '标绘控件', link: '/components/plot-control' }
            ]
          }
        ],
        socialLinks: [
          { icon: 'github', link: 'https://github.com/DLinser/vue3-openlayers-styled-controls' },
          {
            icon: {
              svg: '<svg t="1763602867198" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5658" width="24" height="24"><path d="M512 0c282.784 0 512 229.216 512 512s-229.216 512-512 512S0 794.784 0 512 229.216 0 512 0z m189.952 752l11.2-108.224c-31.904 9.536-100.928 16.128-147.712 16.128-134.464 0-205.728-47.296-195.328-146.304 11.584-110.688 113.152-145.696 232.64-145.696 54.784 0 122.432 8.8 151.296 18.336L768 272.704C724.544 262.24 678.272 256 599.584 256c-203.2 0-388.704 94.88-406.4 263.488C178.336 660.96 303.584 768 535.616 768c80.672 0 138.464-6.432 166.336-16z" fill="#4B4948" p-id="5659"></path></svg>'
            },
            link: 'https://blog.csdn.net/Yuanben_wuxin'
          }
        ],
        footer: {
          message: 'Released under the MIT License.',
          copyright: 'Copyright © 2023-present Your Name'
        },
        lastUpdated: {
          text: '更新于',
          formatOptions: {
            dateStyle: 'full',
            timeStyle: 'medium'
          }
        }
      }
    },
    en: {
      label: 'English',
      lang: 'en-US',
      link: '/en/',
      title: 'vue3-openlayers-styled-controls',
      description: 'A customizable styled map controls library based on Vue 3 and OpenLayers',
      themeConfig: {
        nav: [
          { text: 'Home', link: '/en/' },
          { text: 'Guide', link: '/en/guide/getting-started' },
          { text: 'Components', link: '/en/components/' }
        ],
        sidebar: [
          {
            text: 'Guide',
            items: [
              { text: 'Introduction', link: '/en/guide/introduction' },
              { text: 'Getting Started', link: '/en/guide/getting-started' },
              { text: 'Theming', link: '/en/guide/theming' },
              { text: 'Internationalization', link: '/en/guide/i18n' }
            ]
          },
          {
            text: 'Components',
            items: [
              { text: 'Control Bar', link: '/en/components/control-bar' },
              { text: 'Home Controls', link: '/en/components/home-control' },
              { text: 'Zoom Controls', link: '/en/components/zoom-controls' },
              { text: 'Full Screen Control', link: '/en/components/fullscreen-control' },
              { text: 'Measure Controls', link: '/en/components/measure-controls' },
              { text: 'Clear Control', link: '/en/components/clear-control' },
              { text: 'Swipe Control', link: '/en/components/swipe-control' },
              { text: 'Base Layer Switcher', link: '/en/components/base-layer-switcher' },
              { text: 'Plot Control', link: '/en/components/plot-control' },
              { text: 'Export Control', link: '/en/components/export-control' }
            ]
          }
        ],
        socialLinks: [
          { icon: 'github', link: 'https://github.com/DLinser/vue3-openlayers-styled-controls' },
          {
            icon: {
              svg: '<svg t="1763602867198" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5658" width="24" height="24"><path d="M512 0c282.784 0 512 229.216 512 512s-229.216 512-512 512S0 794.784 0 512 229.216 0 512 0z m189.952 752l11.2-108.224c-31.904 9.536-100.928 16.128-147.712 16.128-134.464 0-205.728-47.296-195.328-146.304 11.584-110.688 113.152-145.696 232.64-145.696 54.784 0 122.432 8.8 151.296 18.336L768 272.704C724.544 262.24 678.272 256 599.584 256c-203.2 0-388.704 94.88-406.4 263.488C178.336 660.96 303.584 768 535.616 768c80.672 0 138.464-6.432 166.336-16z" fill="#4B4948" p-id="5659"></path></svg>'
            },
            link: 'https://blog.csdn.net/Yuanben_wuxin'
          }
        ],
        footer: {
          message: 'Released under the MIT License.',
          copyright: 'Copyright © 2023-present Your Name'
        },
        lastUpdated: {
          text: 'Updated at',
          formatOptions: {
            dateStyle: 'full',
            timeStyle: 'medium'
          }
        }
      }
    }
  }
})
