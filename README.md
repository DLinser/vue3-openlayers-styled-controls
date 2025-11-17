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
- `OlStyledSwipeControl`: 卷帘控件
- `OlStyledBaseLayerSwitcher`: 底图切换控件

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

## 国际化支持

组件库支持国际化，可以轻松适配不同语言环境。

### 默认语言

组件库默认提供以下语言支持：

- 简体中文 (zh-CN)
- 英文 (en)

### 配置默认语言

您可以在安装插件时配置默认语言：

```js
import { createApp } from 'vue'
import App from './App.vue'
import OpenLayersControls from 'vue3-openlayers-styled-controls'

const app = createApp(App)

// 配置默认语言为英文
app.use(OpenLayersControls, {
  locale: 'en'
})

app.mount('#app')
```

### 自定义语言资源

如果您需要自定义语言资源或添加更多语言：

```js
import { createApp } from 'vue'
import App from './App.vue'
import OpenLayersControls from 'vue3-openlayers-styled-controls'

const app = createApp(App)

// 配置自定义语言
app.use(OpenLayersControls, {
  locale: 'fr', // 设置默认语言为法语
  messages: {
    fr: {
      zoomIn: {
        title: 'Zoom avant'
      },
      zoomOut: {
        title: 'Zoom arrière'
      },
      fullScreen: {
        enter: 'Plein écran',
        exit: 'Quitter le plein écran'
      },
      measureLength: {
        title: 'Mesurer la distance',
        stop: 'Arrêter la mesure',
        startHelp: 'Cliquez pour commencer à dessiner',
        continueHelp: 'Cliquez pour continuer à dessiner la ligne'
      },
      measureArea: {
        title: 'Mesurer la surface',
        stop: 'Arrêter la mesure',
        startHelp: 'Cliquez pour commencer à dessiner',
        continueHelp: 'Cliquez pour continuer à dessiner le polygone',
        squareMeters: 'mètres carrés',
        squareKilometers: 'kilomètres carrés'
      },
      clear: {
        title: 'Effacer'
      },
      swipe: {
        title: 'Balayage'
      },
      baseLayerSwitcher: {
        title: 'Changer de fond de carte',
        noPreview: 'Pas d\'aperçu',
        unnamedLayer: 'Couche sans nom'
      }
    }
  }
})

app.mount('#app')
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