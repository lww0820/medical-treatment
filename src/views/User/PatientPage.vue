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
        <div class="icon" @click="showPopup(item)">
          <cp-icon name="user-edit"></cp-icon>
        </div>
        <div class="tag" v-if="item.defaultFlag == 1 ? true : false">
          <van-tag color="var(--cp-primary)">默认</van-tag>
        </div>
      </div>

      <div class="patient-add" v-if="patientData && patientData?.length < 6" @click="showPopup()">
        <cp-icon name="user-add" />
        <p>添加患者</p>
      </div>
      <div class="patient-tip">最多可添加 6 ⼈</div>
      <!-- 添加弹出框 -->
      <van-popup v-model:show="show" position="right" :style="{ width: '100%', height: '100%' }">
        <template #default>
          <cp-nav-bar
            :back="() => (show = false)"
            :title="patient.id ? '编辑患者' : '添加患者'"
            right-text="保存"
            @click-right="onClickRight"
          ></cp-nav-bar>
          <van-form>
            <van-field
              v-model="patient.name"
              label="真实姓名"
              autocomplete="off"
              placeholder="请输入真实姓名"
            />
            <van-field
              v-model="patient.idCard"
              label="身份证号"
              autocomplete="off"
              placeholder="请输入身份证号"
            />
            <van-field label="性别">
              <template #input>
                <!-- {{ patient.gender }} -->
                <cp-radio-btn v-model="patient.gender" :options="options"></cp-radio-btn>
              </template>
            </van-field>
            <van-field label="默认就诊人">
              <template #input>
                <van-checkbox v-model="defaultFlag" round />
              </template>
            </van-field>
          </van-form>
          <van-action-bar>
            <van-action-bar-button text="删除" @click="del" v-if="patient.id" />
          </van-action-bar>
        </template>
      </van-popup>
    </div>
  </div>
</template>

<script lang="ts" setup>
import cpRadioBtn from '@/components/cp-radio-btn.vue'
import cpNavBar from '@/components/cp-nav-bar.vue'
import cpIcon from '@/components/cp-icon.vue'
import { AddPatientInfo, getPatientInfo, EditPatientInfo, DelPatientInfo } from '@/services/patient'
import type { patientInfo } from '@/types/user'
import { ref } from 'vue'
import { computed } from 'vue'
import { showConfirmDialog, showToast } from 'vant'
import Validator from 'id-validator'

const show = ref(false)

// 初始化数据
const initPatient: patientInfo = {
  name: '',
  idCard: '',
  defaultFlag: 0,
  gender: 0
}
const patient = ref<patientInfo>({ ...initPatient })
const options = [
  {
    label: '男',
    value: 1
  },
  {
    label: '女',
    value: 0
  }
]

// 获取家庭档案

const patientData = ref<patientInfo[]>()
const getPatient = async () => {
  let res = await getPatientInfo()
  // console.log(res.data)
  patientData.value = res.data
  // console.log(patientData.value)
}
getPatient()

// 弹出弹框
const showPopup = (item?: patientInfo) => {
  // console.log(item)
  // 解构数据
  if (item) {
    const { id, name, idCard, defaultFlag, gender } = item
    patient.value = { id, name, idCard, defaultFlag, gender }
  } else {
    // 清空表单
    patient.value = { ...initPatient }
  }

  show.value = true
}

// 将默认值转换
const defaultFlag = computed({
  get() {
    return patient.value.defaultFlag == 1 ? true : false
  },
  set(value) {
    patient.value.defaultFlag = value ? 1 : 0
  }
})
// 点击保存 添加或编辑
const onClickRight = async () => {
  if (!patient.value.name) return showToast('就诊人姓名不能为空')
  if (!patient.value.idCard) return showToast('就诊人身份证号不能为空')
  const validate = new Validator()
  if (!validate.isValid(patient.value.idCard)) return showToast('身份证号不正确')
  console.log(validate.getInfo(patient.value.idCard))
  console.log(patient.value.gender)

  const { sex } = validate.getInfo(patient.value.idCard)
  if (patient.value.gender !== sex) return showToast('性别和身份证不一致')

  // 添加患者
  patient.value.id
    ? await EditPatientInfo({ ...patient.value })
    : await AddPatientInfo({ ...patient.value })
  // console.log(add)
  showToast(patient.value.id ? '编辑成功' : '添加成功')
  getPatient()
  show.value = false
}

const del = async () => {
  showConfirmDialog({
    title: '温馨提示',
    message: '确定要删除吗？'
  })
  await DelPatientInfo(patient.value.id as string)
  showToast('删除成功')
  getPatient()
  show.value = false
}
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

::v-deep {
  .van-checkbox__icon .van-icon {
    width: 15px;
    height: 15px;
    line-height: 15px;
  }
  .van-checkbox__icon--checked .van-icon {
    color: var(--van-white);
    background-color: var(--cp-primary);
    border-color: var(--cp-primary);
  }
  .van-action-bar-button {
    background-color: var(--cp-bg);
    color: var(--cp-price);
  }
}
</style>
