# Measure Controls

Measure Controls provide tools for measuring distances and areas on the map. The library includes both length and area measurement controls.

## Usage

### Measure Length

```vue
<template>
  <ol-styled-measure-length-control />
</template>
```

### Measure Area

```vue
<template>
  <ol-styled-measure-area-control />
</template>
```

## Events

| Event | Payload | Description |
|-------|---------|-------------|
| click | Event | event of click |
| measure-start | DrawEvent | Emitted when measurement starts |
| measure-end | DrawEvent | Emitted when measurement ends |
| geometry-change | any | Emitted when geometry changed |


## Examples

### Basic Usage

```vue
<template>
  <ol-map>
    <ol-styled-control-bar>
      <ol-styled-measure-length-control />
      <ol-styled-measure-area-control />
      <ol-styled-clear-control />
    </ol-styled-control-bar>
  </ol-map>
</template>
```

## Slot

You can customize the control icon via the default slot:

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
      measureLength: { title: 'Measure distance' },
      measureArea: { title: 'Measure area' }
    }
  }
})

app.mount('#app')
```
