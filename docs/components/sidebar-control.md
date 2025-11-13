# 侧边栏控件 OlStyledSidebarControl

侧边栏控件用于切换侧边栏的显示状态。

## 基本使用

```vue
<template>
  <OlStyledSidebarControl />
</template>
```

## Props

| 属性名 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| sidebarId | `string` | - | 关联的侧边栏ID |

## Events

| 事件名 | 参数 | 说明 |
| --- | --- | --- |
| click | `Event` | 点击事件 |
| toggle | `boolean` | 切换事件，返回新的显示状态 |

## 示例

### 基本用法

```vue
<template>
  <ol-styled-control-bar>
    <ol-styled-sidebar-control />
  </ol-styled-control-bar>
  
  <div v-if="sidebarVisible" class="sidebar">
    <!-- 侧边栏内容 -->
  </div>
</template>

<script setup>
import { ref } from 'vue'

const sidebarVisible = ref(false)

const handleToggle = (visible) => {
  sidebarVisible.value = visible
}
</script>
```

### 关联特定侧边栏

```vue
<template>
  <ol-styled-sidebar-control sidebar-id="main-sidebar" />
  
  <div id="main-sidebar" v-if="sidebarVisible" class="sidebar">
    <!-- 侧边栏内容 -->
  </div>
</template>
```