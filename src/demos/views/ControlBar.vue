<template>
  <ol-map class="map-container">
    <ol-view
      ref="view"
      :center="center"
      :zoom="zoom"
      :projection="projection"
    />

    <base-layer />
    <OlStyledControlBar>
      <OlStyledZoomInControl />
      <OlStyledZoomOutControl />
      <OlStyledMeasureLengthControl />
      <OlStyledMeasureAreaControl />
      <OlStyledClearControl />
    </OlStyledControlBar>
  </ol-map>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import BaseLayer from '../components/base-layer.vue'
const center = ref([120, 40])
const projection = ref('EPSG:4326')
const zoom = ref(8)
</script>
