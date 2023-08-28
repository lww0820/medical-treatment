<template>
  <div class="patient-page">
    <cpNavBar title="家庭档案"></cpNavBar>
    <div class="patient-list">
      <div class="patient-item" v-for="(item, index) in patientData" :key="index">
        <div class="info">
          <div class="top">
            <span class="name">{{ item.name }}</span>
            <span class="id">{{
              item.idCard.replace(/^(.{6})(?:\d+)(.{4})$/, '\$1******\$2')
            }}</span>
          </div>
          <span>{{ item.genderValue }}</span>
          <span>{{ item.age }}岁</span>
        </div>
        <div class="icon">
          <cp-icon name="user-edit"></cp-icon>
        </div>
        <div class="tag" v-if="item.defaultFlag == 1 ? true : false">
          <van-tag color="var(--cp-primary)">默认</van-tag>
        </div>
      </div>
      <!-- <div class="patient-item">
        <div class="info">
          <div class="top">
            <span class="name">李富贵</span>
            <span class="id">321***********6164</span>
          </div>
          <span>男</span>
          <span>32岁</span>
        </div>
        <div class="icon">
          <cp-icon name="user-edit"></cp-icon>
        </div>
      </div> -->
      <div class="patient-add">
        <cp-icon name="user-add" />
        <p>添加患者</p>
      </div>
      <div class="patient-tip">最多可添加 6 ⼈</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import cpNavBar from '@/components/cp-nav-bar.vue'
import cpIcon from '@/components/cp-icon.vue'
import { getPatientInfo } from '@/services/user'
import type { patientInfo } from '@/types/user'
import { ref } from 'vue'

// 获取家庭档案

const patientData = ref<patientInfo[]>()
const getPatient = async () => {
  let res = await getPatientInfo()
  console.log(res.data)
  patientData.value = res.data
  // console.log(patientData.value)
}
getPatient()
</script>

<style lang="scss" scoped>
.patient- {
  &list {
    padding: 0 15px;
  }
  &item {
    display: flex;
    align-items: center;
    padding: 15px;
    background-color: var(--cp-bg);
    border-radius: 8px;
    position: relative;
    border: 1px solid var(--cp-bg);
    transition: all 0.3s;
    overflow: hidden;
    margin-top: 15px;
    .info {
      display: flex;
      flex-wrap: wrap;
      flex: 1;
      .top {
        display: flex;
      }
      span {
        color: var(--cp-tip);
        margin-right: 20px;
        line-height: 30px;

        &.name {
          font-size: 16px;
          color: var(--cp-text1);
          width: 80px;
          margin-right: 0;
        }
        &.id {
          color: var(--cp-text2);
          width: 180px;
        }
      }
    }
  }
  &add {
    background-color: var(--cp-bg);
    border-radius: 8px;
    margin-top: 15px;
    text-align: center;
    color: var(--cp-primary);
    padding: 15px 0;
    .cp-icon {
      font-size: 24px;
    }
  }
  &tip {
    color: var(--cp-tip);
    padding: 12px 0;
  }
}
.icon {
  color: var(--cp-tag);
  width: 20px;
  text-align: center;
}
.tag {
  position: absolute;
  right: 60px;
  top: 21px;
  width: 40px;
  height: 16px;
  font-size: 10px;
  color: #fff;
  background-color: var(--cp-primary);
  border-radius: 2px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
