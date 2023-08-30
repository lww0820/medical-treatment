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
  // 患者姓名
  name: string
  // 患者身份证号
  idCard: string
  // 是否设置为默认患者 0不是默认 1是默认患者
  defaultFlag: 0 | 1
  // 性别 1男 0女
  gender: string | number
  // 性别值
  genderValue?: number
  // 年龄
  age?: number
  // id
  id?: string
}
