# 主题定制

Vue3 OpenLayers Styled Controls 支持多种主题和样式定制。

## 内置主题

控件栏支持以下内置主题：

- `default`: 默认主题
- `dark`: 深色主题
- `ocean`: 海洋主题
- `glassmorphism`: 玻璃拟态主题

使用方式：

```vue
<template>
  <ol-styled-control-bar theme="dark">
    <ol-styled-zoom-in-control />
    <ol-styled-zoom-out-control />
  </ol-styled-control-bar>
</template>
```

## 位置配置

控件栏支持以下位置配置：

- `top-left`: 左上角
- `top-right`: 右上角
- `bottom-left`: 左下角
- `bottom-right`: 右下角（默认）

使用方式：

```vue
<template>
  <ol-styled-control-bar position="top-right">
    <ol-styled-zoom-in-control />
    <ol-styled-zoom-out-control />
  </ol-styled-control-bar>
</template>
```

## SCSS 变量定制

您可以通过覆盖 SCSS 变量来自定义控件样式：

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

在您的项目中创建一个 SCSS 文件并导入：

```scss
// custom-theme.scss
@import 'vue3-openlayers-styled-controls/src/assets/style/var.scss';

:root {
  --styled-control-bar-bg-color: rgba(0, 0, 0, 0.8);
  --styled-control-text-color: #fff;
}
```

然后在您的主文件中导入：

```js
import './custom-theme.scss'
```