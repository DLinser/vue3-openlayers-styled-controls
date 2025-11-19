# 组件总览

Vue3 OpenLayers Styled Controls 提供了一系列可定制的地图控件组件，帮助您快速构建功能丰富的地图应用。

## 组件列表

| 组件名 | 描述 | 文档 |
| --- | --- | --- |
| [ol-styled-control-bar](./control-bar) | 控件容器，用于布局管理多个控件 | [查看文档](./control-bar) |
| [ol-styled-zoom-in-control](./zoom-controls) | 地图放大控件 | [查看文档](./zoom-controls) |
| [ol-styled-zoom-out-control](./zoom-controls) | 地图缩小控件 | [查看文档](./zoom-controls) |
| [ol-styled-full-screen-control](./fullscreen-control) | 全屏切换控件 | [查看文档](./fullscreen-control) |
| [ol-styled-measure-length-control](./measure-controls) | 长度测量控件 | [查看文档](./measure-controls) |
| [ol-styled-measure-area-control](./measure-controls) | 面积测量控件 | [查看文档](./measure-controls) |
| [ol-styled-plot-control](./plot-control) | 标绘控件 | [查看文档](./plot-control) |
| [ol-styled-clear-control](./clear-control) | 清除控件 | [查看文档](./clear-control) |
| [ol-styled-swipe-control](./swipe-control) | 卷帘对比控件 | [查看文档](./swipe-control) |
| [ol-styled-base-layer-switcher](./base-layer-switcher) | 底图切换控件 | [查看文档](./base-layer-switcher) |

## 使用示例

### 基本组合

```vue
<template>
  <ol-map>
    <ol-view
      ref="view"
      :center="[120, 40]"
      :zoom="8"
      :projection="'EPSG:4326'"
    />

    <base-layer />
    
    <!-- 控件栏组合 -->
    <ol-styled-control-bar>
      <ol-styled-zoom-in-control />
      <ol-styled-zoom-out-control />
    </ol-styled-control-bar>
  </ol-map>
</template>
```

### 完整功能组合

```vue
<template>
  <ol-map>
    <ol-view
      ref="view"
      :center="[120, 40]"
      :zoom="8"
      :projection="'EPSG:4326'"
    />

    <base-layer />
    
    <!-- 完整控件组合 -->
    <ol-styled-control-bar>
      <ol-styled-zoom-in-control />
      <ol-styled-zoom-out-control />
      <ol-styled-full-screen-control />
      <ol-styled-measure-length-control />
      <ol-styled-measure-area-control />
      <ol-styled-plot-control />
      <ol-styled-clear-control />
    </ol-styled-control-bar>
  </ol-map>
</template>
```

## 主题定制

所有控件都支持多种主题和样式定制，请参考[主题定制](../guide/theming)指南了解更多详情。

## 国际化

控件支持国际化，请参考[国际化](../guide/i18n)指南了解如何配置多语言支持。