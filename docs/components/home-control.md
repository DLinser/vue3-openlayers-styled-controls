# Home 控件（OlStyledHomeControl）

`OlStyledHomeControl` 是一个用于 OpenLayers 地图的“回到首页”控件，点击后可将地图视图重置到初始范围或指定范围。

## 功能简介
- 记录地图首次渲染时的视图范围（extent），点击按钮可回到该范围。
- 支持通过 `extent` 属性自定义回到的范围。
- 支持自定义按钮图标、提示文本。
- 适配多主题样式。

## 使用 (Usage)

<script setup>
import HomeControl from "@demos/views/HomeControl.vue"
</script>

<ClientOnly>
  <HomeControl style="width: 100%; height: 320px; position: relative" />
</ClientOnly>

::: code-group
<<< ../../src/demos/views/HomeControl.vue
:::


## 属性 (Props)
| 属性名    | 类型        | 默认值    | 说明                         |
|-----------|-------------|-----------|------------------------------|
| extent    | [number, number, number, number] \| undefined | -         | 指定回到的范围（OpenLayers extent 格式），不传则为初始范围 |
| duration| number      | 800 | 地图 fit 动画参数           |

## 事件 (Events)
| 事件名    | 说明                         |
|-----------|------------------------------|
| click     | 点击按钮时触发                |
| go-home   | 地图视图回到初始位置时触发        |

## 方法（Expose）
| 方法名    | 说明                         |
|-----------|------------------------------|
| goHome    | 手动触发回到初始位置              |


## 插槽（Slot）

可以通过默认插槽自定义控件图标：

```vue
<ol-styled-home-control>
  <template #default>
    <i class="custom-home-icon"></i>
  </template>
</ol-styled-home-control>
```

## 注意事项
- 控件会在地图首次渲染后自动记录初始范围。
- 若地图初始化时未设置 view/extent，控件会在首次点击时动态计算当前范围。
- 需确保控件作为地图子组件或能正确注入 map 实例。

## 国际化（i18n）

卷帘控件支持国际化，通过在安装插件时配置 `locale` 和 `messages`：

```js
// main.js
import { createApp } from 'vue'
import App from './App.vue'
import OpenLayersControls from 'vue3-openlayers-styled-controls'

const app = createApp(App)

app.use(OpenLayersControls, {
  locale: 'en',
  messages: {
    en: {
      home: { title: 'Home' }
    }
  }
})

app.mount('#app')
```

