# 组件总览

Vue3 OpenLayers Styled Controls 提供了一系列可定制的地图控件组件，帮助您快速构建功能丰富的地图应用。

## 组件列表

| 组件名 | 描述 | 文档 |
| --- | --- | --- |
| [OlStyledControlBar](./control-bar) | 控件容器，用于布局管理多个控件 | [查看文档](./control-bar) |
| [OlStyledZoomInControl](./zoom-controls) | 地图放大控件 | [查看文档](./zoom-controls) |
| [OlStyledZoomOutControl](./zoom-controls) | 地图缩小控件 | [查看文档](./zoom-controls) |
| [OlStyledFullScreenControl](./fullscreen-control) | 全屏切换控件 | [查看文档](./fullscreen-control) |
| [OlStyledMeasureLengthControl](./measure-controls) | 长度测量控件 | [查看文档](./measure-controls) |
| [OlStyledMeasureAreaControl](./measure-controls) | 面积测量控件 | [查看文档](./measure-controls) |
| [OlStyledClearControl](./clear-control) | 清除控件 | [查看文档](./clear-control) |
| [OlStyledSidebarControl](./sidebar-control) | 侧边栏切换控件 | [查看文档](./sidebar-control) |

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
    <OlStyledControlBar>
      <OlStyledZoomInControl />
      <OlStyledZoomOutControl />
    </OlStyledControlBar>
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
    <OlStyledControlBar>
      <OlStyledZoomInControl />
      <OlStyledZoomOutControl />
      <OlStyledFullScreenControl />
      <OlStyledMeasureLengthControl />
      <OlStyledMeasureAreaControl />
      <OlStyledClearControl />
      <OlStyledSidebarControl />
    </OlStyledControlBar>
  </ol-map>
</template>
```

## 主题定制

所有控件都支持多种主题和样式定制，请参考[主题定制](../guide/theming)指南了解更多详情。

## 国际化

控件支持国际化，请参考[国际化](../guide/i18n)指南了解如何配置多语言支持。