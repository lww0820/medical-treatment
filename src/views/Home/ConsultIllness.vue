<template>
  <div class="consult-illness-page">
    <cp-nav-bar title="图文问诊"></cp-nav-bar>
    <div class="illness-tip van-hairline--bottom">
      <img class="img" src="@/assets/avatar-doctor.svg" />
      <div class="info">
        <p class="tit">在线医生</p>
        <p class="tip">请描述你的疾病或症状、是否用药、就诊经历，需要我提供什么样的帮助</p>
        <p class="safe"><cp-icon name="consult-safe" /><span>内容仅医生可见</span></p>
      </div>
    </div>
    <!-- 表单 -->
    <div class="illness-form">
      <van-field
        type="textarea"
        v-model="form.illnessDesc"
        placeholder="请详细描述您的病情，病情描述不能为空"
      />
      <div class="item">
        <p>本次患病多久了？</p>
        <cp-radio-btn v-model="form.illnessTime" :options="timeOptions"></cp-radio-btn>
      </div>
      <div class="item">
        <p>此次病情是否去医院就诊过？</p>
        <cp-radio-btn v-model="form.consultFlag" :options="flagOptions"></cp-radio-btn>
      </div>
    </div>
    <!-- 上传图片 -->
    <div class="illness-img">
      <van-uploader
        :after-read="onAfterRead"
        @delete="onDeleteImg"
        v-model="fileList"
        max-count="9"
        max-size="5*1024*1024"
        upload-icon="photo-o"
        upload-text="上传图⽚"
      />
      <p class="tip" v-if="fileList.length <= 0">上传内容仅医生可见，最多9张图，最大5MB</p>
    </div>
    <div class="btn">
      <van-button :class="{ disabled }" type="primary" @click="next(form)" round block
        >下一步</van-button
      >
    </div>
  </div>
</template>

<script lang="ts" setup>
import cpNavBar from '@/components/cp-nav-bar.vue'
import cpRadioBtn from '@/components/cp-radio-btn.vue'
import { IllnessTime, FlagOptions } from '@/enum'
import router from '@/router'
import { Upload } from '@/services/consult'
import { useConsultStore } from '@/stores/consult'
import type { CousultIllness, Image } from '@/types/consult'
import { showConfirmDialog } from 'vant'
import type { UploaderAfterRead, UploaderFileListItem } from 'vant/lib/uploader/types'
import { computed } from 'vue'
import { ref } from 'vue'
import { onMounted } from 'vue'
const store = useConsultStore()
const timeOptions = [
  { value: IllnessTime.Week, label: '一周内' },
  { value: IllnessTime.Month, label: '一月内' },
  { value: IllnessTime.HalfYear, label: '半年内' },
  { value: IllnessTime.More, label: '大于半年' }
]

const flagOptions = [
  { value: FlagOptions.isFlag, label: '就诊过' },
  { value: FlagOptions.unFlag, label: '未就诊过' }
]

const form = ref<CousultIllness>({
  illnessDesc: '',
  illnessTime: undefined,
  consultFlag: undefined,
  pictures: []
})

const fileList = ref<Image[]>([])
const onAfterRead: UploaderAfterRead = async (item) => {
  // TODO 上传图⽚
  if (Array.isArray(item)) return
  if (!item.file) return
  // 开始上传
  item.status = 'uploading'
  item.message = '上传中...'
  let res = await Upload(item.file)

  try {
    item.status = 'done'
    item.message = ''
    item.url = res.data.url
    form.value.pictures?.push(res.data)
  } catch {
    item.status = 'done'
    item.message = '上传失败'
  }
}
const onDeleteImg = (item: UploaderFileListItem) => {
  // TODO 删除图⽚
  form.value.pictures = form.value.pictures?.filter((pic) => pic.url !== item.url)
}

// 点击跳转至选择患者页
const next = (item: CousultIllness) => {
  store.setIllness(item)
  router.push('/user/patient?isChange=1')
}

const disabled = computed(
  () =>
    !form.value.illnessDesc ||
    form.value.illnessTime === undefined ||
    form.value.consultFlag === undefined
)

// 数据回显
onMounted(async () => {
  console.log(111)

  if (store.consult.illnessDesc) {
    await showConfirmDialog({
      title: '温馨提示',
      message: '是否回填您之前填写的信息呢？',
      closeOnPopstate: false
    })
    const { illnessDesc, illnessTime, consultFlag, pictures } = store.consult
    form.value = { illnessDesc, illnessTime, consultFlag, pictures }
    // 图⽚回显
    fileList.value = pictures || []
  }
})
</script>

<style lang="scss" scoped>
.consult-illness-page {
  .illness-tip {
    display: flex;
    padding: 15px;
    .img {
      width: 52px;
      height: 52px;
      border-radius: 4px;
      overflow: hidden;
      margin-top: 10px;
    }
    .info {
      margin-left: 10px;
      .tit {
        font-size: 16px;
        margin-bottom: 5px;
      }
      .tip {
        background-color: var(--cp-bg);
        padding: 12px;
        font-size: 13px;
        color: var(--cp-text3);
        margin-bottom: 10px;
      }
      .safe {
        font-size: 10px;
        color: var(--cp-text3);
        display: flex;
        align-items: center;
        .cp-icon {
          font-size: 12px;
          margin-right: 2px;
        }
      }
    }
  }
  .illness-form {
    padding: 15px;
    .van-field {
      padding: 0;
      &::after {
        border-bottom: none;
      }
    }
    .item {
      > p {
        padding: 15px 0;
        color: var(--cp-text3);
      }
    }
  }
  .illness-img {
    padding: 15px;
    display: flex;
    align-items: center;
    .tip {
      color: var(--cp-tip);
      font-size: 12px;
    }
    ::v-deep() {
      .van-uploader {
        &__preview {
          &-delete {
            left: -6px;
            top: -6px;
            border-radius: 50%;
            background-color: var(--cp-primary);
            width: 20px;
            height: 20px;
            &-icon {
              transform: scale(0.9) translate(-22%, 22%);
            }
          }
          &-image {
            border-radius: 8px;
            overflow: hidden;
          }
        }
        &__upload {
          border-radius: 8px;
        }
        &__upload-icon {
          color: var(--cp-text3);
        }
      }
    }
  }
}

.btn {
  padding: 15px;
  .van-button {
    background-color: var(--cp-primary);
    border-color: var(--cp-primary);
    &.disabled {
      opacity: 1;
      background: #fafafa;
      color: #d9dbde;
      border: #fafafa;
    }
  }
}
</style>
