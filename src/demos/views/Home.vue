<template>
  <div class="home-container">
    <el-row :gutter="20">
      <el-col :span="24">
        <el-card class="welcome-card">
          <template #header>
            <div class="card-header">
              <span>Vue3 OpenLayers Styled Controls</span>
            </div>
          </template>
          <div class="welcome-content">
            <p>
              <b>Vue3 OpenLayers Styled Controls</b> 是一套基于 Vue 3 和 OpenLayers 的可定制样式地图控件库，专注于为 Web 地图应用提供美观、响应式、主题化的控制条和工具按钮。
            </p>
            <ul>
              <li>🎨 支持多主题 SCSS 变量，轻松适配不同风格</li>
              <li>🌍 内置国际化（i18n），支持中英文等多语言</li>
              <li>📦 轻量级，专注核心地图控件</li>
              <li>🛠️ TypeScript 全类型支持</li>
              <li>📱 响应式设计，适配移动端</li>
            </ul>
            <p style="margin-top: 8px;">
              <b>支持控件：</b> 控件栏、缩放、全屏、测量、清除、卷帘、底图切换等。
            </p>
            <p style="margin-top: 8px;">
              👉 请从左侧菜单选择要查看的组件演示，或参考 <a href="https://github.com/DLinser/vue3-openlayers-styled-controls" target="_blank">README</a> 获取用法与文档。
            </p>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="20" style="margin-top: 20px">
      <el-col :span="12">
        <el-card>
          <template #header>
            <span>核心特性</span>
          </template>
          <ul>
            <li>基于 Vue 3 Composition API &amp; &lt;script setup&gt; 语法</li>
            <li>可定制主题，支持 SCSS 变量</li>
            <li>内置国际化，支持多语言</li>
            <li>TypeScript 类型安全</li>
            <li>轻量、易扩展</li>
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
            <li>TypeScript / SCSS</li>
          </ul>
        </el-card>
      </el-col>
    </el-row>
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
