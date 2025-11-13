<template>
  <div
    title="卷帘"
    :class="[
      'ol-styled-control-item',
      'swipe-control',
      { active: controlState.swipeActive }
    ]"
    @click="handleClick"
  >
    <slot>
      <svg
        class="swipe-icon"
        viewBox="0 0 1075 1024"
        width="20"
        height="20"
        fill="currentColor"
      >
        <path
          d="M878.933333 605.866667h76.8V682.666667h-76.8zM896 814.933333v38.4h25.6c21.333333 0 34.133333-17.066667 34.133333-38.4v-51.2h-76.8v51.2h17.066667zM738.133333 776.533333h76.8V853.333333h-76.8zM878.933333 452.266667h76.8v76.8h-76.8zM716.8 162.133333h76.8v76.8h-76.8zM878.933333 302.933333h76.8v76.8h-76.8zM917.333333 238.933333v-17.066666h38.4v-25.6c0-21.333333-17.066667-34.133333-38.4-34.133334h-55.466666v76.8h55.466666zM507.733333 4.266667v162.133333H93.866667c-21.333333 0-34.133333 17.066667-34.133334 38.4v614.4c0 21.333333 17.066667 34.133333 38.4 34.133333h409.6v166.4h102.4V853.333333h55.466667v-76.8h-55.466667V243.2h29.866667V166.4h-29.866667V4.266667h-102.4zM136.533333 238.933333H512v537.6H136.533333V238.933333z"
        />
      </svg>
    </slot>
    <ol-swipe-control
      v-if="controlState.swipeActive && leftLayers.length && rightLayers.length"
      :layers="leftLayers"
      :right-layers="rightLayers"
      :position="position"
      :orientation="orientation"
    />
  </div>
</template>

<script setup lang="ts">
import { inject, onUnmounted, watch } from 'vue'
import type Map from 'ol/Map'
import type Layer from 'ol/layer/Layer'
import useControl from '@/composables/useControl'

// 定义组件属性
interface Props {
  leftLayers?: Layer[]
  rightLayers?: Layer[]
  position?: number
  orientation?: 'horizontal' | 'vertical'
}

withDefaults(defineProps<Props>(), {
  leftLayers: () => [],
  rightLayers: () => [],
  position: 0.5,
  orientation: 'vertical'
})

// 使用组合函数
const { controlState } = useControl()

// 定义事件发射器
const emit = defineEmits(['click', 'swipe-active-change'])

// 从父组件注入地图实例
const map = inject<Map>('map')

const handleClick = (event: unknown) => {
  // 发射点击事件
  emit('click', event)

  if (map) {
    // 切换卷帘控件激活状态
    controlState.value.swipeActive = !controlState.value.swipeActive
    emit('swipe-active-change', controlState.value.swipeActive)
  } else {
    console.warn('地图实例未找到')
  }
}

// 监听卷帘控件状态变化，当激活时关闭其他控件
watch(
  () => controlState.value.swipeActive,
  newValue => {
    if (newValue) {
      // 关闭其他测量控件
      controlState.value.measureLengthActive = false
      controlState.value.measureAreaActive = false
    }
  }
)

// 组件卸载时清理资源
onUnmounted(() => {
  // 确保组件卸载时关闭卷帘控件
  controlState.value.swipeActive = false
})

// 暴露给外部的属性和方法
defineExpose({})
</script>
