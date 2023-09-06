<template>
  <!-- 支付弹框 -->
  <van-action-sheet
    :show="show"
    title="选择⽀付⽅式"
    :close-on-popstate="false"
    :closeable="false"
    v-bind:before-close="closea"
  >
    <div class="pay-type">
      <p class="amount">￥39.00</p>
      <van-cell-group>
        <van-cell border title="微信支付" @click="paymentMethod = 0">
          <template #icon>
            <cp-icon name="consult-wechat"></cp-icon>
          </template>
          <template #extra>
            <van-checkbox :checked="paymentMethod === 0"></van-checkbox>
          </template>
        </van-cell>
        <van-cell border title="支付宝支付" @click="paymentMethod = 1">
          <template #icon>
            <cp-icon name="consult-alipay"></cp-icon>
          </template>
          <template #extra>
            <van-checkbox :checked="paymentMethod === 1"></van-checkbox>
          </template>
        </van-cell>
      </van-cell-group>
      <div class="btn">
        <van-button type="primary" round block @click="pay">立即支付</van-button>
      </div>
    </div>
  </van-action-sheet>
</template>

<script lang="ts" setup>
import { getConsultOrderPayUrl } from '@/services/consult'
import { showLoadingToast, showToast } from 'vant'
import cpIcon from '@/components/cp-icon.vue'
import { ref } from 'vue'
const props = defineProps<{
  show: boolean
  orderId: string
  actualPayment: number | string
  closea?: () => void
  payCallback: string
}>()

const paymentMethod = ref<0 | 1>()
// 跳转支付页面
const pay = async () => {
  if (paymentMethod.value === undefined) return showToast('请选择支付方式')
  showLoadingToast({
    message: '跳转支付',
    forbidClick: true
  })
  let res = await getConsultOrderPayUrl({
    orderId: props.orderId,
    paymentMethod: paymentMethod.value,
    payCallback: `http://localhost:5173/#` + props.payCallback
  })
  window.location.href = res.data.payUrl
}
</script>

<style lang="scss" scoped>
.pay-type {
  .amount {
    font-size: 16px;
    font-weight: 600;
    text-align: center;
    padding: 20px;
  }
  .van-cell {
    display: flex;
    align-items: center;
    .cp-icon {
      margin-right: 10px;
      font-size: 18px;
    }
    .van-checkbox :deep(.van-checkbox__icon) {
      font-size: 16px;
    }
  }
  .btn {
    padding: 15px;
  }
}
</style>
