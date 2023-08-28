export type User = {
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

export type codeType = 'login' | 'register' | 'changeMobile' | 'forgetPassword' | 'bindMobile'

export type code = {
  code: string
}

type OmitUser = Omit<User, 'token'>

type Info = {
  likeNumber: number
  collectionNumber: number
  score: number
  couponNumber: number
  orderInfo: {
    paidNumber: number
    receivedNumber: number
    shippedNumber: number
    finishedNumber: number
  }
}

export type userInfo = OmitUser & Info

export type patientInfo = {
  age: number
  defaultFlag: number
  gender: number
  genderValue: string
  id: string
  idCard: string
  name: string
}
