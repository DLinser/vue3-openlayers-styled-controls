<template>
  <div class="home-container">
    <el-row :gutter="20">
      <el-col :span="24">
        <el-card class="welcome-card">
          <template #header>
            <div class="card-header">
              <span>欢迎使用 Vue3-OpenLayers 扩展组件库</span>
            </div>
          </template>
          <div class="welcome-content">
            <p>
              这是一个基于 Vue3 和 OpenLayers
              的扩展组件库，提供了丰富的地图控制组件。
            </p>
            <p>请从左侧菜单选择要查看的组件演示。</p>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="20" style="margin-top: 20px">
      <el-col :span="12">
        <el-card>
          <template #header>
            <span>组件特性</span>
          </template>
          <ul>
            <li>基于 Vue 3 Composition API</li>
            <li>集成 Element Plus UI 组件</li>
            <li>支持 TypeScript</li>
            <li>易于扩展和自定义</li>
          </ul>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card>
          <template #header>
            <span>技术栈</span>
          </template>
          <ul>
            <li>Vue 3.5+</li>
            <li>OpenLayers 10+</li>
            <li>vue3-openlayers 11+</li>
            <li>Element Plus</li>
          </ul>
        </el-card>
      </el-col>
    </el-row>

    <button class="test-sass-btn">测试 Sass 样式</button>
  </div>
</template>

<script setup lang="ts">
// 首页组件
</script>

<style scoped lang="scss">
.home-container {
  padding: 20px;
}

.welcome-card {
  margin-bottom: 20px;
}

.card-header {
  font-size: 18px;
  font-weight: bold;
}

.welcome-content p {
  line-height: 1.6;
  color: #606266;
}

.test-sass-btn {
  margin-top: 20px;
}
</style>
