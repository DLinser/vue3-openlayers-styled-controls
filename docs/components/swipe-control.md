# 卷帘组件 (OlStyledSwipeControl)

卷帘组件提供了一种直观的方式来比较两个不同的图层或地图视图。用户可以通过拖拽分隔线来动态调整两个图层的显示比例。

## 基本用法

```vue
<template>
  <ol-map>
    <ol-view
      ref="view"
      :center="[120, 40]"
      :zoom="8"
      :projection="'EPSG:4326'"
    />

    <!-- 底图图层 -->
    <ol-tile-layer title="OSM">
      <ol-source-osm />
    </ol-tile-layer>

    <!-- 对比图层 -->
    <ol-tile-layer ref="compareLayer" title="天地图影像">
      <ol-source-tianditu
        layerType="img"
        projection="EPSG:4326"
        tk="your-token"
      />
    </ol-tile-layer>

    <!-- 卷帘控件 -->
    <ol-styled-control-bar>
      <ol-styled-swipe-control
        :left-layers="[compareLayer?.tileLayer]"
        :right-layers="[baseLayer?.tileLayer]"
      />
    </ol-styled-control-bar>
  </ol-map>
</template>

<script setup>
import { ref } from 'vue'

const compareLayer = ref(null)
const baseLayer = ref(null)
</script>
```

## Props

| 属性名 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| leftLayers | Layer[] | [] | 左侧显示的图层列表 |
| rightLayers | Layer[] | [] | 右侧显示的图层列表 |
| position | number | 0.5 | 分隔线的初始位置（0-1之间） |
| orientation | 'horizontal' \| 'vertical' | 'vertical' | 卷帘方向 |

## Events

| 事件名 | 参数 | 说明 |
| --- | --- | --- |
| click | MouseEvent | 控件被点击时触发 |
| swipe-active-change | boolean | 卷帘控件激活状态改变时触发 |

## 插槽

卷帘组件支持默认插槽，可用于自定义控件图标：

```vue
<ol-styled-swipe-control
  :left-layers="[layer1]"
  :right-layers="[layer2]"
>
  <template #default>
    <i class="custom-swipe-icon"></i>
  </template>
</ol-styled-swipe-control>
```

## 使用示例

### 水平卷帘

```vue
<ol-styled-swipe-control
  :left-layers="[layer1]"
  :right-layers="[layer2]"
  orientation="horizontal"
  :position="0.3"
/>
```

### 垂直卷帘（默认）

```vue
<ol-styled-swipe-control
  :left-layers="[layer1]"
  :right-layers="[layer2]"
  orientation="vertical"
  :position="0.7"
/>
```

## 注意事项

1. 卷帘组件需要配合 `ol-styled-control-bar` 使用
2. 需要确保传入的图层已经正确加载
3. 卷帘控件激活时会自动关闭其他测量控件
4. 卷帘控件在同一时间只能有一个实例处于激活状态

## 主题定制

卷帘控件支持主题定制，可以通过 CSS 变量修改样式：

```scss
:root {
  --styled-control-item-bg-color: #ffffff;
  --styled-control-item-hover-bg-color: #f5f5f5;
  --styled-control-item-active-bg-color: #eeeeee;
}
```