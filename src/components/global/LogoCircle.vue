<template>
  <div class="logo__wrapper">
    <img
      src="/images/logo.png"
      alt="logo-Cooku"
    />
  </div>
</template>

<style lang="scss" scoped>
.logo__wrapper {
  width: 50px;
  height: 50px;
  background-color: #e5625c;
  border-radius: 50%;
  overflow: hidden;
  padding-top: 50px;
  position: relative;
  margin: auto;
  img {
    width: 100%;
    height: 100%;
    position: absolute;
    background-color: #e5625c;
    top: 0;
    left: 0;
    object-fit: contain;
  }
}
</style>