# Text Label Control (OlStyledTextLabelControl)

Adds text labels on the map: click the control to enter labeling mode, click a location on the map to open an inline input panel, enter the text and confirm to render it at the clicked position.

## Basic Usage

<ClientOnly>
  <ol-map style="width: 100%; height: 320px; position: relative">
    <ol-view :center="[0,0]" :zoom="2" />
    <ol-tile-layer><ol-source-osm /></ol-tile-layer>
    <ol-styled-control-bar>
      <ol-styled-text-label-control
        :fontSize="14"
        fillColor="#2f4b59"
        strokeColor="#ffffff"
        :strokeWidth="3"
        :offsetY="-14"
        @label-add="()=>{}"
      />
    </ol-styled-control-bar>
  </ol-map>
</ClientOnly>

```vue
<template>
  <ol-map class="map-container">
    <ol-view :center="[0,0]" :zoom="2" />
    <ol-tile-layer><ol-source-osm /></ol-tile-layer>

    <ol-styled-control-bar>
      <ol-styled-text-label-control
        :fontSize="14"
        fillColor="#2f4b59"
        strokeColor="#ffffff"
        :strokeWidth="3"
        :offsetY="-14"
        @label-add="onLabelAdded"
      />
    </ol-styled-control-bar>
  </ol-map>
</template>

<script setup lang="ts">
const onLabelAdded = ({ feature, text }: any) => {
  // Receive the new Feature and its text content here
}
</script>
```

## Slot

The component supports a default slot to customize the control icon:

```vue
<ol-styled-text-label-control>
  <template #default>
    <i class="custom-text-label-icon"></i>
  </template>
</ol-styled-text-label-control>
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
      textLabel: { title: 'Text label' }
    }
  }
})

app.mount('#app')
```

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `font` | `string` | `sans-serif` | Font family (combined with `fontSize` as `px font`) |
| `fontSize` | `number` | `12` | Font size in px |
| `fillColor` | `string` | `#2f4b59` | Text fill color |
| `strokeColor` | `string` | `#ffffff` | Text stroke color |
| `strokeWidth` | `number` | `2` | Text stroke width |
| `offsetX` | `number` | `0` | Horizontal text offset |
| `offsetY` | `number` | `-12` | Vertical text offset |
| `clearOnClose` | `boolean` | `true` | Whether to clear the entered text after closing the input panel |

> Note: The label content is not passed from outside; it is entered via the inline input panel after clicking the map.

## Events

| Name | Payload | Description |
| --- | --- | --- |
| `click` | `Event` | Fired when the control is clicked |
| `label-add` | `{ feature, text }` | Fired after confirming the input, returns the newly added Feature and its text |

## Methods (Expose)

| Method | Description |
| --- | --- |
| `handleClick` | Manually trigger the text labeling action |

## Interaction Flow

- Click the control button to enter labeling mode.
- Click on the map to choose a position; an input panel will appear aligned to the clicked coordinate.
- Enter the text and click "Confirm"; the text is rendered with `ol/style/Text` at that position. Click "Cancel" to discard.

## Theming

The input panel appearance follows the control theme variables and the `ol-styled-control-bar` theme by default. You can adjust background, borders, and text color in `var.scss` to fit your design.
