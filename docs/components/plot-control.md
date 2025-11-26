# 标绘组件 (OlStyledPlotControl)

标绘组件提供了一个交互式工具，允许用户在地图上绘制各种几何图形，包括点、线、面和圆形。

## 基本用法

```vue
<template>
  <ol-map>
    <ol-view />
    <ol-tile-layer>
      <ol-source-osm />
    </ol-tile-layer>
    
    <ol-styled-control-bar>
      <ol-styled-plot-control />
    </ol-styled-control-bar>
  </ol-map>
</template>
```

## 功能特性

- 支持多种几何类型绘制：点、线、面、圆
- 响应式设计，适配不同屏幕尺寸
- 国际化支持（中英文）
- 可定制的样式和主题
- 与 Vue 3 和 OpenLayers 完美集成

## 使用说明

1. 点击标绘控件按钮打开类型选择面板
2. 选择要绘制的几何类型
3. 在地图上点击开始绘制
4. 根据类型不同，可能需要点击多个点来完成绘制
5. 双击或按 ESC 键结束绘制


## 属性 (Props)

| 属性名 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| plotThemeColor | `string` | `#ffcc33` | 标绘主题色 |
| clearOnClose | `boolen` | false | 是否在关闭组件的时候清空图层 |

## 事件

| 事件名 | 说明 | 参数 |
| --- | --- | --- |
| click | 控件被点击时触发 | (event: MouseEvent) |
| plot-active-change | 标绘状态改变时触发 | (active: boolean) |
| plot-start | 开始绘制时触发 | `{ type: string, event: DrawEvent }` |
| plot-end | 结束绘制时触发 | `{ type: string, event: DrawEvent }` |

## 插槽（Slot）

可以通过默认插槽自定义控件图标：

```vue
<template>
  <ol-styled-plot-control>
    <template #default>
      <i class="custom-plot-icon"></i>
    </template>
  </ol-styled-plot-control>
</template>
```

## 国际化

标绘控件支持国际化，通过在安装插件时配置 `locale` 和 `messages`：

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
      plotControl: { title: 'Plot' }
    }
  }
})

app.mount('#app')
```
