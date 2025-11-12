<template>
  <div
    ref="controlRef"
    title="底图切换"
    :class="[
      'ol-styled-control-item',
      'base-layer-switcher-control',
      { active: controlState.baseLayerSwitcherActive }
    ]"
    @click="handleClick"
  >
    <slot>
      <svg
        class="base-layer-icon"
        viewBox="0 0 1024 1024"
        width="20"
        height="20"
        fill="currentColor"
      >
        <path
          d="M511.8 64.2c-247 0-447.2 200.2-447.2 447.2s200.2 447.2 447.2 447.2S959 758.4 959 511.4 758.8 64.2 511.8 64.2zM778.5 778c-11.7 11.7-24.1 22.5-37 32.5-3-0.9-6.1-1.9-9.4-3-50-16.5-113.5 55.5-155.5 48s-30-1.5-46.4 13.5-82.1 12-114.4 0-8.7-6-44.1-37.4-38.2-28.6-57.4-34.6c-19.2-6-37.7 4.5-56.4-6.9-1.6-1.5-3.2-3-4.8-4.4-8.9-13.4 11.9-38.6 39.3-54.2 30.8-17.5 27.7-81.5 0-107s-92.3-13.5-105.2-9c-6.8 2.4-25.8-6.9-42.2-16.3-6.8-28.6-10.3-58-10.3-88 0-10.4 0.4-20.8 1.3-31.1 7.7-3.2 16.6-7.1 25.9-11.6C189.7 455 192.1 437 211 419s11.6-70.5 11.6-90 1.5-22.5 16.5-22.5 24 24 42.9 0 21.6-13.5 45-45c16.7-22.4 24.2-68.3 27.2-93 3.6-1.7 7.2-3.3 10.8-4.8 46.5-19.6 95.8-29.6 146.8-29.6s100.3 10 146.8 29.6c23.1 9.8 44.9 21.7 65.4 35.7-6 26.8-17.5 62.9-36.3 66.6-30.2 6-69.2-2.3-76.7-10.2s1.7-55.8-68.9-30.3c-19 16.5-21.1 40.5-30.8 51s-83.8 59.9-95.5 107.2-35.4 97.4-47.7 109.8c-12.3 12.4-7.6 83.1 29.9 89s80.8 8 84.1 81c2.4 52.3-13.4 54 0 61.5s33.7 1.4 38.5 19.5c4.9 18 7.7 27 16.4 23.3 0 0 42.4-15.6 67.9-47.2s12-6.3 25.5-31.6 26.6-128.9 14.8-137.9-13.3 1.7-28.3-25.4c-15-27.1-23.5-54.9-65.8-53-42.2 1.9-54-4.4-69.1-24.5s-22.4-33.6 0-47.1 83.9-4.5 106.4 0 101.8-23.3 88.4-7.1c-13.4 16.1-47.9 22.1-47.9 35.6s15 43.3 18.1 64c3.1 20.6 9.2 23.6 40.5-6.7s81.3-22.9 81.3 0.9 27.4 41 28.8 32.1c1.5-9 1.7-43.8 21.4-42.3s48.8-8.1 54.5 10.2c5.7 18.3-22.3 67.8 0 94.8 2.3 2.8 4.6 5.3 6.9 7.6-4.9 23.2-12.1 45.9-21.4 67.9-18.6 44.9-45.8 85.3-80.5 119.9z"
        />
      </svg>
    </slot>

    <!-- 新的底图切换面板 -->
    <div
      v-if="controlState.baseLayerSwitcherActive"
      :class="['base-layer-panel', panelPosition]"
    >
      <div
        v-for="(layerConfig, index) in baseLayerConfig"
        :key="index"
        :title="layerConfig.title"
        :class="['layer-item', { active: isActiveLayer(layerConfig.layer) }]"
        @click.stop="switchToLayer(layerConfig.title)"
      >
        <div class="layer-preview">
          <img
            v-if="getLayerPreview(layer, map)"
            :src="getLayerPreview(layer, map)"
            :alt="getLayerTitle(layer)"
            class="preview-image"
          />
          <div v-else class="preview-placeholder">无预览</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { inject, onUnmounted, watch, computed, ref } from 'vue'
