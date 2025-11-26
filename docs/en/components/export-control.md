# Export Control (OlStyledExportMapControl)

The Export Control provides a screenshot-style export of the map, including raster and vector layers.

## Basic Usage

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


## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| fileName | String | map | Name of the exported image |
| type | `jpeg/png` | png | Image format for export |
| quality | Number | 0.92 | Image quality (range 0.0 - 1.0) |
| background | String | - | Background color for the exported image |

## Events

| Event | Description | Payload |
| --- | --- | --- |
| click | Emitted when the control is clicked | (event: MouseEvent) |
| export-start | Emitted when export starts | - |
| export-end | Emitted when export finishes | dataURL |
| export-error | Emitted when an error occurs during export | Error |

## Methods

| Method | Description | Params |
| --- | --- | --- |
| exportMap | Export the map as an image | - |

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
## Slot

You can customize the control icon via the default slot:

```vue
<template>
  <ol-styled-export-map-control>
    <template #default>
      <i class="custom-export-icon"></i>
    </template>
  </ol-styled-export-map-control>
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
      exportMap: { title: 'Export map' }
    }
  }
})

app.mount('#app')
```