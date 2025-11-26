# Clear Control

The Clear Control provides a button to clear drawings and measurements from the map.

## Events

| Event | Payload | Description |
|-------|---------|-------------|
| click | undefined | Emitted when clear action is triggered |


## Examples

### Basic Usage

```vue
<template>
  <ol-map>
    <ol-styled-control-bar>
      <ol-styled-measure-length-control />
      <ol-styled-clear-control />
    </ol-styled-control-bar>
  </ol-map>
</template>
```

## Slot

You can customize the control icon via the default slot:

```vue
<template>
  <ol-styled-clear-control>
    <template #default>
      <i class="custom-clear-icon"></i>
    </template>
  </ol-styled-clear-control>
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
      clear: { title: 'Clear' }
    }
  }
})

app.mount('#app')
```
