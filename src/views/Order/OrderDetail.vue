<template>
  <div class="order-detail-page">
    <cp-nav-bar title="药品订单详情"></cp-nav-bar>
    <div class="order-head">
      <div class="card" @click="$router.push(`/order/logistics/${id}`)">
        <div class="logistics">
          <p>【东莞市】您的包裹已由物流公司揽收</p>
          <p>2019-07-14 17:42:12</p>
        </div>
        <van-icon name="arrow" />
      </div>
    </div>
    <!-- <div class="order-medical">
      <div class="head">
        <h3>优医药房</h3>
        <small>优医质保 假⼀赔⼗</small>
      </div>
      <div class="item van-hairline--top" v-for="i in 2" :key="i">
        <img class="img" src="@/assets/ad.png" alt="" />
        <div class="info">
          <p class="name">
            <span>优赛明 维⽣素E乳</span>
            <span>x1</span>
          </p>
          <p class="size">
            <van-tag>处⽅药</van-tag>
            <span>80ml</span>
          </p>
          <p class="price">￥25.00</p>
        </div>
        <div class="desc">⽤法⽤量：⼝服，每次1袋，每天3次，⽤药3天</div>
      </div>
    </div> -->
    <MedicalPage :medicines="MedicalOrderDetail?.medicines"></MedicalPage>

    <div class="order-detail">
      <van-cell-group>
        <van-cell title="药品⾦额" value="￥50" />
        <van-cell title="运费" value="￥4" />
        <van-cell title="优惠券" value="-￥0" />
        <van-cell title="实付款" value="￥54" class="price" />
        <van-cell title="订单编号" value="202201127465" />
        <van-cell title="创建时间" value="2022-01-23 09:23:46" />
        <van-cell title="⽀付时间" value="2022-01-23 09:23:46" />
        <van-cell title="⽀付⽅式" value="⽀付宝⽀付" />
      </van-cell-group>
    </div>
    <!-- 已取消 -->
    <van-action-bar v-if="MedicalOrderDetail?.status === OrderType.MedicineCancel">
      <van-action-bar-icon icon="delete-o" text="删除" />
      <van-action-bar-button type="primary" text="沟通记录" />
    </van-action-bar>
    <!-- 待收货 -->
    <van-action-bar v-if="MedicalOrderDetail?.status === OrderType.MedicineTake">
      <van-action-bar-button type="primary" text="确认收货" />
    </van-action-bar>
    <!-- 待发货 -->
    <van-action-bar v-if="MedicalOrderDetail?.status === OrderType.MedicineSend">
      <van-action-bar-button type="primary" text="提醒发货" />
    </van-action-bar>
    <!-- 待支付 -->
    <van-action-bar v-if="MedicalOrderDetail?.status === OrderType.MedicinePay">
      <p class="price">
        需要支付：<span>￥ {{ MedicalOrderDetail?.actualPayment }}</span>
      </p>
      <van-action-bar-button color="#bbb" text="取消问诊" />
      <van-action-bar-button type="primary" text="继续支付" />
    </van-action-bar>
    <!-- 已完成 -->
    <van-action-bar v-if="MedicalOrderDetail?.status === OrderType.MedicineComplete">
      <van-action-bar-icon icon="delete-o" text="删除" />
      <van-action-bar-button type="primary" text="再次购买" />
    </van-action-bar>
  </div>
</template>

<script lang="ts" setup>
import type { OrderDetail } from '@/types/order'
import MedicalPage from './components/MedicalPage.vue'
import cpNavBar from '@/components/cp-nav-bar.vue'
import { ref } from 'vue'
import { getMedicalOrderDetail } from '@/services/order'
import { useRoute } from 'vue-router'
import { OrderType } from '@/enum'
const route = useRoute()

const id = route.params.id as string

const MedicalOrderDetail = ref<OrderDetail>()
const getOrder = async () => {
  let res = await getMedicalOrderDetail(id)
  console.log(res.data)
  MedicalOrderDetail.value = res.data
}
getOrder()
</script>

<style lang="scss" scoped>
.order-detail-page {
  padding-bottom: 65px;
}
.order-head {
  position: relative;
  padding: 15px;
  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 80px;
    background: linear-gradient(180deg, rgba(44, 181, 165, 0), rgba(44, 181, 165, 0.2));
    border-bottom-left-radius: 150px 20px;
    border-bottom-right-radius: 150px 20px;
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
    .logistics {
      flex: 1;
      p {
        &:first-child {
          color: var(--cp-primary);
        }
        &:last-child {
          color: var(--cp-tag);
          font-size: 13px;
          margin-top: 5px;
        }
      }
    }
    .van-icon {
      color: var(--cp-tip);
    }
  }
}
:deep(.van-cell) {
  .van-cell__title {
    font-size: 16px;
    flex: none;
    width: 100px;
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
.order-medical {
  background-color: #fff;
  padding: 0 15px;
  .head {
    display: flex;
    height: 54px;
    align-items: center;
    > h3 {
      font-size: 16px;
      font-weight: normal;
    }
    > small {
      font-size: 13px;
      color: var(--cp-tag);
      margin-left: 10px;
    }
  }
  .item {
    display: flex;
    flex-wrap: wrap;
    padding: 15px 0;
    .img {
      width: 80px;
      height: 70px;
      border-radius: 2px;
      overflow: hidden;
    }
    .info {
      padding-left: 15px;
      width: 250px;
      .name {
        display: flex;
        font-size: 15px;
        margin-bottom: 5px;
        > span:first-child {
          width: 200px;
        }
        > span:last-child {
          width: 50px;
          text-align: right;
        }
      }
      .size {
        margin-bottom: 5px;
        .van-tag {
          background-color: var(--cp-primary);
          vertical-align: middle;
        }
        span:not(.van-tag) {
          margin-left: 10px;
          color: var(--cp-tag);
          vertical-align: middle;
        }
      }
      .price {
        font-size: 16px;
        color: #eb5757;
      }
    }
    .desc {
      width: 100%;
      background-color: var(--cp-bg);
      border-radius: 4px;
      margin-top: 10px;
      padding: 4px 10px;
      color: var(--cp-tip);
    }
  }
}
.van-action-bar {
  padding: 0 10px;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.1);
  .price {
    padding: 0 10px;
    > span {
      font-size: 18px;
      color: var(--cp-price);
    }
  }
}
</style>
