<template>
  <div v-bind="getDefaultProps">
    <img :src="src" :alt="alt" @error="onError"/>
  </div>
</template>

<script>
const percent = (a, b) => {
  return ((parseInt(a) / parseInt(b)) * 100) + '%'
}
export default {
  props: {
    ratio: {
      type: String,
      default: ''
    },
    height: {
      type: [String, Number],
      default: 0
    },
    width: {
      type: [String, Number],
      default: 0
    },
    src: {
      type: String,
      required: true
    },
    alt: {
      type: String,
      default: 'Cooku'
    },
    fitType: {
      type: String,
      default: 'contain'
    },
  },
  computed: {
    getDefaultProps() {
      const props = {
        style: {
          '--image-ratio': this.getImageRatio,
        },
        class: ['image__wrapper', `image__wrapper--${this.fitType}`],
        ...this.$attrs
      }
      if(this.width) props.style.width = this.getCleanWidth
      return props
    },
    getCleanHeight() {
      if (+this.height) return this.height + 'px'
      return this.height
    },
    getCleanWidth() {
      if (+this.width) return this.width + 'px'
      return this.width
    },
    getImageRatio() {
      if (this.width && this.height) return percent(this.height, this.width)
      if (this.ratio) {
        const splitRatio = this.ratio.split(':')
        return percent(splitRatio[1], splitRatio[0])
      }
      if (this.height) return this.getCleanHeight
      return '100%'
    },
    buildClass() {
      return `image--${this.fitType}`
    }
  },
  methods: {
    onError(e) {
      e.target.src = require('/images/image_loading.svg')
    }
  }
}
</script>

<style lang="scss" scoped>
.image {
  &__wrapper {
    position: relative;
    padding-top: var(--image-ratio);
    overflow: hidden;

    img {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 100%;
      width: 100%;
      object-fit: cover;
    }

    &--cover img {
      object-fit: cover;
    }

    &--fill img {
      object-fit: fill;
    }

    &--contain img {
      object-fit: contain;
    }
  }
}
</style>