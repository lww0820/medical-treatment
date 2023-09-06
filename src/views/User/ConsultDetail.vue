<template>
  <div class="consult-detail-page" v-if="detailInfo">
    <cp-nav-bar title="问诊详情"></cp-nav-bar>
    <div class="detail-head">
      <div class="text">
        <h3>图⽂问诊 {{ detailInfo.payment }} 元</h3>
        <span class="sta green">{{ detailInfo.statusValue }}</span>
        <p class="tip">服务医生信息</p>
      </div>
      <div class="card">
        <img class="img" src="@/assets/avatar-doctor.svg" alt="" />
        <p class="doc">
          <span>极速问诊</span>
          <span>自动分配医生 </span>
        </p>
        <van-icon name="arrow" />
      </div>
    </div>
    <div class="detail-patient">
      <van-cell-group>
        <van-cell
          title="患者信息"
          :value="`${detailInfo?.patientInfo.name} | ${detailInfo?.patientInfo.genderValue} | ${detailInfo?.patientInfo.age}岁`"
        ></van-cell>
        <van-cell
          title="患病时长"
          :value="getIllnessTimeText(detailInfo.illnessTime as number)"
        ></van-cell>
        <van-cell
          title="患病情况"
          :value="getConsultFlagText(detailInfo.consultFlag as number)"
        ></van-cell>
        <van-cell title="病情描述" :label="detailInfo?.illnessDesc"></van-cell>
      </van-cell-group>
    </div>
    <div class="detail-order">
      <h3>订单信息</h3>
      <van-cell-group :border="false">
        <van-cell title="订单编号">
          <template #value>
            <span class="copy" @click="copyHandle">复制</span>
            {{ detailInfo.orderNo }}
          </template>
        </van-cell>
        <van-cell title="创建时间" :value="detailInfo.createTime"></van-cell>
        <van-cell title="应付款" :value="`￥${detailInfo.payment}`"></van-cell>
        <van-cell title="优惠券" :value="`-￥${detailInfo.couponDeduction}`"></van-cell>
        <van-cell title="积分抵扣" :value="`-￥${detailInfo.couponDeduction}`"></van-cell>
        <van-cell title="实付款" class="price" :value="`￥${detailInfo.actualPayment}`"></van-cell>
      </van-cell-group>
    </div>
    <div class="detail-action van-hairline--top" v-if="detailInfo.status === OrderType.ConsultPay">
      <div class="price">
        <span>需付款</span>
        <span>￥{{ detailInfo.actualPayment }}</span>
      </div>
      <van-button type="default" round>取消问诊</van-button>
      <van-button type="primary" round @click="show = true">继续⽀付</van-button>
    </div>
    <div class="detail-action van-hairline--top" v-if="detailInfo.status === OrderType.ConsultWait">
      <van-button type="default" round @click="cancelConsultOrder(detailInfo)">
        取消问诊</van-button
      >
      <van-button type="primary" round @click="router.push(`/room?orderId=${detailInfo.id}`)"
        >继续沟通</van-button
      >
    </div>
    <div class="detail-action van-hairline--top" v-if="detailInfo.status === OrderType.ConsultChat">
      <van-button type="default" round @click="showPrescription(detailInfo.prescriptionId!)"
        >查看处方</van-button
      >
      <van-button type="primary" round @click="router.push(`/room?orderId=${detailInfo.id}`)"
        >继续沟通</van-button
      >
    </div>
    <div
      class="detail-action van-hairline--top"
      v-if="detailInfo.status === OrderType.ConsultComplete"
    >
      <consult-more
        :disabled="!detailInfo.prescriptionId"
        @on-pre="showPrescription(detailInfo.prescriptionId!)"
        @on-delete="handleDeleteOrder(detailInfo)"
      ></consult-more>
      <van-button type="default" round>问诊记录</van-button>
      <van-button type="primary" round v-if="detailInfo.evaluateId">写评价</van-button>
      <van-button type="primary" round>查看评价</van-button>
    </div>
    <div
      class="detail-action van-hairline--top"
      v-if="detailInfo.status === OrderType.ConsultCancel"
    >
      <van-button type="default" round @click="handleDeleteOrder(detailInfo)">删除订单</van-button>
      <van-button type="primary" round to="/">咨询其他医生 </van-button>
    </div>
  </div>
  <div class="consult-detail" v-else>
    <van-skeleton title :row="4" />
    <van-skeleton title :row="4" />
  </div>
  <cpPaySheet
    pay-callback="/room"
    v-model:show="show"
    :closea="closea"
    :actualPayment="detailInfo?.actualPayment!"
    :orderId="detailInfo?.id!"
  ></cpPaySheet>
</template>

