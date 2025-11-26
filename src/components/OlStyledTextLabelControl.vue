<template>
  <div
    :title="t('textLabel.title')"
    :class="[
      'ol-styled-control-item',
      'text-label-control',
      { active: controlState.textLabelActive }
    ]"
    @click="handleClick"
  >
    <slot>
      <svg
        class="text-label-icon"
        viewBox="0 0 24 24"
        width="20"
        height="20"
        fill="currentColor"
      >
        <path d="M5 4v3h5.5v12h3V7H19V4z" />
      </svg>
    </slot>
    <template v-if="controlState.textLabelActive">
      <ol-overlay
        v-if="inputCoord"
        :position="inputCoord"
        :offset="[0, -10]"
        positioning="bottom-center"
        :stopEvent="true"
      >
        <div class="ol-styled-label-input-panel">
          <input
            class="label-input"
            ref="labelInputRef"
            v-model="inputText"
            :placeholder="t('textLabel.inputPrompt')"
          />
          <div class="actions">
            <button class="confirm" @click.stop="confirmLabel">
              {{ t('textLabel.confirm') }}
            </button>
            <button class="cancel" @click.stop="cancelLabel">
              {{ t('textLabel.cancel') }}
            </button>
          </div>
        </div>
      </ol-overlay>
    </template>
    <template
      v-if="
        clearOnClose
          ? controlState.textLabelActive
          : !controlState.clearPlotLayerTag
      "
    >
      <ol-vector-layer>
        <ol-source-vector ref="labelsSourceRef">
          <ol-interaction-draw
            v-if="controlState.textLabelActive"
            :type="'Point'"
            @drawend="onDrawEnd"
          />
        </ol-source-vector>
      </ol-vector-layer>
    </template>
  </div>
</template>

<script setup lang="ts">
import { inject, nextTick, ref, watch } from 'vue'
import type Map from 'ol/Map'
import type { DrawEvent } from 'ol/interaction/Draw'
import { Style, Fill, Stroke, Text } from 'ol/style'
import type { Feature } from 'ol'
import useControl from '@/composables/useControl'
import { globalI18n, defaultI18n } from '@/i18n'
import type VectorSource from 'ol/source/Vector'

// 引用输入框的 DOM 元素
const labelInputRef = ref<HTMLInputElement | null>(null)

const t = (key: string) => {
  if (globalI18n) return globalI18n.t(key)
  return defaultI18n.t(key)
}

interface Props {
  font?: string
  fontSize?: number
  fillColor?: string
  strokeColor?: string
  strokeWidth?: number
  offsetX?: number
  offsetY?: number
  // 是否在关闭控件时清除标绘图层
  clearOnClose?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  font: 'sans-serif',
  fontSize: 12,
  fillColor: '#2f4b59',
  strokeColor: '#ffffff',
  strokeWidth: 2,
  offsetX: 0,
  offsetY: -12,
  clearOnClose: false
})

const emit = defineEmits(['click', 'label-add'])

const map = inject<Map>('map')
const { controlState, closeAllControls } = useControl()
const labelsSourceRef = ref()
const inputCoord = ref<any | null>(null)
const inputText = ref('')
const pendingFeature = ref<Feature | null>(null)

const handleClick = (event: unknown) => {
  emit('click', event)
  if (!map) {
    console.warn('地图实例未找到')
    return
  }
  if (controlState.value.textLabelActive) {
    controlState.value.textLabelActive = false
  } else {
    closeAllControls()
    controlState.value.textLabelActive = true
  }
}

const onDrawEnd = (evt: DrawEvent) => {
  const feature = evt.feature as Feature
  pendingFeature.value = feature
  try {
    const geom: any = feature.getGeometry()
    inputCoord.value = geom?.getCoordinates?.() || null
    nextTick(() => {
      labelInputRef.value?.focus()
    })
  } catch {
    inputCoord.value = null
  }
  inputText.value = ''
}

const confirmLabel = () => {
  const content = inputText.value.trim()
  if (!content || !pendingFeature.value) return
  const style = new Style({
    text: new Text({
      text: content,
      font: `${props.fontSize}px ${props.font}`,
      fill: new Fill({ color: props.fillColor }),
      stroke: new Stroke({
        color: props.strokeColor,
        width: props.strokeWidth
      }),
      offsetX: props.offsetX,
      offsetY: props.offsetY,
      textAlign: 'center'
    })
  })
  pendingFeature.value.setStyle(style)
  emit('label-add', { feature: pendingFeature.value, text: content })
  inputText.value = ''
  inputCoord.value = null
  pendingFeature.value = null
}

const cancelLabel = () => {
  if (pendingFeature.value) {
    try {
      ;(labelsSourceRef.value.source as VectorSource)?.removeFeature?.(
        pendingFeature.value as Feature
      )
    } catch {}
  }
  inputText.value = ''
  inputCoord.value = null
  pendingFeature.value = null
}

watch(
  () => controlState.value.clearPlotLayerTag,
  newValue => {
    if (newValue) {
      // 清除标绘图层
      setTimeout(() => {
        controlState.value.clearPlotLayerTag = false
      }, 100)
    }
  }
)

defineExpose({
  handleClick
})
</script>

<style scoped>
.ol-styled-label-input-panel {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 8px;
  border-radius: 4px;
  background-color: var(
    --styled-control-plot-panel-bg-color,
    rgba(255, 255, 255, 0.9)
  );
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}
.label-input {
  width: 160px;
  height: 24px;
  padding: 0 8px;
  border: 1px solid var(--styled-control-bar-border-color, #ddd);
  border-radius: 4px;
  outline: none;
}
.actions {
  display: inline-flex;
  gap: 6px;
}
.actions .confirm,
.actions .cancel {
  height: 26px;
  padding: 0 10px;
  border: 1px solid var(--styled-control-bar-border-color, #ddd);
  background-color: var(--styled-control-item-bg-color, transparent);
  color: var(--styled-control-text-color, #333);
  border-radius: 4px;
  cursor: pointer;
}
.actions .confirm:hover,
.actions .cancel:hover {
  background-color: var(--styled-control-item-hover-bg-color, #f5f5f5);
}
</style>
