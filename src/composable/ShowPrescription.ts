import { cancelOrder, delOrder, useShowPrescription } from '@/services/consult'
import type { ConsultOrderItem } from '@/types/consult'
import { showImagePreview, showToast } from 'vant'
import { ref } from 'vue'

export default async function showPrescription(id: string) {
  // 查看处方

  const res: any = await useShowPrescription(id)
  showImagePreview([res.data.url])
  return { showPrescription }
}
const loading = ref(false)
// 删除订单
export function useDeleteOrder(cb?: (id: string | number) => void) {
  const loading = ref(false)
  const handleDeleteOrder = async (obj: ConsultOrderItem) => {
    loading.value = true
    try {
      await delOrder(obj.id)
      cb && cb(obj.id)
      showToast('删除成功')
    } catch {
      showToast('删除失败')
    } finally {
      loading.value = false
    }
  }
  return { handleDeleteOrder }
}

// 取消订单
export function useCancelOrder() {
  const cancelConsultOrder = (obj: ConsultOrderItem) => {
    loading.value = true
    cancelOrder(obj.id)
      .then(() => {
        // item.status=OrderType.ConsultCancel

        showToast('取消成功')
      })
      .catch(() => {
        showToast('取消失败')
      })
      .finally(() => {
        loading.value = false
      })
  }
  return { cancelConsultOrder }
}
