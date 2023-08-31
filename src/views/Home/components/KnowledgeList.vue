<template>
  <div class="knowledgePage">
    <van-list
      v-model:loading="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <KnowledgeCard v-for="(item, index) in list" :key="index" :item="item"></KnowledgeCard>
    </van-list>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import KnowledgeCard from './KnowledgeCard.vue'
import type { KnowledgeList, KnowledgeParams, KnowledgeType } from '@/types/consult'
import { getKnowledgePage } from '@/services/consult'
const list = ref<KnowledgeList>([])
// loading为false显示加载中
const loading = ref(false)
// 数据已全部加载完毕，则直接将 finished 设置成 true
const finished = ref(false)
const props = defineProps<{
  type: KnowledgeType
}>()
const params = ref<KnowledgeParams>({
  type: props.type,
  current: 1,
  pageSize: 10
})

const onLoad = async () => {
  let res = await getKnowledgePage(params.value)
  list.value.push(...res.data.rows)

  if (params.value.current >= res.data.pageTotal) {
    finished.value = true
  } else {
    params.value.current++
  }
  loading.value = false
}
</script>

<style lang="scss" scoped>
.knowledgePage {
  padding: 0 15px;
}
</style>
