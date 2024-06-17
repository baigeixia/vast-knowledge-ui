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
        {
          path: '/user',
          name: 'user',
          component: () => import('../views/user/UserHome.vue'),
          children: [
            {
              path: '/user/columns',
              name: 'columns',
              component: () => import('../views/user/components/UserColumns.vue'),
            },
            {
              path: '/user/posts',
              name: 'posts',
              component: () => import('../views/user/components/UserPosts.vue'),
            },
            {
              path: '/user/pins',
              name: 'pins',
              component: () => import('../views/user/components/UserPins.vue'),
            },
            {
              path: '/user/collections',
              name: 'collections',
              component: () => import('../views/user/components/UserCollections.vue'),
            },
            {
              path: '/user/tags',
              name: 'tags',
              component: () => import('../views/user/components/UserTags.vue'),
            },
            
          ]
        },{
          path: '/user/settings',
          name: 'settings',
          component: () => import('../views/usersettings/UserProfile.vue'),
          redirect: '/user/settings/personal',
          children: [
            {
              path: 'personal',
              name: 'personal',
              component: () => import('../views/usersettings/components/UserPersonal.vue'),
            },{
              path: 'account',
              name: 'account',
              component: () => import('../views/usersettings/components/UserAccount.vue'),
            },
            {
              path: 'common',
              name: 'common',
              component: () => import('../views/usersettings/components/UserCommon.vue'),
            },
            {
              path: 'message',
              name: 'message',
              component: () => import('../views/usersettings/components/UserMessage.vue'),
            }, {
              path: 'block',
              name: 'block',
              component: () => import('../views/usersettings/components/UserBlock.vue'),
            },
          ]
        }
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
