import { createRouter, createWebHashHistory } from 'vue-router'
import { useCounterStore } from '@/stores/user'
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
          component: () => import('../views/Home/index.vue'),
          meta: { title: '首页' }
        },
        {
          path: 'notify',
          name: 'notify',
          component: () => import('../views/Notify/index.vue'),
          meta: { title: '消息中心' }
        },
        {
          path: 'article',
          name: 'article',
          component: () => import('../views/Article/index.vue'),
          meta: { title: '消息百科' }
        },
        {
          path: 'user',
          name: 'user',
          component: () => import('../views/User/index.vue'),
          meta: { title: '个人中心' }
        }
      ]
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/Register/index.vue')
    },
    {
      path: '/user/patient',
      name: 'patient',
      component: () => import('../views/User/PatientPage.vue'),
      meta: { title: '家庭档案' }
    }
  ]
})

export default router
