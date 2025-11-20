# Measure Controls

Measure Controls provide tools for measuring distances and areas on the map. The library includes both length and area measurement controls.

## Usage

### Measure Length

```vue
<template>
  <ol-styled-measure-length-control />
</template>
```

### Measure Area

```vue
<template>
  <ol-styled-measure-area-control />
</template>
```

## Events

| Event | Payload | Description |
|-------|---------|-------------|
| click | Event | event of click |
| measure-start | DrawEvent | Emitted when measurement starts |
| measure-end | DrawEvent | Emitted when measurement ends |
| geometry-change | any | Emitted when geometry changed |


## Examples

### Basic Usage

```vue
<template>
  <ol-map>
    <ol-styled-control-bar>
      <ol-styled-measure-length-control />
      <ol-styled-measure-area-control />
      <ol-styled-clear-control />
    </ol-styled-control-bar>
  </ol-map>
</template>
```