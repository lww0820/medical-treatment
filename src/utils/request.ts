import type { InternalAxiosRequestConfig, AxiosResponse } from 'axios'
import axios, { type Method } from 'axios'
import { useCounterStore } from '../stores/user'
import { showToast } from 'vant'
import router from '../router'
import type { Data } from '@/types/requset'

const instance = axios.create({
  baseURL: '/dev-api',
  timeout: 5000
})

instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const store = useCounterStore()
    if (store.user?.token) {
      config.headers.Authorization = 'Bearer ' + store.user?.token
    }
    return config
  },
  (err) => {
    return Promise.reject(err)
  }
)
instance.interceptors.response.use(
  ({ data }: AxiosResponse) => {
    if (data.code !== 10000) {
      showToast(data.message)
      // 错误的业务码返回出去
      return Promise.reject(data.code)
    }
    return data
  },
  (err) => {
    // token过期处理
    if (err.response.status === 401) {
      // 清除本地token和用户信息
      const store = useCounterStore()
      store.delUser()
      // 跳转到登录页
      router.push(`/login?${router.currentRoute.value.fullPath}`)
    }
    return Promise.reject(err)
  }
)

const request = <T>(url: string, method: Method, submitData?: object) => {
  return instance.request<T, Data<T>>({
    url,
    method,
    [method.toLowerCase() === 'get' ? 'params' : 'data']: submitData
  })
}
export default request
