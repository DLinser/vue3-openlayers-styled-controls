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


## Usage

<script setup>
import SwipeControl from "@demos/views/SwipeControl.vue"
</script>

<ClientOnly>
  <SwipeControl style="width: 100%; height: 320px; position: relative" />
</ClientOnly>

::: code-group
<<< ../../../src/demos/views/SwipeControl.vue
:::

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