import type Map from 'ol/Map'
import type { Layer } from 'ol/layer'
import type LayerGroup from 'ol/layer/Group'
import useControl from '@/composables/useControl'
import {
  getLayerTitle,
  getLayerPreview,
  getLayerGroupLayers
} from '@/composables/useLayerPreview'

// 定义组件属性
interface Props {
  layerGroup?: LayerGroup
}

const props = defineProps<Props>()

// 使用组合函数
const { controlState } = useControl()

// 定义事件发射器
const emit = defineEmits([
  'click',
  'base-layer-switcher-active-change',
  'layer-switched'
])

// 从父组件注入地图实例
const map = inject<Map>('map')

// 存储底图图层
const baseLayers = ref<Layer[]>([])

// 控制元素引用
const controlRef = ref<HTMLElement | null>(null)

// 面板位置
const panelPosition = ref('bottom-right')

// 获取底图图层组
const getBaseLayerGroup = computed(() => {
  if (props.layerGroup) {
    return props.layerGroup
  }

  if (map) {
    // 如果没有传入layerGroup，则使用地图的所有图层
    const layers = map.getLayers().getArray()
    // 过滤出瓦片图层作为底图
    return layers.filter(layer => {
      // 检查是否为瓦片图层
      return (
        layer.constructor.name.includes('Tile') ||
        ((layer as any).getSource &&
          (layer as any).getSource()?.constructor.name.includes('Tile'))
      )
    })
  }

  return []
})

const baseLayerConfig = computed(() => {
  return baseLayers.value.map(layerMapItem => {
    return {
      title:
        layerMapItem.get('title') || layerMapItem.get('name') || '未命名图层',
      preview: getLayerPreview(layerMapItem)
    }
  })
})

// 计算面板位置
const calculatePanelPosition = () => {
  if (!controlRef.value) return

  // 获取控制元素的位置信息
  const rect = controlRef.value.getBoundingClientRect()
  const windowWidth = window.innerWidth
  const windowHeight = window.innerHeight

  // 根据控制元素的位置决定面板显示位置
  const isRight = rect.left > windowWidth / 2
  const isBottom = rect.top > windowHeight / 2

  if (isRight && isBottom) {
    panelPosition.value = 'top-left'
  } else if (isRight && !isBottom) {
    panelPosition.value = 'bottom-left'
  } else if (!isRight && isBottom) {
    panelPosition.value = 'top-right'
  } else {
    panelPosition.value = 'bottom-right'
  }
}

// 更新底图图层列表
const updateBaseLayers = () => {
  if (getBaseLayerGroup.value) {
    baseLayers.value = getLayerGroupLayers(
      getBaseLayerGroup.value as LayerGroup
    )
  } else {
    baseLayers.value = []
  }
}

// 检查是否为当前激活图层
const isActiveLayer = (layer: Layer): boolean => {
  if (!map) return false

  const layers = map.getLayers().getArray()
  // 假设第一个可见的瓦片图层为当前底图
  const visibleBaseLayer = layers.find(
    l =>
      l.getVisible() &&
      (l.constructor.name.includes('Tile') ||
        ((l as any).getSource &&
          (l as any).getSource()?.constructor.name.includes('Tile')))
  )

  return visibleBaseLayer === layer
}

// 切换到底图
const switchToLayer = (layerName: string) => {
  if (!map) return

  const layers = map.getLayers().getArray()

  // 隐藏所有底图图层
  layers.forEach(layer => {
    if (
      layer.constructor.name.includes('Tile') ||
      ((layer as any).getSource &&
        (layer as any).getSource()?.constructor.name.includes('Tile'))
    ) {
      layer.setVisible(false)
    }
  })
  const targetLayer = layers.find(layer => getLayerTitle(layer) === layerName)

  // 显示目标图层
  targetLayer?.setVisible(true)

  // 发送事件
  emit('layer-switched', targetLayer)
}

