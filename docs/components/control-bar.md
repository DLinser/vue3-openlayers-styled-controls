# 控件栏 OlStyledControlBar

控件栏组件用于容器化和布局管理多个地图控件。

## 基本使用

```vue
<template>
  <ol-styled-control-bar>
    <ol-styled-zoom-in-control />
    <ol-styled-zoom-out-control />
  </ol-styled-control-bar>
</template>
```

## Props

| 属性名 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| position | `top-left` \| `top-right` \| `bottom-left` \| `bottom-right` | `bottom-right` | 控件栏位置 |
| theme | `default` \| `dark` \| `ocean` \| `glassmorphism` | `default` | 控件栏主题 |

## 示例

### 不同位置

```vue
<!-- 左上角 -->
<ol-styled-control-bar position="top-left">
  <ol-styled-zoom-in-control />
  <ol-styled-zoom-out-control />
</ol-styled-control-bar>

<!-- 右上角 -->
<ol-styled-control-bar position="top-right">
  <ol-styled-zoom-in-control />
  <ol-styled-zoom-out-control />
</ol-styled-control-bar>
```

### 不同主题

```vue
<!-- 深色主题 -->
<ol-styled-control-bar theme="dark">
  <ol-styled-zoom-in-control />
  <ol-styled-zoom-out-control />
</ol-styled-control-bar>

<!-- 海洋主题 -->
<ol-styled-control-bar theme="ocean">
  <ol-styled-zoom-in-control />
  <ol-styled-zoom-out-control />
</ol-styled-control-bar>
```