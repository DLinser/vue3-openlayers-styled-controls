<template>
  <div
    :title="t('zoomOut.title')"
    :class="['ol-styled-control-item', 'zoom-out-control']"
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
        <path d="M5 11h14v2H5z" />
      </svg>
    </slot>
  </div>
</template>

<script setup lang="ts">
import { inject } from 'vue'
import type Map from 'ol/Map'
import { globalI18n, defaultI18n } from '../i18n'

// 使用 i18n，优先使用全局配置的 i18n，否则使用默认的
const t = (key: string) => {
  if (globalI18n) {
    return globalI18n.t(key)
  }
  return defaultI18n.t(key)
}

// 定义事件发射器
const emit = defineEmits(['click', 'zoom-out'])

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
        zoom: currentZoom - 1,
        duration: 500,
        easing: t => 1 - Math.pow(1 - t, 3) // easeOutCubic
      })
      // 发射缩放事件
      emit('zoom-out', currentZoom - 1)
    }
  } else {
    console.warn('地图实例未找到')
  }
}

// 暴露给外部的属性和方法
defineExpose({})
</script>

<style scoped></style>
