<template>
  <div class="consult-pay-page" v-if="payInfo">
    <cp-nav-bar title="⽀付" />
    <div class="pay-info">
      <p class="tit">图⽂问诊 {{ payInfo?.payment }} 元</p>
      <img class="img" src="@/assets/avatar-doctor.svg" />
      <p class="desc">
        <span>极速问诊</span>
        <span>⾃动分配医⽣</span>
      </p>
    </div>
    <van-cell-group>
      <van-cell title="优惠券" :value="`-¥${payInfo.couponDeduction}`" />
      <van-cell title="积分抵扣" :value="`-¥${payInfo.pointDeduction}`" />
      <van-cell title="实付款" :value="`¥${payInfo.actualPayment}`" class="pay-price" />
    </van-cell-group>
    <div class="pay-space"></div>
    <van-cell-group>
      <van-cell
        title="患者信息"
        :value="`${patient?.name} | ${patient?.genderValue} | ${patient?.age}岁`"
      ></van-cell>
      <van-cell title="病情描述" :label="store.consult.illnessDesc"></van-cell>
    </van-cell-group>
    <div class="pay-schema">
      <van-checkbox v-model="agree">我已同意 <span class="text">⽀付协议</span></van-checkbox>
    </div>
    <van-submit-bar
      button-type="primary"
      :loading="loading"
      :price="payInfo.actualPayment * 100"
      button-text="⽴即⽀付"
      text-align="left"
      class="pay"
      @click="submit"
    />

    <cpPaySheet
      pay-callback="/room"
      v-model:show="show"
      :closea="closea"
      :actualPayment="payInfo.actualPayment"
      :orderId="orderId"
    ></cpPaySheet>
  </div>
</template>

<script lang="ts" setup>
import cpNavBar from '@/components/cp-nav-bar.vue'
import { createConsultOrder, getConsultOrderPre } from '@/services/consult'
import { getPatientDetail } from '@/services/user'
import { useConsultStore } from '@/stores/consult'
import type { ConsultOrderPreData } from '@/types/consult'
import type { patientInfo } from '@/types/user'
import { showConfirmDialog, showDialog, showToast } from 'vant'
import { onBeforeRouteLeave } from 'vue-router'
import { onMounted, ref } from 'vue'
import cpPaySheet from '@/components/cp-pay-sheet.vue'
import router from '@/router'
const store = useConsultStore()

const payInfo = ref<ConsultOrderPreData>()
const loadData = async () => {
  const res = await getConsultOrderPre({
    type: store.consult.type,
    illnessType: store.consult.illnessType
  })
  payInfo.value = res.data
  // 设置默认优惠券
  store.setCoupon(payInfo.value.couponId)
}
const patient = ref<patientInfo>()
const loadPatient = async () => {
  if (!store.consult.patientId) return
  const res = await getPatientDetail(store.consult.patientId)
  patient.value = res.data
}

// 防⽌在当前⻚⾯刷新，问诊记录已经清空，组件初始化需要校验
onMounted(() => {
  if (
    !store.consult.type ||
    store.consult.illnessType === undefined ||
    !store.consult.depId ||
    !store.consult.patientId
  ) {
    return showDialog({
      title: '温馨提示',
      message: '问诊信息不完整请重新填写，如有未⽀付的问诊订单可在问诊记录中继续⽀付',
      closeOnPopstate: false
    }).then(() => {
      router.push('/')
    })
  }
  loadData()
  loadPatient()
})
// 初始化同意数据
const agree = ref(false)
// 初始化动作面板状态
const show = ref(false)
const loading = ref(false)
// 订单ID
const orderId = ref('')
// 点击立即支付
const submit = async () => {
  if (!agree.value) return showToast('请勾选我已同意支付协议')
  loading.value = true
  let orderRes = await createConsultOrder(store.consult)
  orderId.value = orderRes.data.id
  show.value = true
  // store.clear()
  loading.value = false
}

// 生成订单后不可回退
onBeforeRouteLeave(() => {
  if (orderId.value) return false
})
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
      orderId.value = ''
      router.push('/user/consult')
      return true
    })
}

// 跳转支付页面
// const pay = async () => {
//   if (paymentMethod.value === undefined) return showToast('请选择支付方式')
//   showLoadingToast({
//     message: '跳转支付',
//     forbidClick: true
//   })
//   let res = await getConsultOrderPayUrl({
//     orderId: orderId.value,
//     paymentMethod: paymentMethod.value,
//     payCallback: 'http://localhost:5173/#/room'
//   })
//   window.location.href = res.data.payUrl
// }

// console.log(show.value)
</script>

<style lang="scss" scoped>
.consult-pay-page {
  padding: 0 0 50px 0;
  .pay-info {
    display: flex;
    padding: 15px;
    flex-wrap: wrap;
    align-items: center;
    .tit {
      width: 100%;
      font-size: 16px;
      margin-bottom: 10px;
    }
    .img {
      margin-right: 10px;
      width: 38px;
      height: 38px;
      border-radius: 4px;
      overflow: hidden;
    }
    .desc {
      flex: 1;
      > span {
        display: block;
        color: var(--cp-tag);
        &:first-child {
          font-size: 16px;
          color: var(--cp-text2);
        }
      }
    }
  }
}
.pay-price {
  ::v-deep() {
    .vam-cell__title {
      font-size: 16px;
    }
    .van-cell__value {
      font-size: 16px;
      color: var(--cp-price);
    }
  }
}
.pay-space {
  height: 12px;
  background-color: var(--cp-bg);
}
.pay-schema {
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  .text {
    color: var(--cp-primary);
  }
}

::v-deep() {
  .van-submit-bar__button {
    font-weight: normal;
    width: 160px;
  }
  .van-button--primary {
    background: var(--cp-primary);
    border-color: var(--cp-primary);
  }
  .van-checkbox__icon--checked .van-icon {
    background: var(--cp-primary);
    border-color: var(--cp-primary);
  }
}

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
