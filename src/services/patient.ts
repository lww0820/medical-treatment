import type { patientInfo } from '@/types/user'
import request from '@/utils/request'
// 获取家庭档案
export const getPatientInfo = () => request<patientInfo[]>('/patient/mylist', 'GET')
// 添加档案
export const AddPatientInfo = (patient: patientInfo) =>
  request<patientInfo[]>('/patient/add', 'POST', patient)
// 编辑档案
export const EditPatientInfo = (patient: patientInfo) =>
  request<patientInfo[]>('/patient/update', 'PUT', patient)
// 删除档案
export const DelPatientInfo = (id: number | string) =>
  request<patientInfo[]>(`/patient/del/${id}`, 'DELETE')
