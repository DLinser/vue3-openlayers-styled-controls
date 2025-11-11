# Vue3 OpenLayers Styled Controls

一套基于 Vue 3 和 OpenLayers 的可定制样式地图控件库。

## 简介

Vue3 OpenLayers Styled Controls 是一个专注于为 Web 地图应用提供美观、响应式控制条和缩放按钮的组件库。它解决了原生 OpenLayers 控件样式单一、难以与现代 UI 框架集成的问题。

## 特性

- 🎨 基于 Vue 3 Composition API 和 `<script setup>` 语法糖开发
- 🌍 支持国际化（i18n）
- 🎨 可定制样式，支持 SCSS 主题变量
- 📦 轻量级，专注于核心功能
- 🛠️ 完整的 TypeScript 类型支持
- 📱 响应式设计，适配移动端

## 支持的控件

- `OlStyledControlBar`: 控件容器
- `OlStyledZoomInControl`: 放大控件
- `OlStyledZoomOutControl`: 缩小控件
- `OlStyledFullScreenControl`: 全屏控件
- `OlStyledMeasureLengthControl`: 长度测量控件
- `OlStyledMeasureAreaControl`: 面积测量控件
- `OlStyledClearControl`: 清除控件
- `OlStyledSidebarControl`: 侧边栏控件

## 安装

```bash
npm install vue3-openlayers-styled-controls
```

## 基本使用

```vue
<template>
  <ol-map>
    <ol-view
      ref="view"
      :center="[120, 40]"
      :zoom="8"
      :projection="'EPSG:4326'"
    />

    <base-layer />
    
    <!-- 使用控件栏和缩放控件 -->
    <OlStyledControlBar>
      <OlStyledZoomInControl />
      <OlStyledZoomOutControl />
    </OlStyledControlBar>
  </ol-map>
</template>

<script setup>
import { ref } from 'vue'
import BaseLayer from './components/base-layer.vue'
// 导入控件组件
import {
  OlStyledControlBar,
  OlStyledZoomInControl,
  OlStyledZoomOutControl
} from 'vue3-openlayers-styled-controls'
</script>
```

## 文档

查看完整的文档请访问：[文档地址](./docs)

或者运行本地文档服务器：

```bash
npm run docs:dev
```

## 开发

### 搭建开发环境

```bash
# 克隆项目后进入目录
cd vue3-openlayers-styled-controls

# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 访问地址 http://localhost:5173
```

### 构建

```bash
# 构建生产版本（生成 dist/ 文件）
npm run build

# 预览生产构建效果
npm run preview

# 构建文档
npm run docs:build

# 预览文档
npm run docs:preview
```

## License

MIT