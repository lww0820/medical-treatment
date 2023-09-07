<template>
  <div class="order-pay-page">
    <cp-nav-bar title="药品支付"></cp-nav-bar>
    <div class="order-address">
      <p class="area">
        <van-icon name="location" />
        <span>{{ address?.province }}{{ address?.city }}{{ address?.county }}</span>
      </p>
      <p class="detail">{{ address?.addressDetail }}</p>
      <p>
        {{ address?.receiver }}
        {{ address?.mobile.replace(/^(.{3})(?:\d+)(.{3})$/, '\$1******\$2') }}
      </p>
    </div>
    <MedicalPage :medicines="orderPre?.medicines"></MedicalPage>
    <div class="order-detail">
      <van-cell-group>
        <van-cell title="药品⾦额" :value="`￥${orderPre?.payment}`" />
        <van-cell title="运费" :value="`￥${orderPre?.expressFee}`" />
        <van-cell title="优惠券" :value="`￥${orderPre?.couponDeduction}`" />
        <van-cell title="实付款" :value="`￥${orderPre?.actualPayment}`" class="price" />
      </van-cell-group>
    </div>
    <div class="order-tip">
      <p class="tip">
        由于药品的特殊性，如⾮错发、漏发药品的情况，药品⼀经发出
        不得退换，请核对药品信息⽆误后下单。
      </p>
      <van-checkbox v-model="agree">我已同意<a href="javascript:;">⽀付协议</a></van-checkbox>
    </div>
    <van-submit-bar
      :price="orderPre?.actualPayment! * 100"
      button-text="⽴即⽀付"
      @submit="onSubmit"
      :loading="loading"
      button-type="primary"
      text-align="left"
    ></van-submit-bar>
    <cp-pay-sheet
      v-model:show="show"
      :orderId="orderId"
      :actualPayment="orderPre?.actualPayment!"
      pay-callback="/order/pay/result"
    ></cp-pay-sheet>
  </div>
</template>

<script lang="ts" setup>
import cpNavBar from '@/components/cp-nav-bar.vue'
import cpPaySheet from '@/components/cp-pay-sheet.vue'
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import MedicalPage from './components/MedicalPage.vue'
const route = useRoute()
import { createMedicalOrder, getAddressList, getMedicalOrderPre } from '@/services/order'
import type { OrderPre, addressType } from '@/types/order'
import { showToast } from 'vant'

const address = ref<addressType>()
const agree = ref(false)
const id = route.query.id as string
const getAddress = async () => {
  let AddressRes = await getAddressList()
  console.log(AddressRes.data)
  address.value = AddressRes.data[0]
}
getAddress()

const orderPre = ref<OrderPre>()
const getOrder = async () => {
  let res = await getMedicalOrderPre(id)
  console.log(res.data)
  orderPre.value = res.data
}
getOrder()

// 药品订单ID
const orderId = ref('')
// 按钮加载图标
const loading = ref(false)
// 控制抽屉的显示隐藏
const show = ref(false)

const onSubmit = async () => {
  if (!agree.value) return showToast('请同意⽀付协议')
  if (!address.value?.id) return showToast('请选择收货地址')
  if (!orderPre.value?.id) return showToast('未找到处⽅')
  if (!orderId.value) {
    loading.value = true
    try {
      let res = await createMedicalOrder({
        addressId: address.value?.id as string,
        id: orderPre.value?.id as string,
        couponId: orderPre.value.couponId
      })
      orderId.value = res.data.id
      loading.value = false
      // 打开⽀付抽屉
      show.value = true
    } catch (err) {
      console.log(err)
    } finally {
      loading.value = false
    }
  }
  // console.log(res)
}
</script>

<style lang="scss" scoped>
::v-deep {
  .van-nav-bar__content {
    background-color: var(--cp-primary);
    .van-nav-bar__arrow,
    .van-nav-bar__title {
      color: #fff;
    }
  }
}
:deep(.van-nav-bar) {
  background-color: var(--cp-primary);
  .van-nav-bar__arrow,
  .van-nav-bar__title {
    color: #fff;
  }
}
:deep(.van-cell) {
  .van-cell__title {
    font-size: 16px;
  }
  .van-cell__value {
    font-size: 16px;
  }
  &.price {
    .van-cell__value {
      font-size: 18px;
      color: var(--cp-price);
    }
  }
}
:deep(.van-submit-bar) {
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.1);
  .van-button {
    width: 200px;
  }
}
.order-pay-page {
  padding: 0 0 65px;
}
.order-address {
  padding: 15px 15px 0 15px;
  background-color: #fff;
  font-size: 13px;
  .area {
    color: var(--cp-tag);
    margin-bottom: 5px;
    .van-icon-location {
      color: #ff7702;
      font-size: 14px;
    }
  }
  .detail {
    font-size: 17px;
    margin-bottom: 5px;
  }
  &::after {
    content: '';
    display: block;
    height: 12px;
    background-color: var(--cp-bg);
    margin: 0 -15px;
    margin-top: 15px;
  }
}

.order-tip {
  padding: 0 15px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 10px;
  .tip {
    font-size: 12px;
    color: var(--cp-tag);
    width: 100%;
    &::before {
      content: '*';
      color: var(--cp-price);
      font-size: 14px;
    }
    margin-bottom: 30px;
  }
  .van-checkbox {
    a {
      color: var(--cp-primary);
    }
  }
}
</style>