const handleClick = (event: unknown) => {
  // 发射点击事件
  emit('click', event)

  if (map) {
    // 切换底图切换控件激活状态
    controlState.value.baseLayerSwitcherActive =
      !controlState.value.baseLayerSwitcherActive
    emit(
      'base-layer-switcher-active-change',
      controlState.value.baseLayerSwitcherActive
    )

    // 更新底图列表
    if (controlState.value.baseLayerSwitcherActive) {
      updateBaseLayers()
      // 计算面板位置
      calculatePanelPosition()
    }
  } else {
    console.warn('地图实例未找到')
  }
}

// 监听底图切换控件状态变化，当激活时关闭其他控件
watch(
  () => controlState.value.baseLayerSwitcherActive,
  newValue => {
    if (newValue) {
      // 关闭其他测量控件
      controlState.value.measureLengthActive = false
      controlState.value.measureAreaActive = false
      // 关闭卷帘控件
      controlState.value.swipeActive = false

      // 更新底图列表
      updateBaseLayers()

      // 计算面板位置
      calculatePanelPosition()
    }
  }
)

// 监听窗口大小变化
window.addEventListener('resize', () => {
  if (controlState.value.baseLayerSwitcherActive) {
    setTimeout(() => {
      calculatePanelPosition()
    }, 0)
  }
})
// 组件卸载时清理资源
onUnmounted(() => {
  // 确保组件卸载时关闭底图切换控件
  controlState.value.baseLayerSwitcherActive = false

  // 移除事件监听器
  window.removeEventListener('resize', calculatePanelPosition)
})

// 暴露给外部的属性和方法
defineExpose({
  updateBaseLayers,
  switchToLayer
})
</script>

<style scoped lang="scss">
// .glassmorphism-theme {
//   --styled-control-bar-bg-color: #0009;
//   --styled-control-bar-border-color: rgba(122, 163, 204, 0.5);
// }
.base-layer-switcher-control {
  position: relative;

  &.active {
    background-color: var(--styled-control-item-active-bg-color, #eeeeee);
  }

  .base-layer-icon {
    width: 20px;
    height: 20px;
  }
}

.base-layer-panel {
  position: absolute;
  background: var(
    --styled-control-base-layer-switch-bg-color,
    rgba(255, 255, 255, 0.8)
  );
  border: 1px solid var(--styled-control-bar-border-color);
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 10px;
  box-shadow: var(
    --styled-control-bar-box-shadow,
    0px 2px 4px 0px rgba(148, 149, 151, 0.5)
  );
  padding: 12px;
  min-width: 200px;
  z-index: 1000;

  &.bottom-right {
    top: calc(100% + 10px);
    left: 0;
  }

  &.bottom-left {
    top: calc(100% + 10px);
    right: 0;
  }

  &.top-right {
    bottom: 0;
    left: calc(100% + 10px);
  }

  &.top-left {
    bottom: 0;
    right: calc(100% + 10px);
  }

  .layer-item {
    display: flex;
    align-items: center;
    cursor: pointer;
    border-radius: 4px;
    border: 2px solid var(--styled-control-item-border-color);
    &:hover {
      background-color: var(--styled-control-item-hover-bg-color, #f5f5f5);
      border: 2px solid #1890ff;
    }

    &.active {
      background-color: var(--styled-control-item-active-bg-color, #e6f7ff);
      border: 2px solid #1890ff;
    }

    .layer-preview {
      width: 54px;
      height: 54px;
      border-radius: 4px;
      overflow: hidden;
      flex-shrink: 0;

      .preview-image {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .preview-placeholder {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 12px;
        color: #999;
        background-color: #f5f5f5;
      }
    }
  }
}
</style>
