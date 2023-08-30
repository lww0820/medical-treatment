<template>
  <div class="cp-radio-btn">
    <a
      v-for="item in options"
      class="item"
      :class="modelValue == item.value ? 'active' : ''"
      href="javascript:;"
      :key="item.value"
      @click="toggleItem(item.value)"
      >{{ item.label }}</a
    >
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  options: {
    value: number | string
    label: string
  }[]

  modelValue: string | number
}>()

const emits = defineEmits<{
  (e: 'update:modelValue', value: string | number): void
}>()
const toggleItem = (val: string | number) => {
  emits('update:modelValue', val)
}
</script>

<style lang="scss" scoped>
.cp-radio-btn {
  display: flex;
  flex-wrap: wrap;
  .item {
    display: inline-block;
    height: 32px;
    min-width: 60px;
    line-height: 30px;
    padding: 0 14px;
    text-align: center;
    border: 1px solid var(--cp-bg);
    background-color: var(--cp-bg);
    margin-right: 10px;
    box-sizing: border-box;
    color: var(--cp-text2);
    margin-bottom: 10px;
    border-radius: 4px;
    transition: all 0.3s;
    &.active {
      background-color: var(--cp-plain);
      border-color: var(--cp-primary);
    }
  }
}
</style>
