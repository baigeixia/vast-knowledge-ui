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
          component: () => import('../views/notifications/Notification.vue'),
          children: [
            {
              path: '',
              name: 'comment',
              component: () => import('../views/notifications/components/Comment.vue'),
            },
            {
              path: '/notifications/digg',
              name: 'digg',
              component: () => import('../views/notifications/components/Digg.vue'),
            },
            {
              path: '/notifications/follow',
              name: 'follow',
              component: () => import('../views/notifications/components/Follow.vue'),
            },
            {
              path: '/notifications/im',
              name: 'im',
              component: () => import('../views/notifications/components/Im.vue'),
            },
            {
              path: '/notifications/system',
              name: 'system',
              component: () => import('../views/notifications/components/System.vue'),
            },
          ]
        },
        {
          path: '/user',
          name: 'user',
          component: () => import('../views/user/UserHome.vue'),
          redirect: '/user/pins',
          children: [
            {
              path: 'pins',
              name: 'pins',
              component: () => import('../views/user/components/UserPins.vue'),
            },
            {
              path: 'posts',
              name: 'posts',
              component: () => import('../views/user/components/UserPosts.vue'),
            },
            {
              path: 'columns',
              name: 'columns',
              component: () => import('../views/user/components/UserColumns.vue'),
            },
            {
              path: 'collections',
              name: 'collections',
              component: () => import('../views/user/components/UserCollections.vue'),
            },
            {
              path: 'tags',
              name: 'tags',
              component: () => import('../views/user/components/UserTags.vue'),
            },

          ]
        },
        {
          path: '/user/settings',
          name: 'settings',
          component: () => import('../views/usersettings/UserProfile.vue'),
          redirect: '/user/settings/personal',
          children: [
            {
              path: 'personal',
              name: 'personal',
              component: () => import('../views/usersettings/components/UserPersonal.vue'),
            }, {
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
            }
          ]
        }, 
        {
          path: '/post/:postId',
          name: 'post',
          component: () => import('../views/post/PostHome.vue'),
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/login/Login.vue')
    },
    {
      path: "/:pathMatch(.*)*",
      component: () => import('../views/error/404.vue'),
      hidden: true
    },
    {
      path: '/401',
      component: () => import('../views/error/401.vue'),
      hidden: true
    }
  ]
})

export default router
