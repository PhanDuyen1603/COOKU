<template>
  <Teleport to="body">
    <div v-if="listTopCenter.length" class="toasts toasts__top--center">
      <div v-for="item in listTopCenter" :key="item.id">
        <ToastSuccess v-bind="item.props" :id="item.id" @close="close(item)" />
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { computed } from 'vue'
import useToastStore from '~/stores/toast.store'

const $store = useToastStore()
const { $wait } = useNuxtApp()


const listTopCenter = computed(() => $store.list.filter(i => i.vertical === 'top').slice(-5).reverse())
const close = async (item) => {
  if(item.beforeClose) {
    if(item.beforeClose() === false) {
      return
    }
  }
  const {id} =item
  const element = document.querySelector(`[data-id="${id}"]`)
  if(element) element.classList.add('toast-close')
  await $wait(500)
  $store.removeToast(id)
  item.resolve()
}
</script>

<style lang="scss" scoped>
.toasts > div {
  margin-bottom: 10px;
}
.toasts__top--center {
  position: fixed;
  top: 20%;
  left: 50%;
  transform: translateX(-50%);
  z-index: 999999;

  min-width: 304px;
  min-height: 60px;

}
</style>