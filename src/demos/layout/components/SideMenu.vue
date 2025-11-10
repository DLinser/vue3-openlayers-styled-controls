<template>
  <el-menu
    :default-active="activeMenu"
    class="side-menu"
    background-color="#304156"
    text-color="#bfcbd9"
    active-text-color="#409EFF"
    router
  >
    <el-menu-item index="/demos">
      <el-icon><House /></el-icon>
      <span>首页</span>
    </el-menu-item>

    <el-sub-menu index="openlayers">
      <template #title>
        <el-icon><Location /></el-icon>
        <span>OpenLayers 组件</span>
      </template>
      <el-menu-item index="/demos/openlayers-tools">
        <el-icon><Tools /></el-icon>
        <span>地图工具</span>
      </el-menu-item>
      <el-menu-item index="/demos/zoom-control">
        <el-icon><Tools /></el-icon>
        <span>缩放控制组件</span>
      </el-menu-item>
      <el-menu-item index="/demos/full-screen-control">
        <el-icon><MagicStick /></el-icon>
        <span>全屏控制组件</span>
      </el-menu-item>
      <el-menu-item index="/demos/measure-length-control">
        <el-icon><MagicStick /></el-icon>
        <span>距离量算组件</span>
      </el-menu-item>
      <el-menu-item index="/demos/measure-control">
        <el-icon><MagicStick /></el-icon>
        <span>量算组件</span>
      </el-menu-item>
      <el-menu-item index="/demos/themed-controls">
        <el-icon><MagicStick /></el-icon>
        <span>主题化控件</span>
      </el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { House, Location, Tools, MagicStick } from '@element-plus/icons-vue'

const route = useRoute()

const activeMenu = computed(() => {
  return route.path
})
</script>

<style scoped>
.side-menu {
  border-right: none;
  height: calc(100vh - 80px);
}
</style>
