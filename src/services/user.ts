import type { User, userInfo } from '@/types/user'
import type { codeType, code, patientInfo } from '@/types/user'
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

// 获取用户信息
export const getUserInfo = () => request<userInfo>('/patient/myUser', 'GET')

// 获取家庭档案
export const getPatientInfo = () => request<patientInfo[]>('/patient/mylist', 'GET')
