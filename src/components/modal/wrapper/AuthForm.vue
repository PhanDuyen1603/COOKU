<template>
  <div class="modal__wrapper">
    <div class="modal__content" :styles="{ maxWidth: maxWidth }">
      <slot/>
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(['close'])
defineProps({
  maxWidth: {
    type: String,
    default: '650px'
  }
})
const close = () => {
  emit('close')
}
</script>

<style lang="scss" scoped>
.modal__wrapper {
  // position: fixed;
  // top: 50%;
  // left: 50%;
  // transform: translate(-50%, -50%);
  // z-index: 101;
  // min-width: 500px;
  // max-width: calc(100vw - 2rem);
  // background: #fff;
  border-radius: 8px;
  padding: 0;
  overflow: hidden;
  // vertical-align: middle;
  // display: inline-block;
  // text-align: initial;
}
</style>