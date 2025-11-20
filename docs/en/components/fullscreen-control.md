# Full Screen Control

The Full Screen Control allows users to toggle the map between normal and full screen mode.

## Usage

```vue
<template>
  <ol-styled-full-screen-control />
</template>
```

## Events

| Event | Payload | Description |
|-------|---------|-------------|
| click | `Event` | event of click |
| `fullscreen-change` | `Boolen` | Emitted when entering or exiting full screen mode |

## Examples

### Basic Usage

```vue
<template>
  <ol-map>
    <ol-styled-control-bar>
      <ol-styled-full-screen-control />
    </ol-styled-control-bar>
  </ol-map>
</template>
```