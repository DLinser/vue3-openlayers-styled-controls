import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'

import 'vue3-openlayers/styles.css'
import '../../../src/assets/style/index.scss'
import '../../../src/assets/style/demos.scss'

export default {
  extends: DefaultTheme,
  async enhanceApp({ app }) {
    if (typeof window !== 'undefined') {
      // 避免 SSR 阶段去解析
      const Vue3OpenLayers = await import('vue3-openlayers')
      const OpenLayersStyledControls = await import('../../../src/index.ts')
      app.use(Vue3OpenLayers.default || Vue3OpenLayers)
      app.use(
        OpenLayersStyledControls.default || OpenLayersStyledControls,
        { locale: 'zh-CN' }
      )
    }
  }
} satisfies Theme
