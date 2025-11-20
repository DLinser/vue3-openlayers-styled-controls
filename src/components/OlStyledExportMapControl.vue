<template>
  <div
    :title="t('exportMap.title')"
    :class="['ol-styled-control-item', 'export-map-control']"
    @click="handleClick"
  >
    <slot>
      <svg
        class="export-icon"
        viewBox="0 0 24 24"
        width="20"
        height="20"
        fill="currentColor"
      >
        <path d="M5 20h14v-2H5v2zm7-18l-5 5h3v6h4V7h3l-5-5z" />
      </svg>
    </slot>
  </div>
</template>

<script setup lang="ts">
import { inject } from 'vue'
import type Map from 'ol/Map'
import { globalI18n, defaultI18n } from '@/i18n'

const t = (key: string) => {
  if (globalI18n) {
    return globalI18n.t(key)
  }
  return defaultI18n.t(key)
}

interface Props {
  fileName?: string
  type?: 'png' | 'jpeg'
  quality?: number
  background?: string
}

const props = withDefaults(defineProps<Props>(), {
  fileName: 'map',
  type: 'png',
  quality: 0.92,
  background: ''
})

const emit = defineEmits([
  'click',
  'export-start',
  'export-end',
  'export-error'
])

const map = inject<Map>('map')

const handleClick = (event: unknown) => {
  emit('click', event)
  if (map) {
    exportMap()
  } else {
    console.warn('地图实例未找到')
  }
}

const downloadDataURL = (dataURL: string, fileName: string) => {
  const a = document.createElement('a')
  a.href = dataURL
  a.download = fileName
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
}

const exportMap = () => {
  if (!map) return
  emit('export-start')
  map.once('rendercomplete', () => {
    try {
      const size = map.getSize()
      if (!size) throw new Error('地图尺寸不可用')
      const target = map.getTargetElement()
      const canvases = (target?.querySelectorAll('.ol-layer canvas, canvas') ||
        []) as unknown as HTMLCanvasElement[]
      const mapCanvas = document.createElement('canvas')
      mapCanvas.width = size[0]!
      mapCanvas.height = size[1]!
      const context = mapCanvas.getContext('2d')
      if (!context) throw new Error('无法创建画布上下文')
      if (props.background) {
        context.fillStyle = props.background
        context.fillRect(0, 0, mapCanvas.width, mapCanvas.height)
      }
      canvases.forEach(canvas => {
        if (canvas.width > 0) {
          const opacity = (canvas.parentElement as HTMLElement)?.style?.opacity
          context.globalAlpha = opacity === '' ? 1 : Number(opacity)
          const transform = canvas.style.transform || ''
          const matrixMatch = transform.match(/^matrix\(([^\)]*)\)$/)
          if (matrixMatch) {
            const values = matrixMatch[1]?.split(',').map(v => Number(v.trim()))
            if (values) {
              context.setTransform(
                values[0] as number,
                values[1] as number,
                values[2] as number,
                values[3] as number,
                values[4] as number,
                values[5] as number
              )
            }
          } else {
            context.setTransform(1, 0, 0, 1, 0, 0)
          }
          context.drawImage(canvas, 0, 0)
        }
      })
      context.globalAlpha = 1
      context.setTransform(1, 0, 0, 1, 0, 0)
      const mime = props.type === 'jpeg' ? 'image/jpeg' : 'image/png'
      const dataURL = mapCanvas.toDataURL(
        mime,
        props.type === 'jpeg' ? props.quality : undefined
      )
      const ext = props.type === 'jpeg' ? 'jpg' : 'png'
      downloadDataURL(dataURL, `${props.fileName}.${ext}`)
      emit('export-end', dataURL)
    } catch (e) {
      emit('export-error', e)
    }
  })
  map.renderSync()
}

defineExpose({ exportMap })
</script>

<style scoped></style>
