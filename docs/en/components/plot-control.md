# Plot Control (OlStyledPlotControl)

The plot control provides an interactive tool that allows users to draw various geometries on the map, including points, lines, polygons and circles.

## Basic Usage

```vue
<template>
  <ol-map>
    <ol-view />
    <ol-tile-layer>
      <ol-source-osm />
    </ol-tile-layer>
    
    <ol-styled-control-bar>
      <ol-styled-plot-control />
    </ol-styled-control-bar>
  </ol-map>
</template>
```

## Features

- Supports multiple geometry types: Point, LineString, Polygon, Circle
- Responsive design, adapts to different screen sizes
- Internationalization support (Chinese / English)
- Customizable styles and themes
- Built for Vue 3 and OpenLayers

## How to Use

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

## Events

| Event | Description | Payload |
| --- | --- | --- |
| click | Emitted when the control is clicked | (event: MouseEvent) |
| plot-active-change | Emitted when the plot active state changes | (active: boolean) |
| plot-start | Emitted when drawing starts | `{ type: string, event: DrawEvent }` |
| plot-end | Emitted when drawing ends | `{ type: string, event: DrawEvent }` |
