<template>
  <div
    :title="isCollapsed ? '展开侧边栏' : '收起侧边栏'"
    :class="['ol-styled-control-item', 'sidebar-control']"
    @click="handleClick"
  >
    <slot>
      <svg
        v-if="isCollapsed"
        class="sidebar-icon"
        viewBox="0 0 24 24"
        width="20"
        height="20"
        fill="currentColor"
      >
        <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
      </svg>
      <svg
        v-else
        class="sidebar-icon"
        viewBox="0 0 24 24"
        width="20"
        height="20"
        fill="currentColor"
      >
        <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
      </svg>
    </slot>
  </div>
</template>

<script setup lang="ts">
import { inject, ref } from 'vue'
import type Map from 'ol/Map'

// 定义属性
interface Props {
  targetElement?: string // 要控制的侧边栏元素选择器
}

const props = withDefaults(defineProps<Props>(), {
  targetElement: '.sidebar'
})

// 定义事件发射器
const emit = defineEmits(['click', 'toggle'])

// 从父组件注入地图实例（虽然这个组件不直接使用地图，但保持一致性）
const map = inject<Map>('map')
const isCollapsed = ref(false)

const handleClick = (event: unknown) => {
  // 发射点击事件
  emit('click', event)

  // 切换侧边栏状态
  toggleSidebar()
}

const toggleSidebar = () => {
  const sidebar = document.querySelector(props.targetElement)
  if (sidebar) {
    isCollapsed.value = !isCollapsed.value
    sidebar.classList.toggle('collapsed', isCollapsed.value)
    emit('toggle', isCollapsed.value)
  } else {
    console.warn('未找到指定的侧边栏元素:', props.targetElement)
  }
}

// 暴露给外部的属性和方法
defineExpose({
  isCollapsed,
  toggleSidebar
})
</script>

<style scoped></style>
