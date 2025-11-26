# Swipe Control

The Swipe Control enables layer swiping functionality, allowing users to compare two map layers side by side.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| leftLayers | Layer[] | [] | leftLayers |
| rightLayers | Layer[] | [] | rightLayers |
| position | number | 0.5 | position of splite line |
| orientation | 'horizontal' \| 'vertical' | 'vertical' | orientation |

## Events

| Event | Payload | Description |
|-------|---------|-------------|
| click | MouseEvent | Emitted when swipe mode is clicked |
| swipe-active-change | boolean | Emitted when swipe mode is active |


## Examples

```vue
<template>
  <ol-map>
    <ol-view
      ref="view"
      :center="[120, 40]"
      :zoom="8"
      :projection="'EPSG:4326'"
    />

    <!-- 底图图层 -->
    <ol-tile-layer title="OSM">
      <ol-source-osm />
    </ol-tile-layer>

    <!-- 对比图层 -->
    <ol-tile-layer ref="compareLayer" title="天地图影像">
      <ol-source-tianditu
        layerType="img"
        projection="EPSG:4326"
        tk="your-token"
      />
    </ol-tile-layer>

    <!-- 卷帘控件 -->
    <ol-styled-control-bar>
      <ol-styled-swipe-control
        :left-layers="[compareLayer?.tileLayer]"
        :right-layers="[baseLayer?.tileLayer]"
      />
    </ol-styled-control-bar>
  </ol-map>
</template>

<script setup>
import { ref } from 'vue'

const compareLayer = ref(null)
const baseLayer = ref(null)
</script>
```

## Slot

You can customize the control icon via the default slot:

```vue
<template>
  <ol-styled-swipe-control>
    <template #default>
      <i class="custom-swipe-icon"></i>
    </template>
  </ol-styled-swipe-control>
</template>
```

## Internationalization

Configure `locale` and `messages` when installing the plugin to localize texts:

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
      swipe: { title: 'Swipe' }
    }
  }
})

app.mount('#app')
```
