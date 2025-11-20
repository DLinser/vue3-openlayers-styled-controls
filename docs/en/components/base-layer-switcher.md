# Base Layer Switcher

The Base Layer Switcher allows users to switch between different base map layers.

## Usage

```vue
<template>
  <ol-styled-base-layer-switcher />
</template>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| layerGroup | LayerGroup | undefined | Specify the layer group to switch, if not specified, all tile layers in the map will be automatically used |
| previewCenter | [number, number] | undefined | The center point coordinates of the preview image will be automatically calculated if not specified |
| previewResolution | number | undefined | The resolution of the preview image will be automatically calculated if not specified |

## Events

| Event | Payload | Description |
|-------|---------|-------------|
| click | MouseEvent | 控件被点击时触发 |
| base-layer-switcher-active-change | boolean | Triggered when the control is actived |
| layer-switched | layerName | Emitted when the base layer is switched |

## Examples

### Basic Usage

```vue
<template>
  <ol-map>
    <ol-styled-base-layer-switcher />
  </ol-map>
</template>
```

### Custom Layers

```vue
<template>
  <ol-map>
    <ol-view
      ref="view"
      :center="[120, 40]"
      :zoom="8"
      :projection="'EPSG:4326'"
    />

    <!-- 图层组 -->
    <ol-layer-group ref="baseLayerGroup">
      <ol-tile-layer title="OSM">
        <ol-source-osm />
      </ol-tile-layer>
      <ol-tile-layer title="天地图影像">
        <ol-source-tianditu
          layerType="img"
          projection="EPSG:4326"
          tk="your-token"
        />
      </ol-tile-layer>
    </ol-layer-group>

    <!-- 底图切换控件 -->
    <ol-styled-control-bar>
      <ol-styled-base-layer-switcher :layer-group="baseLayerGroup?.layerGroup" />
    </ol-styled-control-bar>
  </ol-map>
</template>

<script setup>
import { ref } from 'vue'

const baseLayerGroup = ref(null)
</script>
```