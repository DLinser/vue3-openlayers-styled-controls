<template>
  <ol-map class="map-container">
    <ol-view
      ref="view"
      :center="center"
      :zoom="zoom"
      :projection="projection"
    />

    <!-- OSM图层 -->
    <ol-tile-layer title="OSM">
      <ol-source-osm />
    </ol-tile-layer>

    <!-- 天地图影像图层 -->
    <ol-tile-layer title="天地图影像">
      <ol-source-tianditu
        layerType="img"
        projection="EPSG:4326"
        tk="dbed7e0f96194affd82763e159de4c50"
        :hidpi="true"
      />
    </ol-tile-layer>

    <!-- 天地图矢量图层 -->
    <ol-tile-layer title="天地图矢量">
      <ol-source-tianditu
        layerType="vec"
        projection="EPSG:4326"
        tk="dbed7e0f96194affd82763e159de4c50"
        :hidpi="true"
      />
    </ol-tile-layer>

    <OlStyledControlBar theme="dark">
      <OlStyledZoomInControl />
      <OlStyledZoomOutControl />
      <OlStyledBaseLayerSwitcher />
    </OlStyledControlBar>
  </ol-map>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const center = ref([120, 40])
const projection = ref('EPSG:4326')
const zoom = ref(8)
</script>
