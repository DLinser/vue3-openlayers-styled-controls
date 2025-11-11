<template>
  <div ref="controlBar" :class="containerClasses">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'

// 定义组件属性
interface Props {
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
  theme?: 'default' | 'dark' | 'ocean' | 'glassmorphism'
}

const props = withDefaults(defineProps<Props>(), {
  position: 'bottom-right',
  theme: 'default'
})

// 定义事件发射器
const emit = defineEmits(['mounted'])

// 控件栏引用
const controlBar = ref(null)

// 计算位置类名
const positionClass = computed(() => {
  const positions = {
    'top-left': 'top-left-position',
    'top-right': 'top-right-position',
    'bottom-left': 'bottom-left-position',
    'bottom-right': 'bottom-right-position'
  }
  return positions[props.position] || 'bottom-right-position'
})

// 计算主题类名
const themeClass = computed(() => {
  return `${props.theme}-theme`
})

// 计算容器类名
const containerClasses = computed(() => {
  return [
    'ol-styled-control-bar',
    positionClass.value,
    themeClass.value
  ].filter(Boolean)
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

<style scoped lang="scss">
@use '@/assets/style/var.scss';
.ol-styled-control-bar {
  position: absolute;
  border-radius: 2px;
  padding: 4px 6px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  z-index: 1000;
  pointer-events: none;
  background-color: var(
    --styled-control-bar-bg-color,
    rgba(255, 255, 255, 0.8)
  );
  color: var(--styled-control-text-color, #333);
  box-shadow: var(
    --styled-control-bar-box-shadow,
    0px 2px 4px 0px rgba(148, 149, 151, 0.5)
  );

  & > * {
    pointer-events: auto;
  }

  /* 位置样式 */
  &.top-left-position {
    top: 10px;
    left: 10px;
    flex-direction: row;
  }

  &.top-right-position {
    top: 10px;
    right: 12px;
    flex-direction: row;
  }

  &.bottom-right-position {
    bottom: 9px;
    right: 12px;
  }

  &.bottom-left-position {
    bottom: 9px;
    left: 10px;
  }

  // 使用深度选择器穿透scoped样式，影响slot中的子组件
  :deep(.ol-styled-control-item) {
    width: 24px;
    height: 24px;
    outline: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--styled-control-item-bg-color, transparent);
    border: 1px solid var(--styled-control-item-border-color, transparent);
    border-radius: 4px;

    &:hover {
      background-color: var(--styled-control-item-hover-bg-color, #f5f5f5);
      box-shadow: var(
        --styled-control-item-hover-box-shadow,
        0px 2px 4px 0px rgba(148, 149, 151, 0.5)
      );
    }
    &.active {
      background-color: var(--styled-control-item-active-bg-color, #f5f5f5);
      box-shadow: var(
        --styled-control-item-hover-box-shadow,
        0px 2px 4px 0px rgba(148, 149, 151, 0.5)
      );
    }
  }
}
</style>
