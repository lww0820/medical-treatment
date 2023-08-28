const mobileRules = [
  { required: true, message: '请填写手机号' },
  { pattern: /^1[3-9]\d{9}$/, message: '手机号格式错误' }
]
const passwordRules = [
  { required: true, message: '请填写密码' },
  { pattern: /^\w{8,24}$/, message: '密码需8-24个字符' }
]
const codeRules = [
  { required: true, message: '请填写验证码' },
  { pattern: /^\d{6}$/, message: '验证码为6为数字' }
]
export { mobileRules, passwordRules, codeRules }
