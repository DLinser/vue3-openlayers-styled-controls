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

## 事件

| 事件名 | 说明 | 参数 |
| --- | --- | --- |
| click | 控件被点击时触发 | (event: MouseEvent) |
| plot-active-change | 标绘状态改变时触发 | (active: boolean) |
| plot-start | 开始绘制时触发 | { type: string, event: DrawEvent } |
| plot-end | 结束绘制时触发 | { type: string, event: DrawEvent } |

## 自定义样式

可以通过 CSS 变量来自定义组件样式：

```css
:root {
  --styled-control-plot-panel-bg-color: rgba(255, 255, 255, 0.8);
}
```

## 国际化

组件支持中英文国际化，默认使用中文。可以通过全局配置修改语言：

```ts
import { createApp } from 'vue'
import App from './App.vue'
import OpenLayersControls, { createI18n } from 'vue3-openlayers-styled-controls'

const app = createApp(App)

// 创建英文国际化实例
const i18n = createI18n({
  locale: 'en',
  messages: {
    en: {
      plotControl: {
        title: 'Plot',
        point: 'Point',
        lineString: 'Line',
        polygon: 'Polygon',
        circle: 'Circle'
      }
    }
  }
})

app.use(OpenLayersControls, { i18n })
app.mount('#app')
```