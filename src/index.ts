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

// 导出组件
export {
  OlStyledZoomInControl,
  OlStyledZoomOutControl,
  OlStyledControlBar,
  OlStyledFullScreenControl,
  OlStyledMeasureLengthControl,
  OlStyledMeasureAreaControl,
  OlStyledClearControl
}
// 导出默认安装函数
export default {
  install(app: App) {
    app.component('OlStyledZoomInControl', OlStyledZoomInControl)
    app.component('OlStyledZoomOutControl', OlStyledZoomOutControl)
    app.component('OlStyledControlBar', OlStyledControlBar)
    app.component('OlStyledFullScreenControl', OlStyledFullScreenControl)
    app.component('OlStyledMeasureLengthControl', OlStyledMeasureLengthControl)
    app.component('OlStyledMeasureAreaControl', OlStyledMeasureAreaControl)
    app.component('OlStyledClearControl', OlStyledClearControl)
  }
}
