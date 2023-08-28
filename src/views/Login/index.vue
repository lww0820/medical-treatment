<template>
  <div class="login-page">
    <!-- navbar -->
    <cp-nav-bar right-text="注册" @click-right="handleClickRight"></cp-nav-bar>

    <!-- 头部 -->
    <div class="login-header">
      <h3>密码登录</h3>
      <p>
        <a href="JavaScript:;">短信验证码登录</a>
        <van-icon name="arrow" />
      </p>
    </div>

    <!-- form -->
    <van-form autocomplete="off" @submit="login">
      <van-field v-model="mobile" :rules="mobileRules" type="tel" placeholder="请输入手机号" />
      <van-field
        v-model="password"
        :rules="passwordRules"
        :type="show ? 'text' : 'password'"
        placeholder="请输入密码"
      >
        <template #button>
          <cp-icon @click="show = !show" :name="`login-eye-${show ? 'on' : 'off'}`"></cp-icon>
        </template>
      </van-field>
      <div class="cp-cell">
        <van-checkbox v-model="agree"
          ><span>我已同意</span><a href="javascript:;">用户协议</a><span>及</span
          ><a href="javascript:;">隐私条款</a></van-checkbox
        >
      </div>
      <div class="cp-cell">
        <van-button block round type="primary" native-type="submit">登录</van-button>
      </div>
      <div class="cp-cell">
        <a href="javascript:;">忘记密码？</a>
      </div>
    </van-form>

    <!-- footer -->
    <div class="login-other">
      <van-divider>第三方登录</van-divider>
      <div class="icon">
        <img src="@/assets/qq.svg" alt="qq" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import cpNavBar from '@/components/cp-nav-bar.vue'
import router from '@/router'
import { ref } from 'vue'
import cpIcon from '@/components/cp-icon.vue'
import { mobileRules, passwordRules } from '@/utils/rules'
import { showToast } from 'vant'

const mobile = ref('13230000001')
const password = ref('abc12345')
const agree = ref(false)
const show = ref(false)

const handleClickRight = () => {
  router.push('/register')
}

const login = () => {
  if (!agree.value) {
    showToast('请勾选用户协议')
    return
  }
}
</script>

<style lang="scss" scoped>
.login- {
  &header {
    padding: 30px 30px 50px 30px;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    // padding: 0 15px;
    h3 {
      font-size: 24px;
      font-weight: normal;
    }
    a {
      font-size: 15px;
      color: var(--cp-text1);
    }
  }
  &other {
    margin-top: 60px;
    padding: 0 30px;
    .icon {
      display: flex;
      justify-content: center;
      img {
        width: 36px;
        height: 36px;
        padding: 4px;
      }
    }
  }
}
.van-field__button {
  font-size: 16px;
}
.van-form {
  padding: 0 14px;
  .cp-cell {
    height: 52px;
    line-height: 24px;
    padding: 14px 16px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    .van-checkbox {
      a {
        color: var(--cp-primary);
        padding: 0 5px;
      }
    }
    .van-button {
      background: var(--cp-primary);
      border-color: var(--cp-primary);
    }
  }
}

::v-deep {
  .van-checkbox__icon--checked .van-icon {
    color: var(--van-white);
    background-color: #16c2a3;
    border-color: #16c2a3;
  }
}
</style>
