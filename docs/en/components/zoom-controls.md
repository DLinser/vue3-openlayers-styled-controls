# Zoom Controls

Zoom Controls provide buttons for zooming in and out on the map. They can be used individually or as a group.

## Usage

```vue
<template>
  <ol-styled-control-bar>
    <ol-styled-zoom-in-control @zoomIn="zoomInHandler" />
    <ol-styled-zoom-out-control @zoomOut="zoomOutHandler" />
  </ol-styled-control-bar>
</template>
```

## Events

| Event | Payload | Description |
|-------|---------|-------------|
| click | `Event` | 点击事件 |
| `zoom-in` | `undefined` | Emitted when zooming in |
| `zoom-out` | `undefined` | Emitted when zooming out |

## Examples

### Basic Usage

```vue
<template>
  <ol-map>
    <ol-styled-control-bar>
      <ol-styled-zoom-in-control />
      <ol-styled-zoom-out-control />
    </ol-styled-control-bar>
  </ol-map>
</template>
```