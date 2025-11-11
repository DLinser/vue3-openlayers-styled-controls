# 测量控件

测量控件包括长度测量和面积测量控件，用于在地图上进行距离和面积测量。

## OlStyledMeasureLengthControl 长度测量控件

### 基本使用

```vue
<template>
  <OlStyledMeasureLengthControl />
</template>
```

### Props

| 属性名 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| strokeColor | `string` | `#ffcc33` | 测量线颜色 |
| strokeWidth | `number` | `2` | 测量线宽度 |
| fillColor | `string` | `rgba(255, 255, 255, 0.2)` | 测量区域填充颜色 |

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
  <OlStyledMeasureAreaControl />
</template>
```

### Props

| 属性名 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| strokeColor | `string` | `#ffcc33` | 测量线颜色 |
| strokeWidth | `number` | `2` | 测量线宽度 |
| fillColor | `string` | `rgba(255, 255, 255, 0.2)` | 测量区域填充颜色 |

### Events

| 事件名 | 参数 | 说明 |
| --- | --- | --- |
| click | `Event` | 点击事件 |
| measure-start | - | 开始测量时触发 |
| measure-end | `number` | 测量结束时触发，返回测量结果 |

## 组合使用

测量控件通常与其他控件一起使用：

```vue
<template>
  <OlStyledControlBar>
    <OlStyledMeasureLengthControl />
    <OlStyledMeasureAreaControl />
    <OlStyledClearControl />
  </OlStyledControlBar>
</template>
```

## 示例

### 自定义样式

```vue
<template>
  <OlStyledMeasureLengthControl
    stroke-color="#ff0000"
    stroke-width="3"
    fill-color="rgba(255, 0, 0, 0.1)"
  />
</template>
```