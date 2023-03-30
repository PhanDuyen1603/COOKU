<template>
  <div class="section-heading section-heading-custom1">
    <div class="heading-bg"></div>
    <div class="heading-content">
      <div class="content-wrapper">
        <h3>{{ title }}</h3>
        <p>{{ subtitle }}</p>
        <button class="heading-action">
          <div class="di-icon">
            <img src="/icons/plus.svg" />
          </div>
          <div class="di-text">
            them mon an
          </div>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: 'Title'
    },
    subtitle: {
      type: String,
      default: 'Subtitle'
    },
    // title: {
    //   type: Object,
    //   default: () => ({
    //     text: 'title',
    //     tag: 'h2'
    //   })
    // },
    // subtitle: {
    //   type: Object,
    //   default: () => ({
    //     text: 'subtitle',
    //     tag: 'p'
    //   })
    // }
  },

}
</script>

<style lang="scss" scoped>
.section-heading {
  --elm-height: 500px;
  --menu-height: 60px;
  --elm-width: 100%;
  --elm-main-clr: var(--clr-red-primary);

  &.section-heading-custom1 {
    width: var(--elm-width);
    height: calc(var(--elm-height) - var(--menu-height));
    .heading-bg {
      // background-color: antiquewhite;
      background-image: url('/images/head-banner-1.png');
      background-repeat: no-repeat;
      background-position: center;
      background-size: cover;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: var(--elm-height);
      z-index: -1;
    }
  }

  .heading-content {
    width: 400px;
    background-color: #fff;
    padding: 24px;
    border-radius: 20px;
    box-shadow: 1px 1px 5px 4px rgba(20,24,31,.06);
    position: absolute;
    top: 120px;
    right: calc(100% / 6);
    h3 {
      font-size: var(--fs-xxl);
      font-weight: 700;
      margin-bottom: 20px;
      color: var(--elm-main-clr)
    }
    p {
      font-size: var(--fs-sm);
      color: var(--clr-gray-dark);
    }
  }
}
.content-wrapper {
  position: relative
}
.heading-action {
  position: absolute;
  top: 0;
  right: 0;
  transition: width 0.5s;
  border-radius: 60px;
  height: 32px;
  width: 32px;
  // display: inline-flex;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: none;
  background-color: var(--elm-main-clr);
  &:hover {
    width: 120px;
    .di-text {
      display: block;
      visibility: visible;
      opacity: 1;
    }
  }
  .di-icon {
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
  }
  .di-text {
    display: none;
    visibility: hidden;
    opacity: 0;
    white-space: nowrap;
    font-size: var(--fs-sm);
    color: #fff;
    transition: all .5s ease-in;
  }
}
</style>