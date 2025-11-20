# 测量控件

测量控件包括长度测量和面积测量控件，用于在地图上进行距离和面积测量。

## OlStyledMeasureLengthControl 长度测量控件

### 基本使用

```vue
<template>
  <ol-styled-measure-length-control />
</template>
```

### Events

| 事件名 | 参数 | 说明 |
| --- | --- | --- |
| click | `Event` | 点击事件 |
| measure-start | - | 开始测量时触发 |
| measure-end | `number` | 测量结束时触发，返回测量结果 |

## OlStyledMeasureAreaControl 面积测量控件

### 基本使用

```vue
<template>
  <ol-styled-measure-area-control />
</template>
```

### Events

| 事件名 | 参数 | 说明 |
| --- | --- | --- |
| click | Event | 点击事件 |
| measure-start | DrawEvent | 开始测量时触发 |
| measure-end | DrawEvent | 测量结束时触发，返回测量结果 |
| geometry-change | any | 测量结束时触发，返回测量结果 |

## 组合使用

测量控件通常与其他控件一起使用：

```vue
<template>
  <ol-styled-control-bar>
    <ol-styled-measure-length-control />
    <ol-styled-measure-area-control />
    <ol-styled-clear-control />
  </ol-styled-control-bar>
</template>
```