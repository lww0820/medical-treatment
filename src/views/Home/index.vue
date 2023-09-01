<template>
  <div class="home-page">
    <!-- 头部 -->
    <div class="home-page-head">
      <div class="con">
        <h1>优医</h1>
        <div class="search">
          <van-icon name="search" />
          搜一搜：疾病状态/医生/健康知识
        </div>
      </div>
    </div>
    <!-- nav -->
    <div class="home-navs">
      <van-row>
        <van-col span="8">
          <router-link to="/" class="nav" @click="consultStore.setType(ConsultType.Doctor)">
            <cp-icon name="home-doctor"></cp-icon>
            <p class="title">问医生</p>
            <p class="desc">按科室问医生</p>
          </router-link>
        </van-col>
        <van-col span="8">
          <router-link
            to="/consult/fast"
            class="nav"
            @click="consultStore.setType(ConsultType.Fast)"
          >
            <cp-icon name="home-graphic"></cp-icon>
            <p class="title">极速问诊</p>
            <p class="desc">20s医生极速回复</p>
          </router-link>
        </van-col>
        <van-col span="8">
          <router-link to="/" class="nav" @click="consultStore.setType(ConsultType.Medication)">
            <cp-icon name="home-prescribe"></cp-icon>
            <p class="title">开药门诊</p>
            <p class="desc">线上买药更方便</p>
          </router-link>
        </van-col>
      </van-row>
      <van-row>
        <van-col span="6">
          <router-link to="/" class="nav min">
            <cp-icon name="home-order"></cp-icon>
            <p class="title">药品订单</p>
          </router-link>
        </van-col>
        <van-col span="6">
          <router-link to="/consult/fast" class="nav min">
            <cp-icon name="home-docs"></cp-icon>
            <p class="title">健康档案</p>
          </router-link>
        </van-col>
        <van-col span="6">
          <router-link to="/" class="nav min">
            <cp-icon name="home-rp"></cp-icon>
            <p class="title">我的处方</p>
          </router-link>
        </van-col>
        <van-col span="6">
          <router-link to="/" class="nav min">
            <cp-icon name="home-find"></cp-icon>
            <p class="title">疾病查询</p>
          </router-link>
        </van-col>
      </van-row>
    </div>
    <!-- 轮播 -->
    <div class="banner">
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item>
          <img src="../../assets/ad.png" alt="" />
        </van-swipe-item>
        <van-swipe-item>
          <img src="../../assets/ad.png" alt="" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <!-- tab栏切换 -->
    <van-tabs shrink sticky v-model:active="active">
      <van-tab title="关注" name="like">
        <FollowDoctor></FollowDoctor>
        <KnowledgeList type="like"></KnowledgeList>
      </van-tab>
      <van-tab title="推荐" name="recommend">
        <KnowledgeList type="recommend"></KnowledgeList>
      </van-tab>
      <van-tab title="减脂" name="fatReduction">
        <KnowledgeList type="fatReduction"></KnowledgeList>
      </van-tab>
      <van-tab title="饮⻝" name="food">
        <KnowledgeList type="food"></KnowledgeList>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script lang="ts" setup>
import FollowDoctor from './components/FollowDoctor.vue'
import KnowledgeList from './components/KnowledgeList.vue'
import cpIcon from '@/components/cp-icon.vue'
import type { KnowledgeType } from '@/types/consult'
import { ref } from 'vue'
const active = ref<KnowledgeType>('recommend')

import { useConsultStore } from '@/stores/consult'
import { ConsultType } from '@/enum/index'
const consultStore = useConsultStore()
</script>

<style lang="scss" scoped>
.home-page {
  padding-bottom: 50px;
}
.home-page-head {
  height: 100px;
  position: relative;
  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 90px;
    background: linear-gradient(180deg, rgba(62, 206, 197, 0.85), #26bcc6);
    border-bottom-left-radius: 150px 20px;
    border-bottom-right-radius: 150px 20px;
  }
  .con {
    position: relative;
    padding: 0 15px;
    > h1 {
      font-size: 18px;
      color: #fff;
      font-weight: normal;
      padding: 20px 0;
      line-height: 1;
      padding-left: 5px;
    }
    .search {
      height: 40px;
      border-radius: 20px;
      box-shadow: 0px 15px 22px -7px rgba(224, 236, 250, 0.8);
      background-color: #fff;
      display: flex;
      align-items: center;
      padding: 0 20px;
      color: var(--cp-dark);
      font-size: 13px;
      .cp-icon {
        font-size: 16px;
        margin-right: 5px;
      }
    }
  }
}
.home-navs {
  padding: 10px 15px 0 15px;
  .nav {
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: 10px 0;
    .cp-icon {
      font-size: 48px;
    }
    .desc {
      font-size: 11px;
      color: var(--cp-tag);
      margin-top: 2px;
    }
    .title {
      font-weight: 500;
      margin-top: 5px;
      color: var(--cp-text1);
    }
  }
  .min {
    .cp-icon {
      font-size: 31px;
    }
    .title {
      font-size: 13px;
      color: var(--cp-text2);
      font-weight: normal;
    }
  }
}
.banner {
  padding: 10px 15px;
  height: 100px;
  img {
    width: 100%;
    height: 100%;
  }
}
::v-deep {
  .van-tabs {
    .van-tabs__nav {
      padding: 0 0 15px 0;
    }
    .van-tabs__line {
      width: 20px;
      background-color: var(--cp-primary);
    }
    .van-tab {
      padding: 0 15px;
    }
  }
}
</style>
