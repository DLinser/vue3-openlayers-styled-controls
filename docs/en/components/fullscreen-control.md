# Full Screen Control

The Full Screen Control allows users to toggle the map between normal and full screen mode.

## Usage

```vue
<template>
  <ol-styled-full-screen-control />
</template>
```

## Events

| Event | Payload | Description |
|-------|---------|-------------|
| click | `Event` | event of click |
| `fullscreen-change` | `Boolen` | Emitted when entering or exiting full screen mode |

## Examples

### Basic Usage

```vue
<template>
  <ol-map>
    <ol-styled-control-bar>
      <ol-styled-full-screen-control />
    </ol-styled-control-bar>
  </ol-map>
</template>
```

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
