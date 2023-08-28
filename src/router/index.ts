import { createRouter, createWebHashHistory } from 'vue-router'
const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Login/index.vue')
    },
    {
      path: '/',
      name: '',
      component: () => import('../views/Layout/index.vue'),
      redirect: '/home',
      children: [
        {
          path: 'home',
          name: 'home',
          component: () => import('../views/Home/index.vue')
        },
        {
          path: 'notify',
          name: 'notify',
          component: () => import('../views/Notify/index.vue')
        },
        {
          path: 'article',
          name: 'article',
          component: () => import('../views/Article/index.vue')
        },
        {
          path: 'user',
          name: 'user',
          component: () => import('../views/User/index.vue')
        }
      ]
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/Register/index.vue')
    }
  ]
})

export default router
