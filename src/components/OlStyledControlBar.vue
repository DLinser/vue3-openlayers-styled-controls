<template>
  <div ref="controlBar" :class="['ol-styled-control-bar', positionClass]">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'

// 定义组件属性
interface Props {
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
}

const props = withDefaults(defineProps<Props>(), {
  position: 'bottom-right'
})

// 定义事件发射器
const emit = defineEmits(['mounted'])

// 控件栏引用
const controlBar = ref(null)

// 计算位置类名
const positionClass = computed(() => {
  return `ol-styled-control-bar--${props.position.replace('_', '-')}`
})

// 组件挂载后发射事件
onMounted(() => {
  if (controlBar.value) {
    emit('mounted', controlBar.value)
  }
})

// 暴露给外部的属性和方法
defineExpose({
  controlBar
})
</script>

<style scoped>
.ol-styled-control-bar {
  position: absolute;
  display: flex;
  flex-direction: column;
  z-index: 1000;
  pointer-events: none;
}

.ol-styled-control-bar > * {
  pointer-events: auto;
}

/* 位置样式 */
.ol-styled-control-bar--top-left {
  top: 10px;
  left: 10px;
}

.ol-styled-control-bar--top-right {
  top: 10px;
  right: 10px;
}

.ol-styled-control-bar--bottom-left {
  bottom: 10px;
  left: 10px;
}

.ol-styled-control-bar--bottom-right {
  bottom: 10px;
  right: 10px;
}

/* 垂直方向的控件间距 */
.ol-styled-control-bar > *:not(:first-child) {
  margin-top: 5px;
}
</style>
