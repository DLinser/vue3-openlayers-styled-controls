<template>
  <div
    :title="controlState.measureAreaActive ? '停止测量' : '测量面积'"
    :class="[
      'ol-styled-control-item',
      'measure-area-control',
      { active: controlState.measureAreaActive }
    ]"
    @click="handleClick"
  >
    <slot>
      <svg
        class="measure-area-icon"
        viewBox="0 0 24 24"
        width="20"
        height="20"
        fill="currentColor"
      >
        <path
          d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z"
        />
        <path
          d="M7 7h10v10H7z"
          fill="none"
          stroke="currentColor"
          stroke-width="1"
        />
      </svg>
    </slot>
    <template v-if="controlState.measureAreaActive">
      <ol-overlay
        v-for="(tooltipCoordItem, tooltipCoordIndex) in tooltipCoordHistory"
        :key="'tooltipCoordIndex' + tooltipCoordIndex"
        :position="tooltipCoordItem"
        :offset="[0, -15]"
        positioning="bottom-center"
        :stopEvent="false"
        :insertFirst="false"
      >
        <div class="ol-styled-tooltip ol-styled-tooltip-measure">
          {{ tooltipTextHistory[tooltipCoordIndex] }}
        </div>
      </ol-overlay>
      <ol-overlay
        v-if="tooltipCoord"
        :position="tooltipCoord"
        :offset="[0, -15]"
        positioning="bottom-center"
        :stopEvent="false"
        :insertFirst="false"
      >
        <div class="ol-styled-tooltip ol-styled-tooltip-measure">
          {{ tooltipText }}
        </div>
      </ol-overlay>

      <ol-overlay
        v-if="helpTooltipCoord"
        :position="helpTooltipCoord"
        :offset="[0, 15]"
        positioning="top-center"
      >
        <div class="ol-styled-tooltip ol-styled-tooltip-info">
          {{ helpTooltipText }}
        </div>
      </ol-overlay>

      <ol-vector-layer>
        <ol-source-vector>
          <ol-interaction-draw
            :type="drawType"
            @drawend="drawend"
            @drawstart="drawstart"
          />
        </ol-source-vector>

        <ol-style>
          <ol-style-stroke color="#ffcc33" :width="2" />
          <ol-style-fill color="rgba(255, 255, 255, 0.5)" />
          <ol-style-circle :radius="7">
            <ol-style-fill color="#ffcc33" />
          </ol-style-circle>
        </ol-style>
      </ol-vector-layer>
    </template>
  </div>
</template>

<script setup lang="ts">
import { inject, ref, onUnmounted, watch } from 'vue'
import type Map from 'ol/Map'
import type { Feature, MapBrowserEvent } from 'ol'
import { Polygon } from 'ol/geom'
import type { DrawEvent } from 'ol/interaction/Draw'
import type { EventsKey } from 'ol/events'
import type { Coordinate } from 'ol/coordinate'
import { getArea } from 'ol/sphere'
import { unByKey } from 'ol/Observable'
import { getCenter } from 'ol/extent'
import useControl from '@/composables/useControl'

// 使用组合函数
const { controlState } = useControl()

// 定义事件发射器
const emit = defineEmits(['click', 'measure-start', 'measure-end'])

// 从父组件注入地图实例
const map = inject<Map>('map')
const drawType = ref('Polygon')
const sketch = ref<Feature | null>(null)

const tooltipCoord = ref<Coordinate | null>(null)
const tooltipCoordHistory = ref<Coordinate[]>([])
const tooltipText = ref('')
const tooltipTextHistory = ref<string[]>([])
const helpTooltipCoord = ref<Coordinate | null>(null)
const helpTooltipText = ref('')

let geomChangeListener: EventsKey
let pointerMoveListener: EventsKey
const continuePolygonMsg = '点击继续绘制多边形'