<script lang="ts" setup>
import showPrescription, { useDeleteOrder, useCancelOrder } from '@/composable/ShowPrescription'
import ConsultMore from './components/ConsultMore.vue'
import { OrderType } from '@/enum'
import cpNavBar from '@/components/cp-nav-bar.vue'
import { getConsultOrderDetail } from '@/services/consult'
import type { ConsultOrderItem } from '@/types/consult'
import { getIllnessTimeText, getConsultFlagText } from '@/composable/detail'
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { useRouter } from 'vue-router'
import { useClipboard } from '@vueuse/core'
import { showConfirmDialog, showToast } from 'vant'
import cpPaySheet from '@/components/cp-pay-sheet.vue'

const { cancelConsultOrder } = useCancelOrder()
const show = ref(false)
const router = useRouter()
const route = useRoute()
const detailInfo = ref<ConsultOrderItem>()
const getOrderDetail = async () => {
  let res = await getConsultOrderDetail(route.params.id as string)
  detailInfo.value = res.data
}
getOrderDetail()
const { handleDeleteOrder } = useDeleteOrder(() => {
  router.push('/user/consult')
})
const { copy, isSupported } = useClipboard()
// 复制订单编号
const copyHandle = async () => {
  if (!isSupported.value) return showToast('未授权，不支持')
  await copy(detailInfo.value?.orderNo || '')
  showToast('已复制')
}

// 关闭弹窗前做的操作
const closea = () => {
  console.log(11)

  return showConfirmDialog({
    title: '关闭支付',
    message: '取消支付将无法获得医生回复，医生接诊名额有限，是否确认关闭？',
    confirmButtonText: '继续支付',
    cancelButtonText: '仍要取消'
  })
    .then(() => {
      // 继续支付
      return false
    })
    .catch(() => {
      // 仍要取消
      router.push('/user/consult')
      return true
    })
}
</script>

<style lang="scss" scoped>
.consult-detail {
  background-color: #fff;
  height: 100vh;
  .van-skeleton:last-child {
    margin-top: 20px;
  }
}
.consult-detail-page {
  padding-bottom: 70px;
  background-color: var(--cp-bg);
  min-height: calc(100vh - 46px);
}
.detail-head {
  height: 140px;
  background-color: #fff;
  position: relative;
  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 135px;
    background: linear-gradient(180deg, rgba(44, 181, 165, 0), rgba(44, 181, 165, 0.2));
    border-bottom-left-radius: 150px 20px;
    border-bottom-right-radius: 150px 20px;
  }
  padding: 15px;
  .text {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 10px 3px;
    .sta {
      color: var(--cp-tag);
      font-weight: 500;
      font-size: 16px;
      &.green {
        color: var(--cp-primary);
      }
      &.orange {
        color: #f2994a;
      }
    }
    .tip {
      width: 100%;
      color: var(--cp-text3);
      margin-top: 5px;
    }
  }
  .card {
    height: 74px;
    background-color: #fff;
    border-radius: 8px;
    position: relative;
    display: flex;
    align-items: center;
    padding: 0 15px;
    box-shadow: 0px 0px 22px 0px rgba(229, 229, 229, 0.5);
    .img {
      width: 38px;
      height: 38px;
    }
    .doc {
      flex: 1;
      padding-left: 15px;
      > span {
        display: block;
        font-size: 16px;
        &:last-child {
          font-size: 13px;
          color: var(--cp-text3);
          margin-top: 3px;
        }
      }
    }
    .van-icon {
      color: var(--cp-tip);
    }
  }
}
.detail-patient {
  background-color: #fff;
}
.detail-order {
  background-color: #fff;
  margin-top: 15px;
  h3 {
    padding: 10px 18px;
    font-size: 16px;
    font-weight: normal;
  }
  .copy {
    padding: 2px 10px;
    border: 1px solid var(--cp-primary);
    background-color: var(--cp-plain);
    color: var(--cp-primary);
    font-size: 12px;
    border-radius: 12px;
    margin-right: 10px;
  }
  ::v-deep(.van-cell__title) {
    width: 70px;
    flex: none;
  }
  .price :deep(.van-cell__value) {
    font-size: 16px;
    color: var(--cp-price);
  }
}
.detail-action {
  height: 65px;
  width: 100%;
  position: fixed;
  left: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  background-color: #fff;
  justify-content: flex-end;
  padding: 0 15px;
  box-sizing: border-box;
  .price {
    flex: 1;
    > span:last-child {
      font-size: 18px;
      color: var(--cp-price);
      padding-left: 5px;
    }
  }
  .van-button {
    margin-left: 10px;
    padding-left: 17px;
    padding-right: 17px;
  }
  :deep(.van-button--default) {
    background-color: var(--cp-bg);
    color: var(--cp-text3);
  }
}
.van-cell {
  padding-left: 18px;
  padding-right: 18px;
}
</style>
