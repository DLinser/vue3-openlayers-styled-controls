<template>
  <div class="themed-controls-demo">
    <h2>主题化控件演示</h2>
    <div class="theme-selector">
      <label>选择主题:</label>
      <select v-model="selectedTheme" @change="applyTheme">
        <option value="default">默认主题</option>
        <option value="dark">深色主题</option>
        <option value="blue">蓝色主题</option>
      </select>
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
        <OlStyledZoomInControl :theme="selectedTheme" />
        <OlStyledZoomOutControl :theme="selectedTheme" />
      </OlStyledControlBar>

      <OlStyledControlBar :theme="selectedTheme" position="top-right">
        <OlStyledZoomInControl :theme="selectedTheme" />
        <OlStyledZoomOutControl :theme="selectedTheme" />
      </OlStyledControlBar>

      <OlStyledControlBar :theme="selectedTheme" position="bottom-left">
        <OlStyledZoomInControl :theme="selectedTheme" />
        <OlStyledZoomOutControl :theme="selectedTheme" />
      </OlStyledControlBar>

      <OlStyledControlBar :theme="selectedTheme" position="bottom-right">
        <OlStyledZoomInControl :theme="selectedTheme" />
        <OlStyledZoomOutControl :theme="selectedTheme" />
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

const applyTheme = () => {
  // 可以在这里添加额外的主题应用逻辑
  console.log('应用主题:', selectedTheme.value)
}
</script>

<style scoped>
.themed-controls-demo {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.theme-selector {
  padding: 10px;
  background-color: var(--control-bg-color);
  border: 1px solid var(--control-border-color);
  margin: 10px;
  border-radius: 4px;
}

.theme-selector label {
  margin-right: 10px;
  color: var(--control-text-color);
}

.map-conterner {
  flex: 1;
}
</style>
