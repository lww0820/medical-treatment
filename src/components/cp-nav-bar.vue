<template>
  <van-nav-bar
    :title="title"
    :right-text="rightText"
    left-arrow
    @click-left="onClickLeft"
    @click-right="onClickRight"
  />
</template>

<script lang="ts" setup>
import router from '@/router'
const emit = defineEmits<{
  (e: 'click-right'): void
}>()
const onClickRight = () => {
  emit('click-right')
}

const onClickLeft = () => {
  if (history.state.back) {
    router.back()
  } else {
    router.push('/')
  }
}
// 父传子
defineProps<{
  title?: string
  rightText?: string
}>()
</script>

<style lang="scss" scoped>
::v-deep() {
  .van-nav-bar {
    &__arrow {
      font-size: 18px;
      color: var(--cp-text1);
    }
    &__text {
      font-size: 15px;
      color: var(--cp-primary);
    }
  }
}
</style>
