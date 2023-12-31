import router from '@/router/index'
import { useCounterStore } from './stores/user'
import Nprogress from 'nprogress'
import 'nprogress/nprogress.css' // 导入样式，否则看不到效果
// 路由守卫
// return '/login' 跳转指定地址
// 不返回，或者 return true 就是放⾏
// 可以不是 next 函数了
router.beforeEach((to) => {
  // 开启进度条
  Nprogress.start()
  // 关闭右上角螺旋提示
  Nprogress.configure({ showSpinner: false })

  // 用户仓库
  const store = useCounterStore()
  // 白名单 不需要访问直接可以进入的页面
  const whiteList = ['/login', '/register']
  // 判断用户仓库是否有token 并且要进入的页面是否在白名单中  没有token并不在白名单中 直接跳转至login页
  if (!store.user?.token && !whiteList.includes(to.path)) return '/login'
})

router.afterEach((to) => {
  // 处理标题
  document.title = `优医问诊-${to.meta.title || ''}`
  Nprogress.done()
})
