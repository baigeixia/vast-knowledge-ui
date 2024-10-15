import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/home/index.vue'
import Layout from '../Layout/index.vue'
import NProgress from 'nprogress'
import { getToken } from '@/utils/auth'
import useUserStore from '@/stores/admin/user'


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
          path: '/footmark',
          name: 'footmark',
          component: () => import('../views/footmark/UserFootmark.vue')
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
              path: 'digg',
              name: 'digg',
              component: () => import('../views/notifications/components/Digg.vue'),
            },
            {
              path: 'follow',
              name: 'follow',
              component: () => import('../views/notifications/components/Follow.vue'),
            },
            {
              path: 'im/:userid?',
              name: 'im',
              component: () => import('../views/notifications/components/Im.vue'),
              props: route => ({
                participantId: route.params.userid
              }),
            },
            {
              path: 'system',
              name: 'system',
              component: () => import('../views/notifications/components/System.vue'),
            },
          ]
        },
        {
          path: '/user/:userid',
          name: 'user',
          component: () => import('../views/user/UserHome.vue'),
          props: route => ({
            userid: route.params.userid
          }),
          children: [
            {
              path: '',
              name: 'user-pins',
              component: () => import('../views/user/components/UserPins.vue'),
              props: route => ({
                userid: route.params.userid 
              })
            },
            {
              path: 'posts',
              name: 'posts',
              component: () => import('../views/user/components/UserPosts.vue'),
              props: route => ({
                userid: route.params.userid || ''
              })
            },
            {
              path: 'columns',
              name: 'columns',
              component: () => import('../views/user/components/UserColumns.vue'),
              props: route => ({
                userid: route.params.userid || ''
              })
            },
            {
              path: 'collections',
              name: 'collections',
              component: () => import('../views/user/components/UserCollections.vue'),
              props: route => ({
                userid: route.params.userid || ''
              })
            },
            {
              path: 'following',
              name: 'following',
              component: () => import('../views/user/components/UserFollowing.vue'),
              props: route => ({
                userid: route.params.userid || ''
              })
            },
            {
              path: 'followers',
              name: 'followers',
              component: () => import('../views/user/components/UserFollowers.vue'),
              props: route => ({
                userid: route.params.userid || ''
              }),
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
          props: route => ({
            postId: route.params.postId,
            notificationId: route.query.notificationId
          })
        },
        {
          path: '/search',
          name: 'search',
          component: () => import('../views/search/PostSearch.vue'),
          props: route => ({
            query: route.query.query,
            fromSeo: route.query.fromSeo,
            fromHistory: route.query.fromHistory,
            fromSuggest: route.query.fromSuggest,
            type: route.query.type
          }),
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
  ],
  scrollBehavior(to, from, savedPosition) {
    // console.log("savedPosition");
    // console.log(to);
    // console.log(from);
    // console.log(savedPosition);
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  },
})


export default router
