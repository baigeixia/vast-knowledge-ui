import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/home/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: '',
      component: Home,
      children:[
        
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/login/Login.vue')
    },
    , 
    {
      path: "/:pathMatch(.*)*",
      component: () => import('../views/error/404.vue'),
      hidden: true
    },
    {
      path: '/401',
      component: () => import('../views/error/401.vue'),
      hidden: true
    },
  ]
})

export default router
