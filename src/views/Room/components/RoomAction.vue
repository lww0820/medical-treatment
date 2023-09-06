<template>
  <div class="room-action">
    <van-search v-model="value" shape="round" background="#fff" placeholder="问医生" />
    <van-uploader :preview-image="false">
      <cp-icon name="consult-img" />
    </van-uploader>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import CpIcon from '@/components/cp-icon.vue'

const route = useRoute()
const router = useRouter()

const value = ref('')
</script>

<style lang="scss">
.room-action {
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  background-color: #fff;
  height: 60px;
  padding: 0 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  .van-search {
    flex: 1;
  }
  .cp-icon {
    font-size: 16px;
  }
}

::v-deep {
  .van-icon-search:before {
    content: '';
  }
}
</style>
