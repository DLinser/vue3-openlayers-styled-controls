<template>
  <div
    :title="t('home.title')"
    :class="['ol-styled-control-item', 'home-control']"
    @click="handleClick"
  >
    <slot>
      <!-- simple home icon -->
      <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
      </svg>
    </slot>
  </div>
</template>

<script setup lang="ts">
import { inject, ref, onMounted } from 'vue'
import type Map from 'ol/Map'
import { globalI18n, defaultI18n } from '../i18n'

const t = (key: string) => {
  if (globalI18n) {
    return globalI18n.t(key)
  }
  return defaultI18n.t(key)
}

const props = withDefaults(
  defineProps<{
    extent?: number[] | null
    duration?: number
  }>(),
  {
    duration: 800
  }
)

const emit = defineEmits(['click', 'go-home'])

const map = inject<Map>('map')

const initialExtent = ref<number[] | null>(null)

// Try to record initial extent when the map has a valid size.
// If the map is present but not yet rendered, wait for one 'postrender' to capture a correct extent.
onMounted(() => {
  if (!map) return
  const view = map.getView()
  if (props.extent && props.extent.length === 4) {
    initialExtent.value = props.extent
  } else {
    if (map.getSize()) {
      initialExtent.value = view.calculateExtent()
    } else {
      map.once('postrender', () => {
        try {
          debugger
          const s = map.getSize() as number[] | undefined
          const [w = 0, h = 0] = s ?? [0, 0]
          if (w > 0 && h > 0) {
            initialExtent.value = view.calculateExtent()
          }
        } catch (e) {
          // ignore
        }
      })
    }
  }
})

const handleClick = (event: unknown) => {
  emit('click', event)
  if (!map) {
    console.warn('map instance not found')
    return
  }
  const view = map.getView()
  if (initialExtent.value) {
    debugger
    view.fit(initialExtent.value, {
      duration: props.duration
    })
    emit('go-home', initialExtent.value)
  }
}

defineExpose({
  goHome: handleClick
})
</script>

<style scoped>
.home-control {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
</style>
