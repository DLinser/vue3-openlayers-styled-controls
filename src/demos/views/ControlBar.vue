<template>
  <ol-map class="map-container">
    <ol-view
      ref="view"
      :center="mapConfig.center"
      :zoom="mapConfig.zoom"
      :projection="mapConfig.projection"
    />

    <ol-layer-group title="底图切换" ref="baseLayerGroupRef">
      <!-- OSM图层 -->
      <ol-tile-layer title="OSM" :visible="false">
        <ol-source-osm />
      </ol-tile-layer>

      <ol-layer-group title="天地图影像" :visible="true">
        <!-- 天地图影像图层 -->
        <ol-tile-layer title="天地图影像">
          <ol-source-tianditu
            layerType="img"
            projection="EPSG:4326"
            tk="dbed7e0f96194affd82763e159de4c50"
            :hidpi="true"
          />
        </ol-tile-layer>
        <!-- 天地图影像标注图层 -->
        <ol-tile-layer title="天地图影像标注">
          <ol-source-tianditu
            :isLabel="true"
            layerType="img"
            projection="EPSG:4326"
            tk="dbed7e0f96194affd82763e159de4c50"
            :hidpi="true"
          />
        </ol-tile-layer>
      </ol-layer-group>
      <ol-layer-group title="天地图" :visible="false">
        <!-- 天地图矢量图层 -->
        <ol-tile-layer title="天地图矢量">
          <ol-source-tianditu
            layerType="vec"
            projection="EPSG:4326"
            tk="dbed7e0f96194affd82763e159de4c50"
            :hidpi="true"
          />
        </ol-tile-layer>
        <!-- 天地图矢量标注图层 -->
        <ol-tile-layer title="天地图矢量标注">
          <ol-source-tianditu
            :isLabel="true"
            layerType="vec"
            projection="EPSG:4326"
            tk="dbed7e0f96194affd82763e159de4c50"
            :hidpi="true"
          />
        </ol-tile-layer>
      </ol-layer-group>
    </ol-layer-group>
    <OlStyledControlBar>
      <ol-styled-home-control />
      <ol-styled-zoom-in-control />
      <ol-styled-zoom-out-control />
      <ol-styled-measure-length-control />
      <ol-styled-measure-area-control />
      <ol-styled-plot-control />
      <ol-styled-export-map-control />
      <ol-styled-clear-control />
      <ol-styled-base-layer-switcher :layer-group="baseLayerGroup" />
    </OlStyledControlBar>
  </ol-map>
</template>
<script lang="ts" setup>
import { computed, ref } from 'vue'
import { mapConfig } from '../config/config.ts'
const baseLayerGroupRef = ref<any>(null)
const baseLayerGroup = computed(() => {
  return baseLayerGroupRef.value?.layerGroup
})
</script>
