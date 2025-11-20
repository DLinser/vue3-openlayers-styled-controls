<template>
  <div
    :title="
      controlState.measureLengthActive
        ? t('measureLength.stop')
        : t('measureLength.title')
    "
    :class="[
      'ol-styled-control-item',
      'measure-control',
      { active: controlState.measureLengthActive }
    ]"
    @click="handleClick"
  >
    <template v-if="controlState.measureLengthActive">
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
          <ol-style-fill color="rgba(255, 255, 255, 0.2)" />
          <ol-style-circle :radius="7">
            <ol-style-fill color="#ffcc33" />
          </ol-style-circle>
        </ol-style>
      </ol-vector-layer>
    </template>
    <slot>
      <svg
        class="measure-icon"
        viewBox="0 0 1024 1024"
        width="20"
        height="20"
        fill="currentColor"
      >
        <path
          d="M348.1633588 981.73103474l633.56767594-633.56767594-305.89439354-305.89439354L42.26896526 675.8366412 348.1633588 981.73103474z m-131.09759723-393.29279169L304.46415972 675.8366412c12.09152596 12.09152596 31.60767312 12.09152596 43.69919908 0s12.09152596-31.60767312 0-43.69919908l-87.39839816-87.39839815 65.54879862-65.54879862L413.71215742 566.58864351c12.09152596 12.09152596 31.60767312 12.09152596 43.69919907 0s12.09152596-31.60767312 0-43.69919908l-87.39839815-87.39839815 65.54879861-65.54879862L522.96015511 457.34064581c12.09152596 12.09152596 31.60767312 12.09152596 43.69919908 0 12.09152596-12.09152596 12.09152596-31.60767312 0-43.69919907l-87.39839816-87.39839816 65.54879862-65.54879861L632.2081528 348.09264812c12.09152596 12.09152596 31.60767312 12.09152596 43.69919908 0 12.09152596-12.09152596 12.09152596-31.60767312 0-43.69919908l-87.39839816-87.39839815 87.39839816-87.39839816 218.49599539 218.49599539L348.1633588 894.33263659l-218.49599539-218.49599539 87.39839816-87.39839815z"
        />
      </svg>
    </slot>
  </div>
</template>

<script setup lang="ts">
import { inject, ref, onUnmounted, onMounted, watch } from 'vue'
import type Map from 'ol/Map'
import type { Feature, MapBrowserEvent } from 'ol'
import { LineString } from 'ol/geom'
import type { DrawEvent } from 'ol/interaction/Draw'
import type { EventsKey } from 'ol/events'
import type { Coordinate } from 'ol/coordinate'
import { getLength } from 'ol/sphere'
import { unByKey } from 'ol/Observable'
import useControl from '@/composables/useControl'
import { globalI18n, defaultI18n } from '@/i18n'

// 使用 i18n，优先使用全局配置的 i18n，否则使用默认的
const t = (key: string) => {
  if (globalI18n) {
    return globalI18n.t(key)
  }
  return defaultI18n.t(key)
}

// 定义事件发射器
const emit = defineEmits([
  'click',
  'measure-start',
  'measure-end',
  'geometry-change'
])

// 从父组件注入地图实例
const map = inject<Map>('map')
const drawType = ref('LineString')
const sketch = ref<Feature | null>(null)

// 使用组合函数
const { controlState } = useControl()

const tooltipCoord = ref<Coordinate | null>(null)
const tooltipCoordHistory = ref<Coordinate[]>([])
const tooltipText = ref('')
const tooltipTextHistory = ref<string[]>([])
const helpTooltipCoord = ref<Coordinate | null>(null)
const helpTooltipText = ref('')

let geomChangeListener: EventsKey | null
let pointerMoveListener: EventsKey | null
const continueLineMsg = t('measureLength.continueHelp')

function drawstart(evt: DrawEvent) {
  emit('measure-start', evt)
  if (map) {
    sketch.value = evt.feature
    if (sketch.value.getGeometry()?.getType() == 'LineString') {
      const geom = sketch.value.getGeometry() as LineString
      tooltipCoord.value = geom.getLastCoordinate()
      geomChangeListener = geom.on('change', function (evt) {
        const geom = evt.target
        emit('geometry-change', {
          geom,
          length: formatLength(geom),
          coord: geom.getLastCoordinate()
        })
        tooltipText.value = formatLength(geom)
        tooltipCoord.value = geom.getLastCoordinate()
      })
    }
  }
}

function drawend(evt: DrawEvent) {
  emit('measure-start', evt)
  // remove drawn sketch
  sketch.value = null
  // unset tooltip so that a new one can be created
  tooltipCoordHistory.value.push(tooltipCoord.value as number[])
  tooltipCoord.value = null
  tooltipTextHistory.value.push(tooltipText.value + '')
  tooltipText.value = ''
  // cleanup listeners
  if (geomChangeListener) {
    unByKey(geomChangeListener)
  }
}

function showHelpInfoOnPointermove(evt: MapBrowserEvent<any>) {
  if (evt.dragging) {
    return
  }
  let helpMsg = t('measureLength.startHelp')
  const geom = sketch.value?.getGeometry()
  if (geom instanceof LineString) {
    helpMsg = continueLineMsg
  }

  helpTooltipText.value = helpMsg
  helpTooltipCoord.value = evt.coordinate
}

function formatLength(line: LineString) {
  const code = map?.getView().getProjection().getCode()
  const length = getLength(line, {
    projection: code
  })
  let output = ''
  if (length > 100) {
    output = Math.round((length / 1000) * 100) / 100 + ' ' + 'km'
  } else {
    output = Math.round(length * 100) / 100 + ' ' + 'm'
  }
  return output
}

const handleClick = (event: unknown) => {
  // 发射点击事件
  emit('click', event)

  if (map) {
    if (!controlState.value.measureLengthActive) {
      startMeasuring()
    } else {
      stopMeasuring()
    }
  } else {
    console.warn('地图实例未找到')
  }
}

/**
 * @description: 开始测量
 */
const startMeasuring = () => {
  controlState.value.measureLengthActive = true
  if (map) {
    pointerMoveListener = map!.on(
      'pointermove' as any,
      showHelpInfoOnPointermove as any
    )
  }
}

const clearMeasuring = () => {
  tooltipCoordHistory.value = []
  tooltipTextHistory.value = []
  if (pointerMoveListener) {
    unByKey(pointerMoveListener)
  }
  if (geomChangeListener) {
    unByKey(geomChangeListener)
    geomChangeListener = null
  }
}

/**
 * @description: 停止测量
 */
const stopMeasuring = () => {
  controlState.value.measureLengthActive = false
}

watch(
  () => controlState.value.measureLengthActive,
  newValue => {
    if (newValue) {
      controlState.value.measureAreaActive = false
    } else {
      clearMeasuring()
    }
  }
)

onMounted(() => {})

// 组件卸载时清理资源
onUnmounted(() => {})

// 暴露给外部的属性和方法
defineExpose({
  startMeasuring,
  stopMeasuring
})
</script>

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
