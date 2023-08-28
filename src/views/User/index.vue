<template>
  <div class="user-page">
    <div class="user-page-head">
      <div class="top">
        <van-image round width="70px" height="70px" :src="user?.avatar" />
        <div class="name">
          <p>{{ user?.account }}</p>
          <p><van-icon name="edit" /></p>
        </div>
      </div>
      <van-row>
        <van-col span="6">
          <p>{{ user?.collectionNumber }}</p>
          <p>收藏</p>
        </van-col>
        <van-col span="6">
          <p>{{ user?.likeNumber }}</p>
          <p>关注</p>
        </van-col>
        <van-col span="6">
          <p>{{ user?.score }}</p>
          <p>积分</p>
        </van-col>
        <van-col span="6">
          <p>{{ user?.couponNumber }}</p>
          <p>优惠券</p>
        </van-col>
      </van-row>
    </div>
    <div class="user-page-order">
      <div class="head">
        <h3>药品订单</h3>
        <a href="javascript:;">全部订单&gt;</a>
      </div>
      <van-row>
        <van-col span="6">
          <cp-icon name="user-paid" />
          <p>待付款</p>
        </van-col>
        <van-col span="6">
          <cp-icon name="user-shipped" />
          <p>待发货</p>
        </van-col>
        <van-col span="6">
          <cp-icon name="user-received" />
          <p>待收货</p>
        </van-col>
        <van-col span="6">
          <cp-icon name="user-finished" />
          <p>已完成</p>
        </van-col>
      </van-row>
    </div>
    <div class="user-page-group">
      <h3>快捷⼯具</h3>
      <van-cell
        :title="item.label"
        is-link
        :border="false"
        v-for="(item, index) in tools"
        :key="index"
        @click="jump(item.path)"
      >
        <template #icon><cp-icon :name="`user-tool-0${index + 1}`" /></template>
      </van-cell>
    </div>
    <a class="logout" @click="logout" href="javascript:;">退出登录</a>
  </div>
</template>

<script lang="ts" setup>
import type { userInfo } from '@/types/user'
import { getUserInfo } from '@/services/user'
import { ref } from 'vue'
import { showConfirmDialog, showToast } from 'vant'
import { useCounterStore } from '@/stores/user'
import router from '@/router'

const user = ref<userInfo>()
const tools = [
  { label: '我的问诊', path: '/user/consult' },
  { label: '我的处⽅', path: '/' },
  { label: '家庭档案', path: '/user/patient' },
  { label: '地址管理', path: '/user/address' },
  { label: '我的评价', path: '/' },
  { label: '官⽅客服', path: '/' },
  { label: '设置', path: '/' }
]
const getUser = async () => {
  let userRes = await getUserInfo()
  // console.log(userRes)
  user.value = userRes.data
}
getUser()

// 退出登录
const logout = async () => {
  await showConfirmDialog({
    title: '温馨提示',
    message: '您确认要退出优医问诊吗？'
  })
    .then(() => {
      // on confirm
      const store = useCounterStore()
      store.delUser()
      router.push('/login')
      showToast('退出成功')
    })
    .catch(() => {
      // on cancel
      showToast('已取消')
    })
}

const jump = (path: string) => {
  // console.log(path)
  router.push(path)
}
</script>

<style lang="scss" scoped>
.user-page {
  padding: 0 15px 65px;
  min-height: calc(100vh - 65px);
  background-color: var(--cp-bg);
  &-head {
    height: 200px;
    margin: 0 -15px;
    padding: 0 15px;
    background: linear-gradient(180deg, rgba(44, 181, 165, 0.46), rgba(44, 181, 165, 0));
    .top {
      padding-top: 50px;
      display: flex;
      align-items: center;
      .name {
        margin-left: 15px;
        p {
          &:first-child {
            font-size: 18px;
            font-weight: 500;
          }
          &:last-child {
            font-size: 16px;
            color: var(--cp-primary);
            margin-top: 16px;
          }
        }
      }
    }
    .van-row {
      margin: 0 -15px;
      margin-top: 15px;
      .van-col {
        text-align: center;
        p {
          &:first-child {
            font-weight: 500;
            font-size: 21px;
          }
          &:last-child {
            font-size: 11px;
            color: var(--cp-tip);
          }
        }
      }
    }
  }
  &-order {
    background-color: #fff;
    border-radius: 8px;
    padding-bottom: 15px;
    margin-bottom: 15px;

    .head {
      display: flex;
      justify-content: space-between;
      line-height: 50px;
      padding: 0 15px;
      a {
        color: var(--cp-tip);
      }
    }
    .van-col {
      text-align: center;
      .cp-icon {
        font-size: 28px;
      }
      p {
        font-size: 12px;
        padding-top: 4px;
      }
    }
  }
  &-group {
    background-color: #fff;
    border-radius: 8px;
    overflow: hidden;
    h3 {
      padding-left: 16px;
      line-height: 44px;
    }
    .van-cell {
      align-items: center;
    }
    .cp-icon {
      font-size: 17px;
      margin-right: 10px;
    }
  }
}
.logout {
  display: block;
  margin: 20px auto;
  width: 100px;
  text-align: center;
  color: var(--cp-price);
}
</style>
