# 全屏控件 OlStyledFullScreenControl

全屏控件用于切换地图的全屏显示模式。

## 基本使用

```vue
<template>
  <ol-styled-full-screen-control />
</template>
```

## 事件 (Events)

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

## 插槽（Slot）

可以通过默认插槽自定义控件图标：

```vue
<template>
  <ol-styled-full-screen-control>
    <template #default>
      <i class="custom-fullscreen-icon"></i>
    </template>
  </ol-styled-full-screen-control>
</template>
```

## 国际化

全屏控件支持国际化，通过在安装插件时配置 `locale` 和 `messages`：

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
      fullScreen: { enter: 'Full screen', exit: 'Exit full screen' }
    }
  }
})

app.mount('#app')
```
