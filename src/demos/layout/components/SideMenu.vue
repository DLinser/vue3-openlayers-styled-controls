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
        <span>Control 组件</span>
      </template>
      <el-menu-item index="/demos/control-bar">
        <el-icon><MessageBox /></el-icon>
        <span>工具条</span>
      </el-menu-item>
      <el-menu-item index="/demos/zoom-control">
        <el-icon><ZoomIn /></el-icon>
        <span>缩放控制组件</span>
      </el-menu-item>
      <el-menu-item index="/demos/full-screen-control">
        <el-icon><FullScreen /></el-icon>
        <span>全屏控制组件</span>
      </el-menu-item>
      <el-menu-item index="/demos/measure-control">
        <el-icon><TrendCharts /></el-icon>
        <span>量算组件</span>
      </el-menu-item>
      <el-menu-item index="/demos/themed-controls">
        <el-icon><MagicStick /></el-icon>
        <span>主题化控件</span>
      </el-menu-item>
      <el-menu-item index="/demos/swipe-control">
        <el-icon><CopyDocument /></el-icon>
        <span>卷帘组件</span>
      </el-menu-item>
      <el-menu-item index="/demos/base-layer-switcher">
        <el-icon><Collection /></el-icon>
        <span>底图切换组件</span>
      </el-menu-item>
      <el-menu-item index="/demos/plot-control">
        <el-icon><Edit /></el-icon>
        <span>标绘组件</span>
      </el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import {
  House,
  Location,
  MessageBox,
  ZoomIn,
  FullScreen,
  TrendCharts,
  MagicStick,
  CopyDocument,
  Collection,
  Edit
} from '@element-plus/icons-vue'

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
