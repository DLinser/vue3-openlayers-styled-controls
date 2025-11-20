# 全屏控件 OlStyledFullScreenControl

全屏控件用于切换地图的全屏显示模式。

## 基本使用

```vue
<template>
  <ol-styled-full-screen-control />
</template>
```

## Events

| 事件名 | 参数 | 说明 |
| --- | --- | --- |
| click | `Event` | 点击事件 |
| fullscreen-change | - | 进入或退出全屏时触发 |

## 示例

### 基本用法

```vue
<template>
  <ol-styled-control-bar>
    <ol-styled-full-screen-control />
  </ol-styled-control-bar>
</template>
```