import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import Vue3OpenLayers from 'vue3-openlayers'
import OpenLayersStyledControls from '../../../src/index.ts'

import 'vue3-openlayers/styles.css'
import '../../../src/assets/style/index.scss'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.use(Vue3OpenLayers)
    app.use(OpenLayersStyledControls, { locale: 'zh-CN' })
  }
} satisfies Theme
