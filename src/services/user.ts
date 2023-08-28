import type { User } from '@/types/user'
import type { codeType, code } from '@/types/user'
import request from '@/utils/request'

// 密码登录
export const loginByPassword = (mobile: string, password: string) =>
  request<User>('/login/password', 'POST', { mobile, password })

// 发送验证码
export const sendCodeApi = (mobile: string, type: codeType) =>
  request<code>('/code', 'GET', { mobile, type })

// 验证码登录
export const loginByCode = (mobile: string, code: string) =>
  request<User>('/login', 'POST', { mobile, code })
