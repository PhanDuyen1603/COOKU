<template>
  <Teleport to="body">
    <div v-if="listTopCenter.length" class="toasts toasts__top--center">
      <div v-for="item in listTopCenter" :key="item.id">
        <ToastSuccess v-bind="item.props" @close="close(item)" />
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { computed } from 'vue'
import useToastStore from '~/stores/toast.store'

const $store = useToastStore()


const listTopCenter = computed(() => $store.list.filter(i => i.vertical === 'top').slice(-5).reverse())
const close = (item) => {
  if(item.beforeClose) {
    if(item.beforeClose() === false) {
      return
    }
  }
  $store.removeToast(item.id)
  item.resolve()
}
</script>

<style lang="scss" scoped>
.toasts__top--center {
  position: fixed;
  top: 20%;
  left: 50%;
  transform: translateX(-50%);
  z-index: 999999;

  min-width: 304px;
  min-height: 60px;

  background-color: #fff;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
}
</style>