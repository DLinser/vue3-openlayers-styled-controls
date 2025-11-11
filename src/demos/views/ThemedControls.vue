<template>
  <div class="themed-controls-demo">
    <div class="theme-selector">
      <el-select
        v-model="selectedTheme"
        placeholder="请选择主题"
        style="width: 240px"
      >
        <el-option
          v-for="item in themeOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </div>
    <ol-map class="map-conterner">
      <ol-view
        ref="view"
        :center="center"
        :zoom="zoom"
        :projection="projection"
      />

      <base-layer />

      <!-- 不同主题的控件条示例 -->
      <OlStyledControlBar :theme="selectedTheme" position="top-left">
        <OlStyledZoomInControl />
        <OlStyledZoomOutControl />
        <OlStyledMeasureLengthControl />
        <OlStyledMeasureAreaControl />
        <OlStyledClearControl />
      </OlStyledControlBar>

      <OlStyledControlBar :theme="selectedTheme" position="top-right">
        <OlStyledZoomInControl />
        <OlStyledZoomOutControl />
        <OlStyledMeasureLengthControl />
        <OlStyledMeasureAreaControl />
        <OlStyledClearControl />
      </OlStyledControlBar>

      <OlStyledControlBar :theme="selectedTheme" position="bottom-left">
        <OlStyledZoomInControl />
        <OlStyledZoomOutControl />
        <OlStyledMeasureLengthControl />
        <OlStyledMeasureAreaControl />
        <OlStyledClearControl />
      </OlStyledControlBar>

      <OlStyledControlBar :theme="selectedTheme" position="bottom-right">
        <OlStyledZoomInControl />
        <OlStyledZoomOutControl />
        <OlStyledMeasureLengthControl />
        <OlStyledMeasureAreaControl />
        <OlStyledClearControl />
      </OlStyledControlBar>
    </ol-map>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import BaseLayer from '../components/base-layer.vue'

const center = ref([120, 40])
const projection = ref('EPSG:4326')
const zoom = ref(8)
const selectedTheme = ref('default')
const themeOptions = [
  {
    value: 'default',
    label: '默认'
  },
  {
    value: 'dark',
    label: '暗色'
  },
  {
    value: 'ocean',
    label: '蓝色'
  },
  {
    value: 'glassmorphism',
    label: '毛玻璃'
  }
]
</script>

<style scoped lang="scss">
.themed-controls-demo {
  height: 100%;
  position: relative;
}

.theme-selector {
  position: absolute;
  top: 10px;
  left: calc(50% - 120px);
  z-index: 1000;
}

.map-conterner {
  height: 100%;
}
</style>
