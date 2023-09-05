<template>
  <div class="consult-list-page">
    <van-list
      v-model:loading="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <consult-item
        v-for="(item, index) in orderList"
        :key="index"
        :item="item"
        @on-delete="del"
      ></consult-item>
    </van-list>
  </div>
</template>

<script lang="ts" setup>
import type { ConsultOrderItem, ConsultOrderListParams } from '@/types/consult'
import ConsultItem from './Consult-Item.vue'
import { getConsultOrderList } from '@/services/consult'
import { ref } from 'vue'
import type { ConsultType } from '@/enum'

const props = defineProps<{
  type: ConsultType
}>()

const pageParams = ref<ConsultOrderListParams>({
  current: 1,
  pageSize: 10,
  type: props.type
})

const loading = ref(false)
const finished = ref(false)

const orderList = ref<ConsultOrderItem[]>([])

const onLoad = async () => {
  let orderRes = await getConsultOrderList(pageParams.value)
  // console.log(orderRes.data.rows)
  orderList.value.push(...orderRes.data.rows)

  if (pageParams.value.current <= orderRes.data.pageTotal) {
    pageParams.value.current++
  } else {
    finished.value = true
  }
  loading.value = false
}

const del = (id: string | number) => {
  orderList.value = orderList.value.filter((item) => item.id !== id)
}
</script>

<style lang="scss" scoped></style>
