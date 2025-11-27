# 文字标注组件 (OlStyledTextLabelControl)

用于在地图上添加文本标注：点击控件进入标注模式，点击地图选择位置后弹出输入面板，输入文字并确认后将文字渲染到地图上。

## 使用 (Usage)

<ClientOnly>
  <ol-map style="width: 100%; height: 320px; position: relative">
    <ol-view :center="[0,0]" :zoom="2" />
    <ol-tile-layer><ol-source-osm /></ol-tile-layer>
    <ol-styled-control-bar>
      <ol-styled-text-label-control
        :fontSize="14"
        fillColor="#2f4b59"
        strokeColor="#ffffff"
        :strokeWidth="3"
        :offsetY="-14"
        @label-add="()=>{}"
      />
    </ol-styled-control-bar>
  </ol-map>
</ClientOnly>

```vue
<template>
  <ol-map class="map-container">
    <ol-view :center="[0,0]" :zoom="2" />
    <ol-tile-layer><ol-source-osm /></ol-tile-layer>

    <ol-styled-control-bar>
      <ol-styled-text-label-control
        :fontSize="14"
        fillColor="#2f4b59"
        strokeColor="#ffffff"
        :strokeWidth="3"
        :offsetY="-14"
        @label-add="onLabelAdded"
      />
    </ol-styled-control-bar>
  </ol-map>
</template>

<script setup lang="ts">
const onLabelAdded = ({ feature, text }: any) => {
  // 这里可以获取到新建的 Feature 和文本内容 text
}
</script>
```

## 插槽（Slot）

卷帘组件支持默认插槽，可用于自定义控件图标：

```vue
<ol-styled-text-label-control>
  <template #default>
    <i class="custom-text-label-icon"></i>
  </template>
</ol-styled-text-label-control>
```

## 国际化

文字标注控件支持国际化，通过在安装插件时配置 `locale` 和 `messages`：

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
      textLabel: { title: 'Text label' }
    }
  }
})

app.mount('#app')
```

## 属性 (Props)

| 属性名 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `font` | `string` | `sans-serif` | 文本字体族（与 `fontSize` 组合为 `px font`） |
| `fontSize` | `number` | `12` | 文本字号，单位 px |
| `fillColor` | `string` | `#2f4b59` | 文本填充颜色 |
| `strokeColor` | `string` | `#ffffff` | 文本描边颜色 |
| `strokeWidth` | `number` | `2` | 文本描边宽度 |
| `offsetX` | `number` | `0` | 文本 X 方向偏移 |
| `offsetY` | `number` | `-12` | 文本 Y 方向偏移 |
| `clearOnClose` | `boolean` | `true` | 关闭输入面板后是否清除已输入的文字 |

> 说明：文字内容不通过外部传入，而是在地图点击后，通过内置输入面板进行输入与确认。

## 事件 (Events)

| 事件名 | 参数 | 说明 |
| --- | --- | --- |
| `click` | `Event` | 控件点击事件 |
| `label-add` | `{ feature, text }` | 完成输入并确认后触发，返回新增的要素与文字内容 |

## 方法（Expose）
| 方法名    | 说明                         |
|-----------|------------------------------|
| handleClick    | 手动触发标绘文字事件              |

## 交互流程

- 点击控件按钮，进入文字标注模式。
- 在地图上点击选择位置，弹出输入面板（跟随点击坐标对齐显示）。
- 输入文字并点击“确定”，文字以 `ol/style/Text` 样式渲染到该位置；点击“取消”则不会添加标注。

## 主题样式

输入面板的外观与控件主题变量一致，默认跟随 `ol-styled-control-bar` 的主题，支持在 `var.scss` 中调整控件的背景、边框与文本颜色等。 
