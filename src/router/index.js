import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/home/index.vue'
import Layout from '../Layout/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: '',
      component: Layout,
      children: [
        {
          path: '',
          component: Home,
        },
        {
          path: '/notifications',
          name: 'notifications',
          component: () => import('../views/Notifications/Notification.vue'),
          children: [
            {
              path: '',
              name: 'comment',  
              component: () => import('../views/Notifications/components/Comment.vue'),
            },
            {
              path: '/notifications/digg',
              name: 'digg',
              component: () => import('../views/Notifications/components/Digg.vue'),
            },
            {
              path: '/notifications/follow',
              name: 'follow',
              component: () => import('../views/Notifications/components/Follow.vue'),
            },
            {
              path: '/notifications/im',
              name: 'im',
              component: () => import('../views/Notifications/components/Im.vue'),
            },
            {
              path: '/notifications/system',
              name: 'system',
              component: () => import('../views/Notifications/components/System.vue'),
            },
          ]
        },
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
