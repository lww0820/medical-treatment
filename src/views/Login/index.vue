<template>
  <div class="login-page">
    <!-- navbar -->
    <cp-nav-bar right-text="注册" @click-right="handleClickRight"></cp-nav-bar>

    <!-- 头部 -->
    <div class="login-header">
      <h3>{{ isPass ? '密码登录' : '短信验证码登录' }}</h3>
      <p @click="isPass = !isPass">
        <a href="JavaScript:;">{{ isPass ? '短信验证码登录' : '密码登录' }}</a>
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
        v-if="isPass"
      >
        <template #button>
          <cp-icon @click="show = !show" :name="`login-eye-${show ? 'on' : 'off'}`"></cp-icon>
        </template>
      </van-field>
      <van-field v-else v-model="code" :rules="codeRules" placeholder="请输入验证码">
        <template #button>
          <span @click="sendCode">{{ timer > 0 ? timer + 's后再发送' : '发送验证码' }}</span>
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
import { ref } from 'vue'
import cpIcon from '@/components/cp-icon.vue'
import { mobileRules, passwordRules, codeRules } from '@/utils/rules'
import { showToast } from 'vant'
import { loginByPassword, sendCodeApi, loginByCode } from '@/services/user'
import { useCounterStore } from '@/stores/user'
import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()

const mobile = ref('13230000010')
const password = ref('abc12345')
const code = ref('')
const codeCheck = ref()
const agree = ref(false)
const show = ref(false)
const useStore = useCounterStore()

const timer = ref(0)

const isPass = ref(true)

const handleClickRight = () => {
  router.push('/register')
}

const login = async () => {
  if (!agree.value) {
    showToast('请勾选用户协议')
    return
  }
  if (!isPass.value) {
    if (code.value !== codeCheck.value) {
      showToast('验证码输入错误')
      return
    }
  }
  const LoginRes = code.value
    ? await loginByCode(mobile.value, code.value)
    : await loginByPassword(mobile.value, password.value)

  try {
    useStore.setUser(LoginRes.data)

    router.replace((route.query.returnUrl as string) || '/user')
    showToast('登录成功')
  } catch (error) {
    console.log(error)
  }
}

// 发送验证码
const sendCode = async () => {
  if (timer.value > 0) return

  setInterval(() => {
    timer.value--
  }, 1000)
  let res = await sendCodeApi(mobile.value, 'login')
  showToast('发送成功')

  codeCheck.value = res.data.code
  timer.value = 60
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
