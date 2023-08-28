export type User =
  | {
      // 用户Id
      id: string | number
      // token
      token: string
      // 用户名称
      account: string
      // 手机号
      mobile: string
      // 头像
      avatar: string
    }
  | undefined

export type codeType = 'login' | 'register' | 'changeMobile' | 'forgetPassword' | 'bindMobile'

export type code = {
  code: string
}
