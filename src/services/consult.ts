import request from '@/utils/request'
import type { DoctorPage, KnowledgePage, KnowledgeParams, PageParams } from '@/types/consult'

// /patient/home/knowledge

export const getKnowledgePage = (params: KnowledgeParams) =>
  request<KnowledgePage>('/patient/home/knowledge', 'GET', params)

export const getDoctorPage = (params: PageParams) =>
  request<DoctorPage>('/home/page/doc', 'GET', params)
