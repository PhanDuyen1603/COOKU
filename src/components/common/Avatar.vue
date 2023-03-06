<template>
  <div
    v-if="data && data.avatar"
    class="rounded-circle object-image"
  >
    <img
      :src="$$strapi.getMediaLink(data)"
      :alt="data.username"
    >
  </div>
  <div v-else class="icon__circle avatar" :class="'avatar--'+ size">
     <img src="icons/avatar.svg" alt="">
  </div>
</template>

<script>
import commonProps from './commonProps';

export default {
  extends: commonProps,
  props: {
    size: {
      type: String,
      default: 'normal',
      validator: val => ['normal', 'small', 'big' ,'large'].includes(val.toLowerCase()),
    },
  }
}
</script>

<style lang="scss">
.avatar {
  background-color: var(--clr-gray) !important;
  position: relative;
  border-radius: 50%;
  img {
    position: absolute;
    top: 50%;
    left: 50%;
    object-fit: contain;
    transform: translate(-50%, -50%);
  }
  &--normal {
    padding-top: 40px;
    width: 40px !important;
  }
  &--small {
    padding-top: 30px;
    width: 30px !important;
  }
  &--large {
    padding-top: 74px;
    width: 74px !important;
  }
  &--big {
    padding-top: 60px;
    width: 60px !important;
  }
}
</style>