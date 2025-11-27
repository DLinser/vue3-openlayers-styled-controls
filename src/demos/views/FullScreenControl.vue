<template>
  <ol-map class="map-container">
    <ol-view
      ref="view"
      :center="mapConfig.center"
      :zoom="mapConfig.zoom"
      :projection="mapConfig.projection"
    />

    <base-layer />
    <ol-styled-control-bar>
      <ol-styled-zoom-in-control />
      <ol-styled-zoom-out-control />
      <OlStyledFullScreenControl />
    </ol-styled-control-bar>
  </ol-map>
</template>
<script lang="ts" setup>
import BaseLayer from '../components/base-layer.vue'
import { mapConfig } from '../config/config.ts'
</script>
