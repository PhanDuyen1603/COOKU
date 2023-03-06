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