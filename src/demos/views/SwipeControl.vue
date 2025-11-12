<template>
  <ol-map class="map-container">
    <ol-view
      ref="view"
      :center="center"
      :zoom="zoom"
      :projection="projection"
    />

    <!-- 底图图层 -->
    <ol-tile-layer ref="osmLayer" title="OSM">
      <ol-source-osm />
    </ol-tile-layer>

    <!-- 天地图影像图层 -->
    <ol-tile-layer ref="tiandituImgLayer" title="天地图影像">
      <ol-source-tianditu
        layerType="img"
        projection="EPSG:4326"
        tk="dbed7e0f96194affd82763e159de4c50"
        :hidpi="true"
      />
    </ol-tile-layer>
    <!-- 天地图影像标注图层 -->
    <ol-tile-layer ref="tiandituImgLabelLayer" title="天地图影像">
      <ol-source-tianditu
        layerType="img"
        :isLabel="true"
        projection="EPSG:4326"
        tk="dbed7e0f96194affd82763e159de4c50"
        :hidpi="true"
      />
    </ol-tile-layer>

    <!-- 天地图矢量图层 -->
    <ol-tile-layer ref="tiandituVecLayer" title="天地图矢量">
      <ol-source-tianditu
        layerType="vec"
        projection="EPSG:4326"
        tk="dbed7e0f96194affd82763e159de4c50"
        :hidpi="true"
      />
    </ol-tile-layer>
    <!-- 天地图矢量标注图层 -->
    <ol-tile-layer ref="tiandituVecLabelLayer" title="天地图矢量">
      <ol-source-tianditu
        layerType="vec"
        :isLabel="true"
        projection="EPSG:4326"
        tk="dbed7e0f96194affd82763e159de4c50"
        :hidpi="true"
      />
    </ol-tile-layer>

    <OlStyledControlBar>
      <OlStyledZoomInControl />
      <OlStyledZoomOutControl />
      <OlStyledSwipeControl
        :left-layers="[
          tiandituImgLayer?.tileLayer,
          tiandituImgLabelLayer?.tileLayer
        ]"
        :right-layers="[
          tiandituVecLayer?.tileLayer,
          tiandituVecLabelLayer?.tileLayer
        ]"
      />
    </OlStyledControlBar>
  </ol-map>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
// import BaseLayer from '../components/base-layer.vue'

const center = ref([120, 40])
const projection = ref('EPSG:4326')
const zoom = ref(8)

// 图层引用
const tiandituImgLayer = ref<{ tileLayer: any } | null>(null)
const tiandituImgLabelLayer = ref<{ tileLayer: any } | null>(null)
const tiandituVecLayer = ref<{ tileLayer: any } | null>(null)
const tiandituVecLabelLayer = ref<{ tileLayer: any } | null>(null)
</script>
