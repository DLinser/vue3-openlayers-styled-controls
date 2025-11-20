
# Theming

Vue3 OpenLayers Styled Controls supports multiple built-in themes and flexible style customization.

## Built-in Themes

The control bar supports the following built-in themes:

- `default`: Default theme
- `dark`: Dark theme
- `ocean`: Ocean theme
- `glassmorphism`: Glassmorphism theme

Usage:

```vue
<template>
  <ol-styled-control-bar theme="dark">
    <ol-styled-zoom-in-control />
    <ol-styled-zoom-out-control />
  </ol-styled-control-bar>
</template>
```

## Position Configuration

The control bar supports the following positions:

- `top-left`: Top left
- `top-right`: Top right
- `bottom-left`: Bottom left
- `bottom-right`: Bottom right (default)

Usage:

```vue
<template>
  <ol-styled-control-bar position="top-right">
    <ol-styled-zoom-in-control />
    <ol-styled-zoom-out-control />
  </ol-styled-control-bar>
</template>
```


## SCSS Variable Customization

You can override SCSS variables to customize the control styles:

```scss
:root {
  --styled-control-bar-bg-color: rgba(255, 255, 255, 0.8);
  --styled-control-text-color: #333;
  --styled-control-bar-box-shadow: 0px 2px 4px 0px rgba(148, 149, 151, 0.5);
  --styled-control-item-bg-color: transparent;
  --styled-control-item-border-color: transparent;
  --styled-control-item-hover-bg-color: #f5f5f5;
  --styled-control-item-hover-box-shadow: 0px 2px 4px 0px rgba(148, 149, 151, 0.5);
  --styled-control-item-active-bg-color: #f5f5f5;
}
```

Create a SCSS file in your project and import it:

```scss
// custom-theme.scss
:root {
  --styled-control-bar-bg-color: rgba(0, 0, 0, 0.8);
  --styled-control-text-color: #fff;
}
```

Then import it in your main file:

```js
import './custom-theme.scss'
```