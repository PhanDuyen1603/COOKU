<template>
  <div class="modal__wrapper">
    <div class="modal__content" :styles="{ maxWidth: maxWidth }">
      <slot/>
    </div>
  </div>
</template>

<script setup>
defineProps({
  maxWidth: {
    type: String,
    default: '650px'
  }
})
</script>

<style lang="scss" scoped>
.modal__wrapper {
  position: fixed;
  z-index: 100002;
  top: 0;
  left: 0;
  widows: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.55);
  overflow: auto;
  text-align: center;
}
.modal__wrapper::before {
  content: '';
  width: 0;
  height: 100%;
  vertical-align: middle;
  display: inline-block;
}
.modal__content {
  min-width: 500px;
  max-width: calc(100vw - 2rem);
  background: #fff;
  border-radius: 8px;
  padding: 24px;
  vertical-align: middle;
  display: inline-block;
  text-align: initial;
}
.modal__head {
  margin-bottom: 1rem;
}
.modal__body,
.modal__footer {
  padding: 0 1rem
}
</style>