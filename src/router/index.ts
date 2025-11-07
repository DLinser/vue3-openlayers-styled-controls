import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

// 定义路由
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/demos'
  },
  {
    path: '/demos',
    component: () => import('../demos/layout/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('../demos/views/Home.vue')
      },
      {
        path: 'openlayers-tools',
        name: 'openlayers-tools',
        component: () => import('../demos/views/OpenLayersTools.vue')
      },
      {
        path: 'zoom-control',
        name: 'zoom-control',
        component: () => import('../demos/views/ZoomControl.vue')
      }
    ]
  }
]

// 创建路由实例
const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
