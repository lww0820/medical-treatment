import request from '@/utils/request'
import type {
  DoctorPage,
  FollowType,
  KnowledgePage,
  KnowledgeParams,
  PageParams,
  TopDep
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

export const getAllDep = () => request<TopDep[]>('/dep/all', 'GET')
