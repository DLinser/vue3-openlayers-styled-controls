# 清除控件 OlStyledClearControl

清除控件用于清除地图上的测量结果或其他绘制内容。

## 基本使用

```vue
<template>
  <OlStyledClearControl />
</template>
```

## Events

| 事件名 | 参数 | 说明 |
| --- | --- | --- |
| click | `Event` | 点击事件 |
| clear | - | 清除操作完成时触发 |

## 示例

### 基本用法

```vue
<template>
  <OlStyledControlBar>
    <OlStyledMeasureLengthControl />
    <OlStyledMeasureAreaControl />
    <OlStyledClearControl />
  </OlStyledControlBar>
</template>
```

### 监听清除事件

```vue
<template>
  <OlStyledClearControl @clear="handleClear" />
</template>

<script setup>
const handleClear = () => {
  console.log('测量结果已清除')
  // 执行其他清除操作
}
</script>
```