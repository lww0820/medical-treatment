import type { Logistics, OrderDetail, OrderPre, addressType, medicinesType } from '@/types/order'
import request from '@/utils/request'
// 获取收货地址列表
export const getAddressList = () => request<addressType[]>('/patient/order/address', 'GET')

// 获取处方药品列表 /medicine/order/pre?prescriptionId=6938549059629056
export const getMedicalOrderPre = (prescriptionId: string) =>
  request<OrderPre>(`/patient/medicine/order/pre`, 'GET', { prescriptionId })

// 创建药品订单
export const createMedicalOrder = (data: medicinesType) =>
  request<{ id: string }>('/patient/medicine/order', 'POST', data)

//药品订单支付成功 /patient/medicine/order/detail/6938587697610752
export const getMedicalOrderDetail = (id: string) =>
  request<OrderDetail>(`/patient/medicine/order/detail/${id}`, 'GET')

// 获取药品订单物流信息 /patient/order/6938955866693632/logistics
export const getLogisticsDetail = (id: string) =>
  request<Logistics>(`/patient/order/${id}/logistics`, 'GET')
