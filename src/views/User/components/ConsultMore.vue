<template>
  <div class="cp-consult-more">
    <van-popover
      placement="top-start"
      v-model:show="showPopover"
      :actions="actions"
      @select="onSelect"
    >
      <template #reference> 更多 </template>
    </van-popover>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'

const showPopover = ref(false)
const props = defineProps<{
  disabled: boolean
}>()

const emit = defineEmits<{
  (e: 'on-delete'): void
  (e: 'on-pre'): void
}>()

const actions = computed(() => [
  { text: '查看处⽅', disabled: props.disabled },
  { text: '删除订单' }
])
const onSelect = (obj: { text: string; disabled: boolean }) => {
  // console.log(obj)
  if (obj.text === '查看处⽅') {
    emit('on-pre')
  } else if (obj.text === '删除订单') {
    emit('on-delete')
  }
}
</script>

<style lang="scss" scoped>
.cp-consult-more {
  flex: 1;
  color: var(--cp-tag);
}
</style>
