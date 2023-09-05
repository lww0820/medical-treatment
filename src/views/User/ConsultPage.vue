<template>
  <div class="consult-page">
    <cp-nav-bar title="问诊记录"></cp-nav-bar>
    <van-tabs v-model:active="active">
      <van-tab title="极速问诊">
        <consult-list :type="ConsultType.Fast"></consult-list>
      </van-tab>
      <van-tab title="找医生">
        <consult-list :type="ConsultType.Doctor"></consult-list>
      </van-tab>
      <van-tab title="开药问诊">
        <consult-list :type="ConsultType.Medication"></consult-list>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script lang="ts" setup>
import cpNavBar from '@/components/cp-nav-bar.vue'
import ConsultList from './components/Consult-List.vue'
import { ConsultType } from '@/enum/index'
import { ref } from 'vue'

const active = ref(0)
</script>

<style lang="scss" scoped>
.consult-page {
  background-color: var(--cp-bg);
  min-height: calc(100vh - 46px);
}

::v-deep {
  .van-tabs {
    .van-tabs__nav {
      padding: 0 0 15px 0;
    }
    .van-tabs__line {
      width: 20px;
      background-color: var(--cp-primary);
    }
    .van-tab {
      padding: 0 15px;
    }
  }
}
</style>
