<template>
  <div class="openlayers-tools-container">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>OpenLayers 地图工具组件</span>
        </div>
      </template>

      <div class="tools-demo">
        <el-row :gutter="20">
          <el-col :span="12">
            <h4>缩放控制组件</h4>
            <div class="tool-buttons">
              <ZoomInControl />
              <ZoomOutControl />
            </div>
          </el-col>
          <el-col :span="12">
            <h4>组件说明</h4>
            <p>
              这些是基于 vue3-openlayers
              的扩展控制组件，可以轻松集成到你的地图应用中。
            </p>
          </el-col>
        </el-row>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import ZoomInControl from '../../components/OlStyledZoomInControl.vue'
import ZoomOutControl from '../../components/OlStyledZoomOutControl.vue'
</script>

<style scoped>
.openlayers-tools-container {
  padding: 20px;
}

.card-header {
  font-size: 18px;
  font-weight: bold;
}

.tools-demo {
  padding: 20px 0;
}

.tool-buttons {
  display: flex;
  gap: 10px;
  margin-top: 10px;
}

h4 {
  margin-bottom: 15px;
  color: #303133;
}
</style>
