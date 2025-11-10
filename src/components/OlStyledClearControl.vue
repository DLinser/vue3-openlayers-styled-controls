<template>
  <div
    title="清除"
    :class="['ol-styled-control-item', 'clear-control']"
    @click="handleClick"
  >
    <slot>
      <svg
        class="clear-icon"
        viewBox="0 0 24 24"
        width="20"
        height="20"
        fill="currentColor"
      >
        <path
          d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
        />
      </svg>
    </slot>
  </div>
</template>

<script setup lang="ts">
import { inject } from 'vue'
import type Map from 'ol/Map'
import type VectorLayer from 'ol/layer/Vector'
import type VectorSource from 'ol/source/Vector'

// 定义属性
interface Props {
  targetLayers?: string[] // 要清除的图层名称数组，如果不提供则清除所有矢量图层
}

const props = withDefaults(defineProps<Props>(), {
  targetLayers: () => []
})

// 定义事件发射器
const emit = defineEmits(['click', 'clear'])

// 从父组件注入地图实例
const map = inject<Map>('map')

const handleClick = (event: unknown) => {
  // 发射点击事件
  emit('click', event)

  if (map) {
    clearFeatures()
  } else {
    console.warn('地图实例未找到')
  }
}

const clearFeatures = () => {
  if (!map) return

  try {
    // 获取地图上的所有图层
    const layers = map.getLayers().getArray()

    // 如果指定了特定图层，则只清除这些图层
    if (props.targetLayers.length > 0) {
      layers.forEach(layer => {
        // 检查图层是否有名称属性
        const layerName = (layer as any).get('name')
        if (layerName && props.targetLayers.includes(layerName)) {
          clearLayerFeatures(layer)
        }
      })
    } else {
      // 默认清除所有矢量图层
      layers.forEach(layer => {
        clearLayerFeatures(layer)
      })
    }

    // 发射清除事件
    emit('clear', props.targetLayers.length > 0 ? props.targetLayers : 'all')
  } catch (error) {
    console.error('清除图层要素时出错:', error)
  }
}

const clearLayerFeatures = (layer: any) => {
  try {
    // 检查是否为矢量图层
    if (layer && typeof layer.getSource === 'function') {
      const source = layer.getSource()
      if (source && typeof source.clear === 'function') {
        source.clear()
      }
    }
  } catch (error) {
    console.error('清除图层要素时出错:', error)
  }
}

// 暴露给外部的属性和方法
defineExpose({
  clearFeatures
})
</script>

<style scoped></style>
