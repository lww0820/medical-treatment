<template>
  <div class="follow-doctor">
    <div class="head">
      <p>推荐关注</p>
      <a href="javascript:;"> 查看更多<i class="van-icon van-icon-arrow" /></a>
    </div>
    <div class="body">
      <!-- swipe 组件 -->
      <van-swipe :width="(150 / 375) * widthValue" :show-indicators="false" :loop="false">
        <van-swipe-item v-for="(item, index) in doctorList" :key="index">
          <DoctorCard :item="item" />
        </van-swipe-item>
      </van-swipe>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { getDoctorPage } from '@/services/consult'
import DoctorCard from './DoctorCard.vue'
import type { DoctorList } from '@/types/consult'
import { ref } from 'vue'
import { onMounted } from 'vue'
import { onUnmounted } from 'vue'
const pageParams = ref({
  current: 1,
  pageSize: 5
})

const doctorList = ref<DoctorList>()

const initDoctorList = async () => {
  const doctorRes = await getDoctorPage(pageParams.value)
  doctorList.value = doctorRes.data.rows
}
initDoctorList()

const widthValue = ref(0)

const setWidth = () => (widthValue.value = window.innerWidth)

onMounted(() => {
  setWidth()
  window.addEventListener('resize', setWidth)
})

onUnmounted(() => {
  setWidth()
  window.addEventListener('resize', setWidth)
})
</script>

<style lang="scss" scoped>
.follow-doctor {
  background-color: var(--cp-bg);
  height: 250px;
  .head {
    display: flex;
    justify-content: space-between;
    height: 45px;
    align-items: center;
    padding: 0 15px;
    font-size: 13px;
    > a {
      color: var(--cp-tip);
    }
  }
  .body {
    width: 100%;
    overflow: hidden;
  }
}
</style>
