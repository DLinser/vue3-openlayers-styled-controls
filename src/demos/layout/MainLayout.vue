<template>
  <el-container class="main-layout">
    <el-aside width="250px" class="layout-sidebar">
      <el-scrollbar>
        <div class="logo">
          <h2>Vue3-OL Controls</h2>
        </div>
        <SideMenu />
      </el-scrollbar>
    </el-aside>

    <el-container>
      <el-header class="layout-header">
        <div class="header-content">
          <h3>{{ $route.meta.title || 'OpenLayers 扩展组件库' }}</h3>
        </div>
      </el-header>

      <el-main class="layout-main">
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import SideMenu from './components/SideMenu.vue'
</script>

<style scoped>
.main-layout {
  height: 100vh;
}

.layout-sidebar {
  background-color: #304156;
  color: #fff;
}

.logo {
  padding: 20px;
  text-align: center;
  border-bottom: 1px solid #434a50;
}

.logo h2 {
  margin: 0;
  font-size: 18px;
  color: #fff;
}

.layout-header {
  background-color: #fff;
  border-bottom: 1px solid #e4e7ed;
  display: flex;
  align-items: center;
  padding: 0 20px;
}

.header-content h3 {
  margin: 0;
  color: #303133;
  font-size: 16px;
}

.layout-main {
  background-color: #f5f7fa;
  padding: 0px;
}
</style>
