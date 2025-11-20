# Components

The vue3-openlayers-styled-controls library provides a set of customizable map controls that can enhance your OpenLayers maps with beautiful, responsive UI components.

## Available Controls

| Component | Description |
|-----------|-------------|
| [Control Bar](./control-bar.md) | Container component for organizing other controls |
| [Zoom Controls](./zoom-controls.md) | Zoom in and zoom out buttons |
| [Full Screen Control](./fullscreen-control.md) | Toggle full screen mode |
| [Measure Controls](./measure-controls.md) | Measure distances and areas on the map |
| [Clear Control](./clear-control.md) | Clear drawings and measurements from the map |
| [Swipe Control](./swipe-control.md) | Enable layer swiping functionality |
| [Base Layer Switcher](./base-layer-switcher.md) | Switch between different base map layers |
| [Plot Control](./plot-control.md) | Draw various shapes on the map |

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
