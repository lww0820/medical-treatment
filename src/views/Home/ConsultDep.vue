<template>
  <div class="consult-dep-page">
    <cp-nav-bar title="选择科室"></cp-nav-bar>
    <div class="wrapper">
      <van-sidebar v-model="active">
        <van-sidebar-item v-for="(item, index) in allDep" :key="index" :title="item.name" />
      </van-sidebar>
      <div class="sub-dep">
        <router-link
          to="/consult/illness"
          @click="store.setDep(item.id)"
          v-for="item in subDep"
          :key="item.id"
          >{{ item.name }}</router-link
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import cpNavBar from '@/components/cp-nav-bar.vue'
import { getAllDep } from '@/services/consult'
import type { TopDep } from '@/types/consult'
import { computed, onMounted, ref } from 'vue'
import { useConsultStore } from '@/stores/consult'
const store = useConsultStore()
const active = ref(0)

// ⼀级科室
const allDep = ref<TopDep[]>([])
onMounted(async () => {
  const res = await getAllDep()
  allDep.value = res.data
})

// ⼆级科室，注意：组件初始化没有数据 child 可能拿不到
const subDep = computed(() => allDep.value[active.value]?.child)
</script>

<style lang="scss" scoped>
.van-sidebar {
  width: 114px;

  &-item {
    padding: 14px;
    color: var(--cp-tag);
    &--select {
      color: var(--cp-main);
      font-weight: normal;
      &::before {
        display: none;
      }
    }
  }
}
.wrapper {
  height: calc(100vh - 46px);
  overflow: hidden;
  display: flex;
  .sub-dep {
    flex: 1;
    height: 100%;
    overflow-y: auto;
    > a {
      display: block;
      padding: 14px 30px;
      color: var(--cp-dark);
    }
  }
}
</style>
