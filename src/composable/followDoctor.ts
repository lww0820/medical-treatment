import { like } from '@/services/consult'
import { ref } from 'vue'
import type { FollowType } from '@/types/consult'
export default function useFollow(type: FollowType = 'doc') {
  const loading = ref(false)

  const follow = async (doc: { id: string; likeFlag: 0 | 1 }) => {
    loading.value = true
    try {
      await like(doc.id, type)
      doc.likeFlag = doc.likeFlag === 1 ? 0 : 1
    } finally {
      loading.value = false
    }
  }
  return {
    loading,
    follow
  }
}
