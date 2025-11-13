<template>
  <div
    title="放大"
    :class="['ol-styled-control-item', 'zoom-in-control']"
    @click="handleClick"
  >
    <slot>
      <svg
        class="zoom-icon"
        viewBox="0 0 24 24"
        width="20"
        height="20"
        fill="currentColor"
      >
        <path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z" />
      </svg>
    </slot>
  </div>
</template>

<script setup lang="ts">
import { inject } from 'vue'
import type Map from 'ol/Map'

// 定义事件发射器
const emit = defineEmits(['click', 'zoom-in'])

// 从父组件注入地图实例
const map = inject<Map>('map')

const handleClick = (event: unknown) => {
  // 发射点击事件
  emit('click', event)

  if (map) {
    const view = map.getView()
    const currentZoom = view.getZoom()
    if (currentZoom !== undefined) {
      // 使用动画缩放，持续时间500ms，缓动函数easeOut
      view.animate({
        zoom: currentZoom + 1,
        duration: 500,
        easing: t => 1 - Math.pow(1 - t, 3) // easeOutCubic
      })
      // 发射缩放事件
      emit('zoom-in', currentZoom + 1)
    }
  } else {
    console.warn('地图实例未找到')
  }
}

// 暴露给外部的属性和方法
defineExpose({})
</script>

<style scoped></style>
