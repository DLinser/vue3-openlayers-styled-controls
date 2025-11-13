# 缩放控件

缩放控件包括放大控件和缩小控件，用于控制地图的缩放级别。

## OlStyledZoomInControl 放大控件

### 基本使用

```vue
<template>
  <ol-styled-zoom-in-control />
</template>
```

### Events

| 事件名 | 参数 | 说明 |
| --- | --- | --- |
| click | `Event` | 点击事件 |
| zoom-in | `number` | 缩放事件，返回新的缩放级别 |

## OlStyledZoomOutControl 缩小控件

### 基本使用

```vue
<template>
  <ol-styled-zoom-out-control />
</template>
```

### Events

| 事件名 | 参数 | 说明 |
| --- | --- | --- |
| click | `Event` | 点击事件 |
| zoom-out | `number` | 缩放事件，返回新的缩放级别 |

## 组合使用

通常缩放控件会与控件栏一起使用：

```vue
<template>
  <ol-styled-control-bar>
    <ol-styled-zoom-in-control />
    <ol-styled-zoom-out-control />
  </ol-styled-control-bar>
</template>
```

## 自定义图标

您可以通过插槽自定义图标：

```vue
<template>
  <ol-styled-zoom-in-control>
    <PlusIcon />
  </ol-styled-zoom-in-control>
  
  <ol-styled-zoom-out-control>
    <MinusIcon />
  </ol-styled-zoom-out-control>
</template>
```