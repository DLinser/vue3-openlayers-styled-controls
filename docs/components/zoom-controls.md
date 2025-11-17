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

## 国际化

缩放控件支持国际化，可以通过配置插件时的 `locale` 和 `messages` 参数来设置显示语言：

```js
// main.js
import { createApp } from 'vue'
import App from './App.vue'
import OpenLayersControls from 'vue3-openlayers-styled-controls'

const app = createApp(App)

// 配置默认语言为英文
app.use(OpenLayersControls, {
  locale: 'en'
})

app.mount('#app')
```

您也可以自定义语言资源：

```js
// main.js
import { createApp } from 'vue'
import App from './App.vue'
import OpenLayersControls from 'vue3-openlayers-styled-controls'

const app = createApp(App)

// 配置自定义语言
app.use(OpenLayersControls, {
  locale: 'fr', // 设置默认语言为法语
  messages: {
    fr: {
      zoomIn: {
        title: 'Zoom avant'
      },
      zoomOut: {
        title: 'Zoom arrière'
      }
    }
  }
})

app.mount('#app')
```