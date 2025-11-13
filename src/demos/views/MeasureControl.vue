<template>
  <ol-map class="map-container">
    <ol-view
      ref="view"
      :center="mapConfig.center"
      :zoom="mapConfig.zoom"
      :projection="mapConfig.projection"
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
import BaseLayer from '../components/base-layer.vue'
import { mapConfig } from '../config/config.ts'
</script>
