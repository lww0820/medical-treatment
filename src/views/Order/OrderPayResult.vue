<template>
  <div class="order-pay-result-page">
    <cp-nav-bar title="药品⽀付结果" />
    <div class="result error" v-if="orderDetail?.status === OrderType.ConsultPay">
      <van-icon name="clear" />
      <p class="price">￥ {{ orderDetail?.actualPayment }}</p>
      <p class="status">⽀付失败</p>
      <p class="tip">订单⽀付失败，可以点击查看订单继续⽀付，如有疑问联系客服~</p>
      <div class="btn">
        <van-button type="primary" :to="`/order/${orderDetail?.id}`">查看订单</van-button>
        <van-button :to="`/room?orderId=${orderDetail?.roomId}`">返回诊室</van-button>
      </div>
    </div>
    <div class="result" v-else>
      <van-icon name="checked" />
      <p class="price">￥ {{ orderDetail?.actualPayment }}</p>
      <p class="status">⽀付成功</p>
      <p class="tip">订单⽀付成功，已通知药房尽快发出， 请耐⼼等待~</p>
      <div class="btn">
        <van-button type="primary" :to="`/order/${orderDetail?.id}`">查看订单</van-button>
        <van-button :to="`/room?orderId=${orderDetail?.roomId}`">返回诊室</van-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { OrderType } from '@/enum'
import { getMedicalOrderDetail } from '@/services/order'
import type { OrderDetail } from '@/types/order'
import { ref } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()
const id = route.query.orderId as string

const orderDetail = ref<OrderDetail>()
const MedicalOrderDetail = async () => {
  let res = await getMedicalOrderDetail(id)
  orderDetail.value = res.data
}
MedicalOrderDetail()
</script>

<style lang="scss" scoped>
.result {
  display: flex;
  flex-direction: column;
  align-items: center;
  .van-icon {
    font-size: 75px;
    color: var(--cp-primary);
    margin-top: 60px;
  }
  .price {
    font-size: 22px;
    margin-top: 10px;
  }
  .status {
    color: var(--cp-text3);
  }
  .tip {
    color: var(--cp-tip);
    width: 240px;
    text-align: center;
    margin-top: 20px;
  }
  .btn {
    margin-top: 60px;
    .van-button--primary {
      margin-right: 20px;
    }
  }
  &.error {
    .van-icon {
      color: var(--cp-price);
    }
  }
}
</style>
