# Full Screen Control

The Full Screen Control allows users to toggle the map between normal and full screen mode.

## Usage

<script setup>
import FullScreenControl from "@demos/views/FullScreenControl.vue"
</script>

<ClientOnly>
  <FullScreenControl style="width: 100%; height: 320px; position: relative" />
</ClientOnly>

::: code-group
<<< ../../../src/demos/views/FullScreenControl.vue
:::

## Events

| Event | Payload | Description |
|-------|---------|-------------|
| click | `Event` | event of click |
| `fullscreen-change` | `Boolen` | Emitted when entering or exiting full screen mode |

## Slot

You can customize the control icon via the default slot:

```vue
<template>
  <ol-styled-full-screen-control>
    <template #default>
      <i class="custom-fullscreen-icon"></i>
    </template>
  </ol-styled-full-screen-control>
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
      fullScreen: { enter: 'Full screen', exit: 'Exit full screen' }
    }
  }
})

app.mount('#app')
```
