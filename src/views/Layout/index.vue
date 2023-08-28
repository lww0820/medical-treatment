<template>
  <router-view></router-view>
  <van-tabbar router v-model="active">
    <van-tabbar-item to="/home">
      <span>首页</span>
      <template #icon="props">
        <img :src="props.active ? icon.active : icon.inactive" />
      </template>
    </van-tabbar-item>
    <van-tabbar-item to="/article">
      <span>健康百科</span>
      <template #icon="props">
        <img :src="props.active ? icon.active : icon.inactive" />
      </template>
    </van-tabbar-item>
    <van-tabbar-item to="/notify">
      <span>消息中心</span>
      <template #icon="props">
        <img :src="props.active ? icon.active : icon.inactive" />
      </template>
    </van-tabbar-item>
    <van-tabbar-item to="/user">
      <span>我的</span>
      <template #icon="props">
        <img :src="props.active ? icon.active : icon.inactive" />
      </template>
    </van-tabbar-item>
  </van-tabbar>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const active = ref(0)
const icon = {
  active: 'https://fastly.jsdelivr.net/npm/@vant/assets/user-active.png',
  inactive: 'https://fastly.jsdelivr.net/npm/@vant/assets/user-inactive.png'
}
</script>

<style lang="scss" scoped></style>
