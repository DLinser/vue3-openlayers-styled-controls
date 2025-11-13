# 快速开始

本指南将帮助您在项目中快速集成 Vue3 OpenLayers Styled Controls。

## 安装依赖

### 依赖要求

本组件库依赖以下库，请确保在项目中已安装：

- `vue` (^3.0.0)
- `ol` (^10.7.0)
- `ol-ext` (^4.0.0)
- `ol-contextmenu` (^3.1.0)
- `vue3-openlayers` (^11.6.2)

这些依赖需要作为 peerDependencies 安装在您的项目中。

### 安装命令

::: code-group
```bash [npm]
npm i ol ol-ext ol-contextmenu vue3-openlayers     # install the peerDependencies
npm i vue3-openlayers-styled-controls              # install the library
```
:::

## 基本使用

### 1. 导入组件

#### 完整引入
::: code-group
```ts [main.ts]
import { createApp } from "vue";
import App from "./App.vue";

import OpenLayersMap from "vue3-openlayers";
import "vue3-openlayers/styles.css";

import OpenLayersStyledControls from 'vue3-openlayers-styled-controls'
import 'vue3-openlayers-styled-controls/styles.css'

const app = createApp(App);

app.use(OpenLayersMap /*, options */);
app.use(OpenLayersStyledControls)

app.mount("#app");
```
:::

#### 按需导入

```vue [AppComponent.vue]
<script setup>

</script>
<template>
  <ol-map class="map-container">
    <ol-view
      ref="view"
      :center="[120, 40]"
      :zoom="8"
      projection="EPSG:4326"
    />
    <ol-styled-control-bar>
      <ol-styled-zoom-in-control />
      <ol-styled-zoom-out-control />
      <ol-styled-measure-length-control />
      <ol-styled-measure-area-control />
      <ol-styled-clear-control />
    </ol-styled-control-bar>
  </ol-map>
</template>
<script lang="ts" setup>
// 导入控件组件
import {
  OlStyledControlBar,
  OlStyledZoomInControl,
  OlStyledZoomOutControl,
  OlStyledMeasureLengthControl,
  OlStyledMeasureAreaControl,
  OlStyledClearControl
} from 'vue3-openlayers-styled-controls'
</script>
```