# Zoom Controls

Zoom Controls provide buttons for zooming in and out on the map. They can be used individually or as a group.

## Usage

```vue
<template>
  <ol-styled-control-bar>
    <ol-styled-zoom-in-control @zoomIn="zoomInHandler" />
    <ol-styled-zoom-out-control @zoomOut="zoomOutHandler" />
  </ol-styled-control-bar>
</template>
```

## Events

| Event | Payload | Description |
|-------|---------|-------------|
| click | `Event` | 点击事件 |
| `zoom-in` | `undefined` | Emitted when zooming in |
| `zoom-out` | `undefined` | Emitted when zooming out |

## Examples

<ClientOnly>
  <ol-map style="width: 100%; height: 320px; position: relative">
    <ol-view :center="[0, 0]" :zoom="2" />
    <ol-tile-layer>
      <ol-source-osm />
    </ol-tile-layer>
    <ol-styled-control-bar>
      <ol-styled-zoom-in-control />
      <ol-styled-zoom-out-control />
    </ol-styled-control-bar>
  </ol-map>
</ClientOnly>

::: code-group
<!-- <<< ../../../src/demos/views/ZoomControl.vue -->
```vue [demo.vue]
<template>
  <ol-map style="width: 100%; height: 320px; position: relative">
    <ol-view :center="[0, 0]" :zoom="2" />
    <ol-tile-layer>
      <ol-source-osm />
    </ol-tile-layer>
    <ol-styled-control-bar>
      <ol-styled-zoom-in-control />
      <ol-styled-zoom-out-control />
    </ol-styled-control-bar>
  </ol-map>
</template>
```
:::


## Custom Icon

You can customize the icon through the slot

```vue
<template>
  <ol-styled-zoom-in-control>
    <PlusIcon />
  </ol-styled-zoom-in-control>
  
  <ol-styled-zoom-out-control>
    <MinusIcon />
  </ol-styled-zoom-out-control>
</template>
```

## i18n

The zoom control supports internationalization, and the display language can be set by configuring the ` locality ` and ` messages ` parameters when configuring the plugin

::: code-group 
```js [main.js]
import { createApp } from 'vue'
import App from './App.vue'
import OpenLayersControls from 'vue3-openlayers-styled-controls'

const app = createApp(App)

// Set the default language to English
app.use(OpenLayersControls, {
  locale: 'en'
})

app.mount('#app')
```
:::

You can also customize language resources

::: code-group 
```js [main.js]
import { createApp } from 'vue'
import App from './App.vue'
import OpenLayersControls from 'vue3-openlayers-styled-controls'

const app = createApp(App)

app.use(OpenLayersControls, {
  locale: 'fr', // Set the default language to French
  messages: {
    fr: {
      zoomIn: {
        title: 'Zoom avant'
      },
      zoomOut: {
        title: 'Zoom arrière'
      }
    }
  }
})

app.mount('#app')
```
:::

