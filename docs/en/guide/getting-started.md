# Getting Started

This guide will help you get started with vue3-openlayers-styled-controls in your project.

## Prerequisites

This library depends on the following peer dependencies:

- `vue` (^3.0.0)
- `ol` (^10.7.0)
- `ol-ext` (^4.0.0)
- `ol-contextmenu` (^3.1.0)
- `vue3-openlayers` (^11.6.2)

Make sure these dependencies are installed in your project.

## Installation

::: code-group
```bash [npm]
npm i ol ol-ext ol-contextmenu vue3-openlayers     # install the peerDependencies
npm i vue3-openlayers-styled-controls              # install the library
```
:::

## Basic Usage

::: code-group
```ts [main.ts]
import { createApp } from "vue";
import App from "./App.vue";

import OpenLayersMap from "vue3-openlayers";
import "vue3-openlayers/styles.css";

import OpenLayersStyledControls from 'vue3-openlayers-styled-controls'
import 'vue3-openlayers-styled-controls/styles.css'

const app = createApp(App);

app.use(OpenLayersMap /*, options */);
app.use(OpenLayersStyledControls /*, options */)

app.mount("#app");
```

```vue [test.vue]
<template>
  <ol-map>
    <!-- Your map configuration -->
    <ol-styled-control-bar>
      <ol-styled-zoom-in-control />
      <ol-styled-zoom-out-control />
      <ol-styled-full-screen-control />
    </ol-styled-control-bar>
  </ol-map>
</template>

<script setup>
// Components are automatically registered when installing the plugin
</script>
```
:::

## Individual Component Import

If you prefer to import components individually to reduce bundle size:

```vue
<template>
  <ol-map>
    <ol-styled-control-bar>
      <ZoomInControl />
      <ZoomOutControl />
      <FullScreenControl />
    </ol-styled-control-bar>
  </ol-map>
</template>

<script setup>
import { ZoomInControl, ZoomOutControl, FullScreenControl } from 'vue3-openlayers-styled-controls'
</script>
```

## Next Steps

- Learn about [theming](./theming.md) to customize the appearance
- Check out the [components](/en/components/) documentation
- See how to use [internationalization](./i18n.md)