import request from '@/utils/request'
import type {
  DoctorPage,
  FollowType,
  KnowledgePage,
  KnowledgeParams,
  PageParams,
  Image,
  TopDep,
  ConsultOrderPreParams,
  ConsultOrderPreData,
  PartialConsult,
  ConsultOrderListParams,
  ConsultOrderPage,
  ConsultOrderItem
} from '@/types/consult'

// /patient/home/knowledge
// 获取知识列表
export const getKnowledgePage = (params: KnowledgeParams) =>
  request<KnowledgePage>('/patient/home/knowledge', 'GET', params)

// 获取推荐医生列表
export const getDoctorPage = (params: PageParams) =>
  request<DoctorPage>('/home/page/doc', 'GET', params)

// 关注接口 '/like'
export const like = (id: string, type: FollowType = 'doc') => request('/like', 'POST', { id, type })

// 获取一级科室
export const getAllDep = () => request<TopDep[]>('/dep/all', 'GET')

// 上传图片
export const Upload = (file: File) => {
  const fe = new FormData()
  fe.append('file', file)
  return request<Image>('/upload', 'POST', fe)
}

// 拉取预⽀付订单信息
export const getConsultOrderPre = (params: ConsultOrderPreParams) =>
  request<ConsultOrderPreData>('/patient/consult/order/pre', 'GET', params)

// ⽣成订单
export const createConsultOrder = (data: PartialConsult) =>
  request<{ id: string }>('/patient/consult/order', 'POST', data)

// ⽣成⽀付地址的 API 函数
export const getConsultOrderPayUrl = (params: {
  // 获取⽀付地址 0 是微信 1 ⽀付宝
  paymentMethod: 0 | 1
  orderId: string
  payCallback: string
}) => request<{ payUrl: string }>('/patient/consult/pay', 'POST', params)

// 获取问诊信息列表
export const getConsultOrderList = (params: ConsultOrderListParams) =>
  request<ConsultOrderPage>('/patient/consult/order/list', 'GET', params)

// 取消订单
export const cancelOrder = (id: string) => request(`/patient/order/cancel/${id}`, 'PUT')

// 删除订单
export const delOrder = (id: string) => request(`/patient/order/${id}`, 'DELETE')

// 查看处方
export const useShowPrescription = (id: string) =>
  request(`/patient/consult/prescription/${id}`, 'GET')
// 查看处方
export const getConsultOrderDetail = (orderId: string) =>
  request<ConsultOrderItem>('/patient/consult/order/detail', 'GET', { orderId })
