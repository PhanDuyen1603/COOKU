<template>
  <div class="toast__item" :data-id="id" :class="[`toast__item--${type}`, `toast__item--${position}`]">
    <div class="toast__icon toast__icon--success">
      <img :src="`/icons/toast/${ icons[type] || icons.success }.svg`" class="filter-white" alt="">
    </div>
    <div class="toast__content">
      <p class="toast__title">{{ titleMessage[type] || titleMessage.show }}</p>
      <p class="toast__message">{{ message }}</p>
    </div>
    <div class="toast__icon toast__icon--close" @click="$emit('close', { id })">
      <img src="/icons/toast/x-close.svg" alt="">
    </div>
  </div>
</template>

<script setup>
const titleMessage = {
  success: 'Success',
  error: 'Error',
  show: 'Info',
  warning: 'Warning'
}

const icons = {
  success: 'check',
  show: 'info',
  error: 'exclamation-point',
}

defineEmits(['close'])
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
  },
  id: {
    type: [String, Number]
  }
})
</script>

<style lang="scss" scoped>
.toast__item {
  --elm-clr: #2BDE3F;

  &--success {
    --elm-clr: #2BDE3F;
  }

  &--error {
    --elm-clr: #f5113b;
  }

  &--show {
    --elm-clr: #1D72F3;
  }

  &--warning {
    --elm-clr: #FFC007;
  }

  display: flex;
  padding: 20px 0;
  position: relative;

  min-width: 400px;
  min-height: 50px;

  display: flex;
  align-items: center;

  background-color: #fff;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 6px;
  overflow: hidden;

  animation-name: appear;
  animation-duration: .5s;

  &:after {
    content: '';
    position: absolute;
    left: 0;
    width: 6px;
    height: 100px;
    background-color: var(--elm-clr);
  }

}

.toast__content {
  padding: 0 60px;
  width: 100%;
}

.toast__icon {
  --icon-size: 25px;

  position: absolute;
  top: 50%;
  transform: translateY(-50%);

  width: var(--icon-size);
  height: var(--icon-size);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;

  cursor: pointer;
  img {
    width: 15px;
    height: 15px;
  }
  &--success {
    background-color: var(--elm-clr);
    left: calc((60px - var(--icon-size)) / 2);
  }
  &--close {
    right: calc((60px - var(--icon-size)) / 2);
  }
}
.toast__title {
  font-weight: 700;
}
.toast__message {
  font-size: var(--fs-sm);
  color: var(--clr-text-gray);
}
.toast-close {
  animation-name: close;
  animation-duration: .6s;
}

@keyframes appear {
  from {
    opacity: 0;
    transform: translateX(100px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes close {
  from {
    opacity: 1;
    transform: translateX(0);
  }
  to {
    opacity: 0;
    transform: translateX(-100px);
  }
}
</style>