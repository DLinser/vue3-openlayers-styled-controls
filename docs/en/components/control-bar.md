# Control Bar

The Control Bar is a container component that organizes other controls in a group. It provides a consistent layout and positioning for map controls.

## Usage

```vue
<template>
  <ol-styled-control-bar>
    <ol-styled-zoom-in-control />
    <ol-styled-zoom-out-control />
    <ol-styled-full-screen-control />
  </ol-styled-control-bar>
</template>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| position | `top-left` \| `top-right` \| `bottom-left` \| `bottom-right` | `bottom-right` | Position of the control bar. |
| theme | `default` \| `dark` \| `ocean` \| `glassmorphism` | `default` | theme |

## Examples

### Basic Usage

```vue
<template>
  <ol-map>
    <ol-styled-control-bar  theme="ocean">
      <ol-styled-zoom-controls />
      <ol-styled-full-screen-control />
    </ol-styled-control-bar>
  </ol-map>
</template>
```

### Custom Position

```vue
<template>
  <ol-map>
    <ol-styled-control-bar position="bottom-left">
      <ol-styled-zoom-controls />
      <ol-styled-full-screen-control />
    </ol-styled-control-bar>
  </ol-map>
</template>
```