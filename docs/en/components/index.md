# Components

The vue3-openlayers-styled-controls library provides a set of customizable map controls that can enhance your OpenLayers maps with beautiful, responsive UI components.

## Available Controls

| Component | Description |
|-----------|-------------|
| [ol-styled-control-bar](./control-bar.md) | Container component for organizing other controls |
| [ol-styled-home-control](./home-control) | Home |
| [ol-styled-zoom-in-control](./zoom-controls) | Zoom in |
| [ol-styled-zoom-out-control](./zoom-controls) | zoom out |
| [ol-styled-full-screen-control](./fullscreen-control) | Toggle full screen mode |
| [ol-styled-measure-length-control](./measure-controls) | Measure distances |
| [ol-styled-measure-area-control](./measure-controls) | Measure areas |
| [ol-styled-plot-control](./plot-control) | Plot |
| [ol-styled-export-map-control](./export-control) | Export |
| [ol-styled-clear-control](./clear-control) | Clear drawings and measurements from the map |
| [ol-styled-swipe-control](./swipe-control) | Enable layer swiping functionality |
| [ol-styled-base-layer-switcher](./base-layer-switcher) | Switch between different base map layers |

## Usage

All components can be used in two ways:

### 1. Plugin Registration (Recommended)

When you install the plugin, all components are automatically registered globally:

```js
import { createApp } from 'vue'
import App from './App.vue'
import OpenLayersControls from 'vue3-openlayers-styled-controls'

const app = createApp(App)
app.use(OpenLayersControls)
app.mount('#app')
```

Then use the components with the `ol-styled-` prefix:

```vue
<template>
  <ol-styled-control-bar>
    <ol-styled-zoom-in-control />
    <ol-styled-zoom-out-control />
    <ol-styled-full-screen-control />
  </ol-styled-control-bar>
</template>
```

### 2. Individual Import

You can also import components individually to reduce bundle size:

```vue
<template>
  <ControlBar>
    <ZoomInControl />
    <ZoomOutControl />
    <FullScreenControl />
  </ControlBar>
</template>

<script setup>
import { 
  ControlBar, 
  ZoomInControl, 
  ZoomOutControl, 
  FullScreenControl 
} from 'vue3-openlayers-styled-controls'
</script>
```

## Common Props

Most controls share some common props:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `map` | `Map` | `undefined` | OpenLayers Map instance (usually injected automatically) |
| `className` | `string` | `''` | Additional CSS class names |
| `disabled` | `boolean` | `false` | Disable the control |

## Styling

All controls support theming through SCSS variables. See the [theming guide](../guide/theming.md) for more information on customizing the appearance.
