# 导出组件 (OlStyledExportMapControl)

用于导出地图（截图式），包括地图上的栅格、矢量等图层。

## 基本用法

```vue
<template>
  <ol-map>
    <ol-view />
    <ol-tile-layer>
      <ol-source-osm />
    </ol-tile-layer>
    
    <ol-styled-control-bar>
      <ol-styled-export-map-control />
    </ol-styled-control-bar>
  </ol-map>
</template>
```
## 属性 (Props)

| 属性名 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| fileName | String | map | 导出的图片名称 |
| type | `jpeg/png` | png | 导出的图片格式 |
| quality | Number | 0.92 | 图片质量，范围在 0.0 到 1.0 之间 |
| background | String | - | 图片的背景颜色 |

## 事件 (Events)

| 事件名 | 说明 | 参数 |
| --- | --- | --- |
| click | 控件被点击时触发 | (event: MouseEvent) |
| export-start | 开始导出时触发 | - |
| export-end | 结束导出时触发 | dataURL |
| export-error | 导出错误时触发 | Error |

## 方法（Expose）

| 方法名 | 说明 | 参数 |
| --- | --- | --- |
| exportMap | 导出地图 | - |

```vue
<template>
  <ol-map>
    <ol-view />
    <ol-tile-layer>
      <ol-source-osm />
    </ol-tile-layer>
    
    <ol-styled-control-bar>
      <ol-styled-export-map-control :ref="controlRef" />
    </ol-styled-control-bar>
  </ol-map>
</template>
<script setup lang="ts">
import { ref, onMounted } from "vue";

const controlRef = ref<any>(null);

onMounted(() => {
  controlRef.value?.exportMap()
});
</script>
```

## 插槽（Slot）

可以通过默认插槽自定义控件图标：

```vue
<template>
  <ol-styled-export-map-control>
    <template #default>
      <i class="custom-export-icon"></i>
    </template>
  </ol-styled-export-map-control>
</template>
```

## 国际化

导出控件支持国际化，通过在安装插件时配置 `locale` 和 `messages`：

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
      exportMap: { title: 'Export map' }
    }
  }
})

app.mount('#app')
```