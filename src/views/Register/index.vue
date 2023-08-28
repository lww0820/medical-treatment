<template>
  <div>
    <cp-nav-bar fixed title="注册" right-text="登录" @click-right="handleClickRight"></cp-nav-bar>
  </div>
</template>

<script lang="ts" setup>
import cpNavBar from '@/components/cp-nav-bar.vue'
import router from '@/router'

const handleClickRight = () => {
  router.push('/login')
}
</script>

<style lang="scss" scoped></style>
