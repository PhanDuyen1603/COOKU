<template>
  <div class="toast__item" :class="[`toast__item--${type}`, `toast__item--${position}`]">
    <p class="toast__message">{{ message }}</p>
  </div>
</template>

<script setup>
defineEmits(['clost'])
defineProps({
  type: {
    type: String,
    default: ''
  },
  message: {
    type: String,
    default: ''
  },
  position: {
    type: String,
    default: 'top_center'
  }
})
</script>

<style lang="scss" scoped>
.toast__item {
  display: flex;
  padding: 10px;

  min-width: 300px;
  min-height: 50px;

  // background-color: #fff;
  // border: 1px solid #000;
  // border-radius: 10px
}
</style>