# 底图切换组件 (OlStyledBaseLayerSwitcher)

底图切换组件允许用户在多个底图图层之间进行切换。组件会自动检测地图中的瓦片图层，并为每个图层生成预览图。

## 使用 (Usage)

<script setup>
import BaseLayerSwitcher from "@demos/views/BaseLayerSwitcher.vue"
</script>

<ClientOnly>
  <BaseLayerSwitcher style="width: 100%; height: 320px; position: relative" />
</ClientOnly>

::: code-group
<<< ../../src/demos/views/BaseLayerSwitcher.vue
:::

## 属性 (Props)

| 属性名 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| layerGroup | LayerGroup | undefined | 指定要切换的图层组，如果不指定则自动使用地图中的所有瓦片图层 |
| previewCenter | [number, number] | undefined | 预览图的中心点坐标，如果不指定则自动计算 |
| previewResolution | number | undefined | 预览图的分辨率，如果不指定则自动计算 |

## 事件 (Events)

| 事件名 | 参数 | 说明 |
| --- | --- | --- |
| click | MouseEvent | 控件被点击时触发 |
| base-layer-switcher-active-change | boolean | 底图切换控件激活状态改变时触发 |
| layer-switched | string | 底图切换完成时触发，参数为切换到的图层名称 |

## 插槽（Slot）

底图切换组件支持默认插槽，可用于自定义控件图标：

```vue
<ol-styled-base-layer-switcher>
  <template #default>
    <i class="custom-base-layer-icon"></i>
  </template>
</ol-styled-base-layer-switcher>
```

## 国际化

底图切换控件支持国际化，通过在安装插件时配置 `locale` 和 `messages`：

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
      baseLayerSwitcher: { title: 'Base layer switcher' }
    }
  }
})

app.mount('#app')
```

## 使用示例

### 指定图层组

```vue
<template>
  <ol-map>
    <ol-view
      ref="view"
      :center="[120, 40]"
      :zoom="8"
      :projection="'EPSG:4326'"
    />

    <!-- 图层组 -->
    <ol-layer-group ref="baseLayerGroup">
      <ol-tile-layer title="OSM">
        <ol-source-osm />
      </ol-tile-layer>
      <ol-tile-layer title="天地图影像">
        <ol-source-tianditu
          layerType="img"
          projection="EPSG:4326"
          tk="your-token"
        />
      </ol-tile-layer>
    </ol-layer-group>

    <!-- 底图切换控件 -->
    <ol-styled-control-bar>
      <ol-styled-base-layer-switcher :layer-group="baseLayerGroup?.layerGroup" />
    </ol-styled-control-bar>
  </ol-map>
</template>

<script setup>
import { ref } from 'vue'

const baseLayerGroup = ref(null)
</script>
```

### 自定义预览参数

```vue
<ol-styled-base-layer-switcher
  :preview-center="[120, 30]"
  :preview-resolution="0.01"
/>
```

## 预览图生成机制

底图切换组件会自动为每个图层生成预览图：

1. 首先检查图层是否有预设的预览图（通过 `preview` 属性设置）
2. 如果没有预设预览图，则尝试调用图层的 `getPreview` 方法
3. 如果图层源有 `getPreview` 方法，则调用该方法获取预览图
4. 如果以上方法都失败，则返回 null

## 注意事项

1. 底图切换组件需要配合 `ol-styled-control-bar` 使用
2. 组件会自动过滤出地图中的瓦片图层作为底图候选
3. 底图切换控件在同一时间只能有一个实例处于激活状态

## 主题定制

底图切换控件支持主题定制，可以通过 CSS 变量修改样式：

```scss
:root {
  --styled-control-base-layer-switch-bg-color: rgba(255, 255, 255, 0.8);
  --styled-control-item-border-color: #d9d9d9;
  --styled-control-item-hover-bg-color: #f5f5f5;
  --styled-control-item-active-bg-color: #e6f7ff;
}
```
