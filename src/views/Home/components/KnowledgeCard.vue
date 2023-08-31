<template>
  <div class="knowledge-card van-hairline--bottom">
    <div class="head">
      <div class="top">
        <van-image class="avatar" round src="https://img01.yzcdn.cn/vant/cat.jpeg" />
        <div class="info">
          <p class="name">{{ item.creatorName }}</p>
          <p class="dep van-ellipsis">{{ item.creatorDep }}</p>
        </div>
        <van-button class="btn" size="small" round>{{
          item.likeFlag == 0 ? '已关注' : '+ 关注'
        }}</van-button>
      </div>
    </div>
    <div class="body">
      <p class="title van-ellipsis">{{ item.title }}</p>
      <p class="intro van-multi-ellipsis--l2">
        {{ item.content.replace(/<[^>]+>/g, '') }}
      </p>
      <div class="imgs">
        <van-image v-for="url in item.coverUrl" :key="url" :src="url" />
      </div>
      <div class="logs">
        <span>10 收藏</span>
        <span>50 评论</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Knowledge } from '@/types/consult'

defineProps<{
  item: Knowledge
}>()
</script>

<style lang="scss" scoped>
.knowledge-card {
  padding: 20px 0 16px;
  .head {
    .top {
      display: flex;
      align-items: center;
      ::v-deep {
        .van-image__img {
          width: 38px;
          height: 38px;
          margin-right: 10px;
        }
      }
      .info {
        width: 200px;
        padding-right: 10px;
        .name {
          color: var(--cp-text2);
        }
        .dep {
          color: var(--cp-tip);
          font-size: 12px;
        }
      }
      .btn {
        padding: 0 12px;
        border-color: var(--cp-primary);
        color: var(--cp-primary);
        height: 28px;
        width: 72px;
      }
    }
  }
  .body {
    .title {
      font-size: 16px;
      margin-top: 8px;
      font-weight: normal;
    }
    .intro {
      // font-size: 12px;
      margin-top: 7px;
      color: var(--cp-text3);
      line-height: 2;
    }
    .imgs {
      ::v-deep {
        .van-image {
          width: 106px;
          height: 106px;
          margin-right: 12px;
          border-radius: 12px;
          overflow: hidden;
          &:last-child {
            margin-right: 0;
          }
        }
      }
    }
    .logs {
      margin-top: 10px;
      span {
        color: var(--cp-tip);
        font-size: 12px;
        margin-right: 16px;
      }
    }
  }
}
</style>
