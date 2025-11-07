<template>
  <button
    ref="btn"
    type="button"
    :title="title"
    :disabled="disabled"
    class="zoom-control zoom-out-control"
    :class="customClass"
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
  </button>
</template>

<script setup lang="ts">
import { inject, ref } from 'vue'
import type Map from 'ol/Map'

// 定义组件属性
interface Props {
  title?: string
  disabled?: boolean
  customClass?: string
}

const props = withDefaults(defineProps<Props>(), {
  title: '缩小',
  disabled: false,
  customClass: ''
})

// 定义事件发射器
const emit = defineEmits(['click', 'zoom-out'])

// 从父组件注入地图实例
const map = inject<Map>('map')
const btn = ref(null)

const handleClick = (event: unknown) => {
  // 发射点击事件
  emit('click', event)

  if (props.disabled) return

  if (map) {
    const view = map.getView()
    const currentZoom = view.getZoom()
    if (currentZoom !== undefined) {
      const newZoom = currentZoom - 1
      view.setZoom(newZoom)
      // 发射缩放事件
      emit('zoom-out', newZoom)
    }
  } else {
    console.warn('地图实例未找到')
  }
}

// 暴露给外部的属性和方法
defineExpose({
  btn
})
</script>

<style scoped>
.zoom-control {
  margin: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  cursor: pointer;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  outline: none;
}

.zoom-control:hover:not(:disabled) {
  background-color: #f5f5f5;
  transform: scale(1.05);
}

.zoom-control:active:not(:disabled) {
  transform: scale(0.95);
}

.zoom-control:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.zoom-out-control {
  /* 缩小按钮特定样式可以在这里添加 */
}

.zoom-icon {
  color: #666;
}
</style>
