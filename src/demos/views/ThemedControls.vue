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
        :center="mapConfig.center"
        :zoom="mapConfig.zoom"
        :projection="mapConfig.projection"
      />

      <base-layer />

      <!-- 不同主题的控件条示例 -->
      <OlStyledControlBar :theme="selectedTheme" position="top-left">
        <ol-styled-home-control />
        <ol-styled-zoom-in-control />
        <ol-styled-zoom-out-control />
        <ol-styled-measure-length-control />
        <ol-styled-measure-area-control />
        <ol-styled-plot-control />
        <ol-styled-export-map-control />
        <ol-styled-clear-control />
      </OlStyledControlBar>

      <OlStyledControlBar :theme="selectedTheme" position="top-right">
        <ol-styled-home-control />
        <ol-styled-zoom-in-control />
        <ol-styled-zoom-out-control />
        <ol-styled-measure-length-control />
        <ol-styled-measure-area-control />
        <ol-styled-plot-control />
        <ol-styled-export-map-control />
        <ol-styled-clear-control />
      </OlStyledControlBar>

      <OlStyledControlBar :theme="selectedTheme" position="bottom-left">
        <ol-styled-home-control />
        <ol-styled-zoom-in-control />
        <ol-styled-zoom-out-control />
        <ol-styled-measure-length-control />
        <ol-styled-measure-area-control />
        <ol-styled-plot-control />
        <ol-styled-export-map-control />
        <ol-styled-clear-control />
      </OlStyledControlBar>

      <OlStyledControlBar :theme="selectedTheme" position="bottom-right">
        <ol-styled-home-control />
        <ol-styled-zoom-in-control />
        <ol-styled-zoom-out-control />
        <ol-styled-measure-length-control />
        <ol-styled-measure-area-control />
        <ol-styled-plot-control />
        <ol-styled-export-map-control />
        <ol-styled-clear-control />
      </OlStyledControlBar>
    </ol-map>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import BaseLayer from '../components/base-layer.vue'
import { mapConfig } from '../config/config.ts'
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
