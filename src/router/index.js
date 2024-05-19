import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/move',
    component: ()=>import('@/views/move.vue'),
    children: [
      {
        path:'/move/nowplaying',
        component: ()=>import('@/views/move/nowplaying.vue')
      },
      {
        path: '/move/willplaying',
        component: ()=>import('@/views/move/willplaying.vue')
      }
    ]
  },
  {
    path: '/cinema',
    component: ()=>import('@/views/cinema.vue')
  },
  {
    path: '/information',
    component: ()=>import('@/views/information.vue')
  },
  {
    path: '/center',
    component: ()=>import('@/views/center.vue')
  },
  {
    path: '/detail/:id',
    component: ()=>import('@/views/detail.vue')
  },
  {
    path: '/city',
    component: ()=>import('@/views/cityChange.vue')
  },
  {
    path:'/cinema/search',
    component: ()=>import('@/views/cinemasSearch.vue')
  },
  {
    path:'/login',
    component: ()=>import('@/views/login.vue')
  },
  // 重定向
  {
    path: '*',
    redirect: '/move/nowplaying'
  }
]
const router = new VueRouter({
  routes
})

export default router
