<template>
  <transition name="fade" mode="out-in" appear :duration="500">
    <slot></slot>
  </transition>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  & > * {
    transition-duration: 500ms;
    transition-property: opacity, transform;
    transition-timing-function: cubic-bezier(0.6, 0.15, 0.35, 0.8);
  }
}

$delay: 300ms;
$delayStep: 300ms;

.fade-enter,
.fade-leave-to {
  & > * {
    opacity: 0;
    transform: translateY(40px);
  }
}
.fade-enter-active {
  & > * {
    &:nth-child(2) {
      transition-delay: $delay;
    }
    &:nth-child(3) {
      transition-delay: $delay + $delayStep;
    }
  }
}
.fade-leave-active {
  & > * {
    &:nth-child(1) {
      transition-delay: $delay + $delayStep;
    }
    &:nth-child(2) {
      transition-delay: $delay;
    }
  }
}
</style>