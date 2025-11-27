# Plot Control (OlStyledPlotControl)

The plot control provides an interactive tool that allows users to draw various geometries on the map, including points, lines, polygons and circles.

## Usage

<script setup>
import PlotControl from "@demos/views/PlotControl.vue"
</script>

<ClientOnly>
  <PlotControl style="width: 100%; height: 320px; position: relative" />
</ClientOnly>

::: code-group
<<< ../../../src/demos/views/PlotControl.vue
:::

## OlStyledPlotControl

### Features

- Supports multiple geometry types: Point, LineString, Polygon, Circle
- Responsive design, adapts to different screen sizes
- Internationalization support (Chinese / English)
- Customizable styles and themes
- Built for Vue 3 and OpenLayers

### How to Use

1. Click the plot control button to open the geometry type panel.
2. Choose the geometry type you want to draw.
3. Click on the map to start drawing.
4. Depending on the type, click multiple points to complete the drawing.
5. Double-click or press ESC to finish drawing.

### Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| plotThemeColor | `string` | `#ffcc33` | Theme color used by the plot control |
| clearOnClose | `boolean` | `false` | Whether to clear the drawing layer when the control is closed |

### Events

| Event | Description | Payload |
| --- | --- | --- |
| click | Emitted when the control is clicked | (event: MouseEvent) |
| plot-active-change | Emitted when the plot active state changes | (active: boolean) |
| plot-start | Emitted when drawing starts | `{ type: string, event: DrawEvent }` |
| plot-end | Emitted when drawing ends | `{ type: string, event: DrawEvent }` |

## OlStyledTextLabelControl

### Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| font | `string` | 'sans-serif' | Text font |
| fontSize | `number` | 12 | Text font size |
| fillColor | `string` | `#2f4b59` | Text fill color |
| strokeColor | `string` | `#ffffff` | Text stroke color |
| strokeWidth | `number` | 2 | Text stroke width |
| offsetX | `number` | 0 | Text horizontal offset |
| offsetY | `number` | -12 | Text vertical offset |
| clearOnClose | `boolean` | `false` | Whether to clear the label layer when the control is closed |

### Events

| Event | Description | Payload |
| --- | --- | --- |
| click | Emitted when the control is clicked | (event: MouseEvent) |
| label-add | Emitted when a text label is added | `{ feature: Feature, text: string }` |

## Slot

You can customize the control icon via the default slot:

```vue
<template>
  <ol-styled-plot-control>
    <template #default>
      <i class="custom-plot-icon"></i>
    </template>
  </ol-styled-plot-control>
  <ol-styled-text-label-control>
    <template #default>
      <i class="custom-text-label-icon"></i>
    </template>
  </ol-styled-text-label-control>
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
      plotControl: { title: 'Plot' },
      textLabelControl: { title: 'Text Label' }
    }
  }
})

app.mount('#app')
```
