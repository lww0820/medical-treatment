<script setup lang="ts">
import { Button as VanButton } from 'vant'
import { useCounterStore } from './stores/user'
const user = useCounterStore()
const add = () => {
  user.setUser({
    id: '10',
    token: '111',
    account: 'hh',
    mobile: '12345678',
    avatar: 'https://www.baidu.com/'
  })
}
</script>

<template>
  <van-button type="danger" @click="add">按钮</van-button>
  <div class="box">{{ user.user }}</div>
  <RouterView />
</template>

<style scoped>
.box {
  width: 200px;
  height: 200px;
  background-color: green;
}
</style>
