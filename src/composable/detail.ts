import { FlagOptions, IllnessTime } from '@/enum'

// 患病时间
export const getIllnessTimeText = (time: number) => {
  const timeOptions = [
    { value: IllnessTime.Week, label: '一周内' },
    { value: IllnessTime.Month, label: '一月内' },
    { value: IllnessTime.HalfYear, label: '半年内' },
    { value: IllnessTime.More, label: '大于半年' }
  ]
  const data = timeOptions.find((item) => item.value == time)
  return data?.label
}

// 是否就诊过
export const getConsultFlagText = (flag: number) => {
  const flagOptions = [
    { value: FlagOptions.isFlag, label: '就诊过' },
    { value: FlagOptions.unFlag, label: '未就诊过' }
  ]
  const data = flagOptions.find((item) => item.value == flag)
  return data?.label
}

// 订单状态
export const orderStatus = () => {
  const statusValue = {
    // 问诊订单
    /** 待支付 */
    ConsultPay: 1,
    /** 待接诊 */
    ConsultWait: 2,
    /** 问诊中 */
    ConsultChat: 3,
    /** 问诊完成 */
    ConsultComplete: 4,
    /** 取消问诊 */
    ConsultCancel: 5,
    // 药品订单
    /** 待支付 */
    MedicinePay: 10,
    /** 待发货 */
    MedicineSend: 11,
    /** 待收货 */
    MedicineTake: 12,
    /** 已完成 */
    MedicineComplete: 13,
    /** 取消订单 */
    MedicineCancel: 14
  }
}
