# 测量控件

测量控件包括长度测量和面积测量控件，用于在地图上进行距离和面积测量。

## OlStyledMeasureLengthControl 长度测量控件

### 使用 (Usage)

```vue
<template>
  <ol-styled-measure-length-control />
</template>
```

## 事件 (Events)

| 事件名 | 参数 | 说明 |
| --- | --- | --- |
| click | `Event` | 点击事件 |
| measure-start | - | 开始测量时触发 |
| measure-end | `number` | 测量结束时触发，返回测量结果 |

## OlStyledMeasureAreaControl 面积测量控件

### 使用 (Usage)

```vue
<template>
  <ol-styled-measure-area-control />
</template>
```

## 事件 (Events)

| 事件名 | 参数 | 说明 |
| --- | --- | --- |
| click | Event | 点击事件 |
| measure-start | DrawEvent | 开始测量时触发 |
| measure-end | DrawEvent | 测量结束时触发，返回测量结果 |
| geometry-change | any | 测量结束时触发，返回测量结果 |

## 组合使用

测量控件通常与其他控件一起使用：

<script setup>
import MeasureControl from "@demos/views/MeasureControl.vue"
</script>

<ClientOnly>
  <MeasureControl style="width: 100%; height: 320px; position: relative" />
</ClientOnly>

::: code-group
<<< ../../src/demos/views/MeasureControl.vue
:::

## 插槽（Slot）

可以通过默认插槽为测量控件自定义图标：

```vue
<template>
  <ol-styled-measure-length-control>
    <template #default>
      <i class="custom-measure-length-icon"></i>
    </template>
  </ol-styled-measure-length-control>
  
  <ol-styled-measure-area-control>
    <template #default>
      <i class="custom-measure-area-icon"></i>
    </template>
  </ol-styled-measure-area-control>
</template>
```

## 国际化

测量控件支持国际化，通过在安装插件时配置 `locale` 和 `messages`：

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
      measureLength: { title: 'Measure distance' },
      measureArea: { title: 'Measure area' }
    }
  }
})

app.mount('#app')
```
