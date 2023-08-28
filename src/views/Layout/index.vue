<template>
  <router-view></router-view>
  <van-tabbar route v-model="active">
    <van-tabbar-item to="/home">
      <span>首页</span>
      <template #icon="{ active }">
        <cp-icon :name="`home-index-${active ? 'active' : 'default'}`" />
      </template>
    </van-tabbar-item>
    <van-tabbar-item to="/article">
      <span>健康百科</span>
      <template #icon="{ active }">
        <cp-icon :name="`home-article-${active ? 'active' : 'default'}`" />
      </template>
    </van-tabbar-item>
    <van-tabbar-item to="/notify">
      <span>消息中心</span>
      <template #icon="{ active }">
        <cp-icon :name="`home-notice-${active ? 'active' : 'default'}`" />
      </template>
    </van-tabbar-item>
    <van-tabbar-item to="/user">
      <span>我的</span>
      <template #icon="{ active }">
        <cp-icon :name="`home-mine-${active ? 'active' : 'default'}`" />
      </template>
    </van-tabbar-item>
  </van-tabbar>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const active = ref(0)
</script>

<style lang="scss" scoped>
::v-deep {
  .van-tabbar-item--active {
    color: var(--cp-primary);
    background-color: var(--van-tabbar-item-active-background);
  }
}
</style>
