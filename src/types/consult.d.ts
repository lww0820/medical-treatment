export type KnowledgeType = 'like' | 'recommend' | 'fatReduction' | 'food'

// ⽂章信息类型
export type Knowledge = {
  id: string
  title: string
  coverUrl: string[]
  topics: string[]
  collectionNumber: number
  commentNumber: number
  creatorName: string
  creatorAvatar: string
  creatorHospatalName: string
  likeFlag: 0 | 1
  content: string
  creatorDep: string
  creatorTitles: string
  creatorId: string
}

// ⽂章列表查询参数
export type KnowledgeParams = {
  type: KnowledgeType
  current: number
  pageSize: number
}
// 文章列表带有分页
export type KnowledgePage = {
  pageTotal: number
  rows: Knowledge
  total: number
}

// ⽂章列表
export type KnowledgeList = Knowledge[]

// 通⽤的分⻚查询参数
export type PageParams = {
  // 当前⻚码
  current: number
  // 每⻚条数
  pageSize: number
}

// ⽂章列表查询参数
export type KnowledgeParams = PageParams & {
  // ⽂章类型
  type: KnowledgeType
}

// 医⽣卡⽚对象
export type Doctor = {
  // 医⽣ID
  id: string
  // 医⽣名称
  name: string
  // 头像
  avatar: string
  // 医院名称
  hospitalName: string
  // 医院等级
  gradeName: string
  // 科室
  depName: string
  // 职称
  positionalTitles: string
  // 是否关注，0 未关注 1 已关注
  likeFlag: 0 | 1
  // 接诊服务费
  serviceFee: number
  // 接诊⼈数
  consultationNum: number
  // 评分
  score: number
  // 主攻⽅向
  major: string
}

// 医⽣列表
export type DoctorList = Doctor[]

// 医⽣分⻚
export type DoctorPage = {
  pageTotal: number
  total: number
  rows: DoctorList
}
