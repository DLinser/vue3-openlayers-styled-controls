import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import '@/assets/style/demos.scss'
import OpenLayersMap from 'vue3-openlayers'
import 'vue3-openlayers/styles.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import OpenLayersControls from '.'

import router from '@/router'

import App from './demos/App.vue'

const app = createApp(App)
// 注册所有 Element Plus 图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(ElementPlus)
app.use(OpenLayersMap /*, options */)
app.use(OpenLayersControls, {
  locale: 'en'
})
app.use(router)
app.mount('#app')