function drawstart(evt: DrawEvent) {
  if (map) {
    sketch.value = evt.feature
    const geom = sketch.value.getGeometry()
    if (geom instanceof Polygon) {
      // 获取多边形的中心点作为tooltip位置
      const extent = geom.getExtent()
      if (extent && extent.length) {
        tooltipCoord.value = getCenter(extent)
      }

      geomChangeListener = geom.on('change', function (evt) {
        const geom = evt.target
        if (geom instanceof Polygon) {
          tooltipText.value = formatArea(geom)
          // 更新多边形中心点位置
          const extent = geom.getExtent()
          tooltipCoord.value = getCenter(extent)
        }
      })
    }
  }
}

function drawend() {
  // remove drawn sketch
  sketch.value = null
  // unset tooltip so that a new one can be created
  tooltipCoordHistory.value.push(tooltipCoord.value as number[])
  tooltipCoord.value = null
  tooltipTextHistory.value.push(tooltipText.value + '')
  tooltipText.value = ''
  // cleanup listeners
  unByKey(geomChangeListener)
}

function showHelpInfoOnPointermove(evt: MapBrowserEvent<any>) {
  if (evt.dragging) {
    return
  }
  let helpMsg = '点击开始绘制'
  const geom = sketch.value?.getGeometry()
  if (geom instanceof Polygon) {
    helpMsg = continuePolygonMsg
  }

  helpTooltipText.value = helpMsg
  helpTooltipCoord.value = evt.coordinate
}

function formatArea(polygon: Polygon) {
  const code = map?.getView().getProjection().getCode()
  const area = getArea(polygon, {
    projection: code
  })
  let output = ''
  if (area > 10000) {
    output = Math.round((area / 1000000) * 100) / 100 + ' ' + 'km²'
  } else {
    output = Math.round(area * 100) / 100 + ' ' + 'm²'
  }
  return output
}

const handleClick = (event: unknown) => {
  // 发射点击事件
  emit('click', event)

  if (map) {
    if (!controlState.value.measureAreaActive) {
      startMeasuring()
    } else {
      stopMeasuring()
    }
  } else {
    console.warn('地图实例未找到')
  }
}

/**
 * @description: 清理测量数据
 */
const clearMeasuring = () => {
  tooltipCoordHistory.value = []
  tooltipTextHistory.value = []
  unByKey(pointerMoveListener)
}

/**
 * @description: 开始测量
 */
const startMeasuring = () => {
  controlState.value.measureAreaActive = true
  if (map) {
    pointerMoveListener = map!.on(
      'pointermove' as any,
      showHelpInfoOnPointermove as any
    )
  }
  emit('measure-start')
}

/**
 * @description: 停止测量
 */
const stopMeasuring = () => {
  controlState.value.measureAreaActive = false
}

watch(
  () => controlState.value.measureAreaActive,
  active => {
    if (active) {
      controlState.value.measureLengthActive = false
    } else {
      clearMeasuring()
    }
  }
)

// 组件卸载时清理资源
onUnmounted(() => {})

// 暴露给外部的属性和方法
defineExpose({
  startMeasuring,
  stopMeasuring
})
</script>

<style scoped>
.measure-area-control.active {
  background-color: var(--styled-control-item-active-bg-color, #eeeeee);
}
</style>

<style>
.ol-styled-tooltip {
  position: relative;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 4px;
  color: white;
  padding: 4px 8px;
  opacity: 0.7;
  white-space: nowrap;
  font-size: 12px;
  cursor: default;
  user-select: none;
}

.ol-styled-tooltip-measure {
  font-weight: bold;
}

.ol-styled-tooltip-info {
  background-color: #ffcc33;
  color: black;
  border: 1px solid white;
}

.ol-styled-tooltip-measure:before {
  border-top: 6px solid rgba(0, 0, 0, 0.5);
  border-right: 6px solid transparent;
  border-left: 6px solid transparent;
  content: '';
  position: absolute;
  bottom: -6px;
  margin-left: -7px;
  left: 50%;
}
</style>
