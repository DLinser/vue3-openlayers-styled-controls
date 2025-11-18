<template>
  <ol-map
    ref="mapRef"
    class="map-container"
    :load-tiles-while-animating="true"
    :load-tiles-while-interacting="true"
    @mounted="onMapMounted"
  >
    <ol-view
      ref="viewRef"
      :center="mapConfig.center"
      :zoom="mapConfig.zoom"
      :projection="mapConfig.projection"
    />
    <base-layer />
    <ol-tile-layer>
      <ol-source-osm />
    </ol-tile-layer>
    <ol-styled-control-bar>
      <ol-styled-zoom-in-control />
      <ol-styled-zoom-out-control />
      <ol-styled-plot-control />
    </ol-styled-control-bar>
  </ol-map>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type Map from 'ol/Map'
import BaseLayer from '../components/base-layer.vue'
import { mapConfig } from '../config/config.ts'

const mapRef = ref<any>(null)
const viewRef = ref<any>(null)

const onMapMounted = (map: Map) => {
  console.log('Map mounted:', map)
}
</script>

<style scoped lang="scss"></style>
