<template>
  <div
    title="清除"
    :class="['ol-styled-control-item', 'clear-control']"
    @click="handleClick"
  >
    <slot>
      <svg
        class="clear-icon"
        viewBox="0 0 1024 1024"
        width="20"
        height="20"
        fill="currentColor"
      >
        <path
          d="M899.1 869.6l-53-305.6H864c14.4 0 26-11.6 26-26V346c0-14.4-11.6-26-26-26H618V138c0-14.4-11.6-26-26-26H432c-14.4 0-26 11.6-26 26v182H160c-14.4 0-26 11.6-26 26v192c0 14.4 11.6 26 26 26h17.9l-53 305.6c-0.3 1.5-0.4 3-0.4 4.4 0 14.4 11.6 26 26 26h723c1.5 0 3-0.1 4.4-0.4 14.2-2.4 23.7-15.9 21.2-30zM204 390h272V182h72v208h272v104H204V390z m468 440V674c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v156H416V674c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v156H202.8l45.1-260H776l45.1 260H672z"
        />
      </svg>
    </slot>
  </div>
</template>

<script setup lang="ts">
import { inject } from 'vue'
import type Map from 'ol/Map'
import useControl from '@/composables/useControl'

// 定义事件发射器
const emit = defineEmits(['click', 'clear'])

// 从父组件注入地图实例
const map = inject<Map>('map')

// 使用组合函数
const { closeAllControls } = useControl()

const handleClick = (event: unknown) => {
  // 发射点击事件
  emit('click', event)

  if (map) {
    // 关闭所有控件
    closeAllControls()
  } else {
    console.warn('地图实例未找到')
  }
}

// 暴露给外部的属性和方法
defineExpose({
  closeAllControls
})
</script>

<style scoped></style>
