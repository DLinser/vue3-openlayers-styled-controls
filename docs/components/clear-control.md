# 清除控件 OlStyledClearControl

清除控件用于清除地图上的测量结果或其他绘制内容。

## 基本使用

```vue
<template>
  <ol-styled-clear-control />
</template>
```

## 事件 (Events)

| 事件名 | 参数 | 说明 |
| --- | --- | --- |
| click | `Event` | 点击事件 |

## 示例

### 基本用法

```vue
<template>
  <ol-styled-control-bar>
    <ol-styled-measure-length-control />
    <ol-styled-measure-area-control />
    <ol-styled-clear-control />
  </ol-styled-control-bar>
</template>
```

## 插槽（Slot）

可以通过默认插槽自定义控件图标：

```vue
<template>
  <ol-styled-clear-control>
    <template #default>
      <i class="custom-clear-icon"></i>
    </template>
  </ol-styled-clear-control>
  </template>
```

## 国际化

清除控件支持国际化，通过在安装插件时配置 `locale` 和 `messages`：

```js
// main.js
import { createApp } from 'vue'
import App from './App.vue'
import OpenLayersControls from 'vue3-openlayers-styled-controls'

const app = createApp(App)

app.use(OpenLayersControls, {
  locale: 'en',
  messages: {
    en: {
      clear: { title: 'Clear' }
    }
  }
})

app.mount('#app')
```

### 监听清除事件

```vue
<template>
  <ol-styled-clear-control @clear="handleClear" />
</template>

<script setup>
const handleClear = () => {
  console.log('测量结果已清除')
  // 执行其他清除操作
}
</script>
```
