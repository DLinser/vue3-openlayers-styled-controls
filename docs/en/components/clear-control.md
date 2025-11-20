# Clear Control

The Clear Control provides a button to clear drawings and measurements from the map.

## Events

| Event | Payload | Description |
|-------|---------|-------------|
| click | undefined | Emitted when clear action is triggered |


## Examples

### Basic Usage

```vue
<template>
  <ol-map>
    <ol-styled-control-bar>
      <ol-styled-measure-length-control />
      <ol-styled-clear-control />
    </ol-styled-control-bar>
  </ol-map>
</template>
```