import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { User } from '../types/user'

export const useCounterStore = defineStore(
  'mt-user',
  () => {
    // 用户信息
    const user = ref<User>()

    // 设置用户，登录后使用
    const setUser = (u: User) => {
      user.value = u
    }

    const delUser = () => {
      user.value = undefined
    }
    return { user, setUser, delUser }
  },
  {
    persist: true
  }
)
