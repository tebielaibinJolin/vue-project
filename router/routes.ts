import { createRouter, createWebHashHistory, type RouteRecordRaw } from 'vue-router'

export const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    component: () => import('@/views/example04/LoginPage.vue')
  },
  {
    path: '/MainPage',
    component: () => import('@/views/MainPage.vue'),
    children: [
      {
        path: '/example01',
        component: () => import('@/views/example01/PersonalView.vue')
      },
      {
        path: '/example02',
        component: () => import('@/views/example02/BookRoomView.vue')
      },
      {
        path: '/example03',
        component: () => import('@/views/example03/CourseView.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})
export default router
