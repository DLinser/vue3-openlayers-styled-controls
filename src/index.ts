// 组件库入口文件
import type { App } from 'vue'

// 导入组件
import OlStyledZoomInControl from './components/OlStyledZoomInControl.vue'
import OlStyledZoomOutControl from './components/OlStyledZoomOutControl.vue'
import OlStyledControlBar from './components/OlStyledControlBar.vue'

// 导出组件
export { OlStyledZoomInControl, OlStyledZoomOutControl, OlStyledControlBar }
// 导出默认安装函数
export default {
  install(app: App) {
    app.component('OlStyledZoomInControl', OlStyledZoomInControl)
    app.component('OlStyledZoomOutControl', OlStyledZoomOutControl)
    app.component('OlStyledControlBar', OlStyledControlBar)
  }
}
