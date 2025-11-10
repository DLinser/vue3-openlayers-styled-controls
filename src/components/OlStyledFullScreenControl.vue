<template>
  <div
    :title="isFullscreen ? '退出全屏' : '全屏'"
    :class="['ol-styled-control-item', 'fullscreen-control']"
    @click="handleClick"
  >
    <slot>
      <svg
        v-if="!isFullscreen"
        class="fullscreen-icon"
        viewBox="0 0 24 24"
        width="20"
        height="20"
        fill="currentColor"
      >
        <path
          d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"
        />
      </svg>
      <svg
        v-else
        class="fullscreen-icon"
        viewBox="0 0 24 24"
        width="20"
        height="20"
        fill="currentColor"
      >
        <path
          d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z"
        />
      </svg>
    </slot>
  </div>
</template>

<script setup lang="ts">
import { inject, ref, onMounted, onUnmounted } from 'vue'
import type Map from 'ol/Map'

// 定义事件发射器
const emit = defineEmits(['click', 'fullscreen-change'])

// 从父组件注入地图实例
const map = inject<Map>('map')
const isFullscreen = ref(false)

const handleClick = (event: unknown) => {
  // 发射点击事件
  emit('click', event)

  if (map) {
    const mapElement = map.getTargetElement()
    if (mapElement) {
      if (!isFullscreen.value) {
        // 进入全屏
        if (mapElement.requestFullscreen) {
          mapElement.requestFullscreen()
        } else if ((mapElement as any).mozRequestFullScreen) {
          ;(mapElement as any).mozRequestFullScreen()
        } else if ((mapElement as any).webkitRequestFullscreen) {
          ;(mapElement as any).webkitRequestFullscreen()
        } else if ((mapElement as any).msRequestFullscreen) {
          ;(mapElement as any).msRequestFullscreen()
        }
      } else {
        // 退出全屏
        if (document.exitFullscreen) {
          document.exitFullscreen()
        } else if ((document as any).mozCancelFullScreen) {
          ;(document as any).mozCancelFullScreen()
        } else if ((document as any).webkitExitFullscreen) {
          ;(document as any).webkitExitFullscreen()
        } else if ((document as any).msExitFullscreen) {
          ;(document as any).msExitFullscreen()
        }
      }
    }
  } else {
    console.warn('地图实例未找到')
  }
}

// 监听全屏状态变化
const handleFullscreenChange = () => {
  isFullscreen.value = !!(
    document.fullscreenElement ||
    (document as any).mozFullScreenElement ||
    (document as any).webkitFullscreenElement ||
    (document as any).msFullscreenElement
  )
  emit('fullscreen-change', isFullscreen.value)
}

onMounted(() => {
  document.addEventListener('fullscreenchange', handleFullscreenChange)
  document.addEventListener('mozfullscreenchange', handleFullscreenChange)
  document.addEventListener('webkitfullscreenchange', handleFullscreenChange)
  document.addEventListener('msfullscreenchange', handleFullscreenChange)
})

onUnmounted(() => {
  document.removeEventListener('fullscreenchange', handleFullscreenChange)
  document.removeEventListener('mozfullscreenchange', handleFullscreenChange)
  document.removeEventListener('webkitfullscreenchange', handleFullscreenChange)
  document.removeEventListener('msfullscreenchange', handleFullscreenChange)
})

// 暴露给外部的属性和方法
defineExpose({
  isFullscreen
})
</script>

<style scoped></style>
