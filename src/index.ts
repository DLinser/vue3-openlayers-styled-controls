// 组件库入口文件
import type { App } from 'vue'

// 导入组件
import OlStyledZoomInControl from './components/OlStyledZoomInControl.vue'
import OlStyledZoomOutControl from './components/OlStyledZoomOutControl.vue'
import OlStyledControlBar from './components/OlStyledControlBar.vue'
import OlStyledFullScreenControl from './components/OlStyledFullScreenControl.vue'
import OlStyledMeasureLengthControl from './components/OlStyledMeasureLengthControl.vue'
import OlStyledMeasureAreaControl from './components/OlStyledMeasureAreaControl.vue'
import OlStyledClearControl from './components/OlStyledClearControl.vue'
import OlStyledSwipeControl from './components/OlStyledSwipeControl.vue'
import OlStyledBaseLayerSwitcher from './components/OlStyledBaseLayerSwitcher.vue'
import OlStyledPlotControl from './components/OlStyledPlotControl.vue'
import OlStyledExportMapControl from './components/OlStyledExportMapControl.vue'
import OlStyledHomeControl from './components/OlStyledHomeControl.vue'

// 导入 i18n 配置
import { createI18n, setGlobalI18n } from './i18n'

// 定义插件配置接口
export interface OpenLayersControlsOptions {
  locale?: string
  messages?: Record<string, any>
}

// 导出组件
export {
  OlStyledZoomInControl,
  OlStyledZoomOutControl,
  OlStyledControlBar,
  OlStyledFullScreenControl,
  OlStyledMeasureLengthControl,
  OlStyledMeasureAreaControl,
  OlStyledClearControl,
  OlStyledSwipeControl,
  OlStyledBaseLayerSwitcher,
  OlStyledPlotControl,
  OlStyledExportMapControl,
  OlStyledHomeControl
}

// 导出 i18n 相关功能
export { createI18n, useI18n } from './i18n'

// 导出默认安装函数
export default {
  install(app: App, options?: OpenLayersControlsOptions) {
    // 如果提供了国际化配置，则创建并设置全局 i18n 实例
    if (options) {
      const i18n = createI18n(options)
      setGlobalI18n(i18n)
    }

    app.component('OlStyledZoomInControl', OlStyledZoomInControl)
    app.component('OlStyledZoomOutControl', OlStyledZoomOutControl)
    app.component('OlStyledControlBar', OlStyledControlBar)
    app.component('OlStyledFullScreenControl', OlStyledFullScreenControl)
    app.component('OlStyledMeasureLengthControl', OlStyledMeasureLengthControl)
    app.component('OlStyledMeasureAreaControl', OlStyledMeasureAreaControl)
    app.component('OlStyledClearControl', OlStyledClearControl)
    app.component('OlStyledSwipeControl', OlStyledSwipeControl)
    app.component('OlStyledBaseLayerSwitcher', OlStyledBaseLayerSwitcher)
    app.component('OlStyledPlotControl', OlStyledPlotControl)
    app.component('OlStyledExportMapControl', OlStyledExportMapControl)
    app.component('OlStyledHomeControl', OlStyledHomeControl)
  }
}
