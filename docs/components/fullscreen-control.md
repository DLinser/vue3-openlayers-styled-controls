# 全屏控件 OlStyledFullScreenControl

全屏控件用于切换地图的全屏显示模式。

## 基本使用

```vue
<template>
  <OlStyledFullScreenControl />
</template>
```

## Props

| 属性名 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| target | `string` \| `HTMLElement` | - | 全屏目标元素 |

## Events

| 事件名 | 参数 | 说明 |
| --- | --- | --- |
| click | `Event` | 点击事件 |
| enterfullscreen | - | 进入全屏时触发 |
| leavefullscreen | - | 退出全屏时触发 |

## 示例

### 基本用法

```vue
<template>
  <OlStyledControlBar>
    <OlStyledFullScreenControl />
  </OlStyledControlBar>
</template>
```

### 指定全屏目标

```vue
<template>
  <div ref="mapContainer">
    <ol-map>
      <!-- 地图内容 -->
    </ol-map>
    
    <OlStyledControlBar>
      <OlStyledFullScreenControl :target="mapContainer" />
    </OlStyledControlBar>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const mapContainer = ref(null)
</script>
```