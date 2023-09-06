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
    },
    {
      path: '/consult/fast',
      name: 'fast',
      component: () => import('../views/Home/ConsultFast.vue'),
      meta: { title: '极速问诊' }
    },
    {
      path: '/consult/dep',
      name: 'dep',
      component: () => import('../views/Home/ConsultDep.vue'),
      meta: { title: '选择科室' }
    },
    {
      path: '/consult/illness',
      name: 'illness',
      component: () => import('../views/Home/ConsultIllness.vue'),
      meta: { title: '图文问诊' }
    },
    {
      path: '/consult/pay',
      name: 'pay',
      component: () => import('../views/Home/consultPay.vue'),
      meta: { title: '问诊支付' }
    },
    {
      path: '/user/consult',
      name: 'consult',
      component: () => import('../views/User/ConsultPage.vue'),
      meta: { title: '问诊记录' }
    },
    {
      path: '/user/consult/:id',
      name: 'detail',
      component: () => import('../views/User/ConsultDetail.vue'),
      meta: { title: '问诊详情' }
    },
    {
      path: '/room',
      name: 'roonm',
      component: () => import('../views/Room/RoomPage.vue'),
      meta: { title: '问诊室' }
    },
    {
      path: '/order/pay',
      name: 'orderpay',
      component: () => import('../views/Order/OrderPay.vue'),
      meta: { title: '问诊室' }
    },
    {
      path: '/order/pay/result',
      component: () => import('@/views/Order/OrderPayResult.vue'),
      meta: { title: '药品⽀付结果' }
    }
  ]
})

export default router
