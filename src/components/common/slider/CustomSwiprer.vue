<template>
  <swiper
    v-bind="customOptions"
  >
    <swiper-slide v-for="(image, index) in dataList" :key="index" :class="slideItemClass">
      <slot name="slider" :data="image" :index="index">
        <div class="object-image slider__image" :style="defaultStyles">
          <img
            :src="$$strapi.getMediaLink(image.image, 'small')"
            @load="onImageLoad($event)"
            @error="onImageError($event)"
            loading="lazy"
          >
        </div>
      </slot>
    </swiper-slide>
    <slot name="dots">
    </slot>
    <slot name="arrows">
    </slot>
  </swiper>
</template>

<script>
import { Autoplay, Navigation, Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/vue';
import commonProps from '../commonProps';
import 'swiper/css';
import 'swiper/css/lazy';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default {
  components: {
    Swiper,
    SwiperSlide,
},
  extends: commonProps,
  props: {
    options: {
      type: Object,
      default:() => {}
    },
    isAutoPlay: {
      type: Boolean,
      default: false
    },
    dots: {
      type: Boolean,
      default: false
    },
    itemShow: {
      type: Number,
      default: 1
    },
    itemsSpace: {
      type:  Number,
      default: 10
    },
    slideItemClass: {
      type: String,
      default: ''
    },
  },
  data() {
    return {
      listImage: []
    }
  },
  computed: {
    customOptions() {
      let modules = [ Navigation ]
      if(this.isAutoPlay) modules.push(Autoplay)
      if(this.dots) modules.push(Pagination)
      return {
        slidesPerView: this.itemShow,
        spaceBetween: this.itemsSpace,
        pagination: { clickable: true },
        modules,
      }
    },
    defaultStyles() {
      return {
        maxWidth: `calc(100vw/${this.itemShow})`,
        paddingTop: '400px'
      }
    }
  },
  mounted() {
    this.listImage = this.dataList
  },
  methods: {
    onImageLoad(e) {
      const el = e.target || e.path[0]

      if (el && el.naturalHeight <= 1) {
        this.errorSrc = '/images/image_loading.svg'
      }

      if (this.handleThumbImg) {
        if (el.naturalHeight < el.naturalWidth) {
          el.classList.add('fixHeight')
        }
      }
    },
    onImageError(e) {
      const el = e.target || e.path[0];

      if (el && el.naturalHeight <= 1) {
        this.errorSrc = '/images/image_loading.svg'
      }

    },
  }
}
</script>

<style>
.slider__image  {
  border-radius: 20px;
}
.slider-banner {

}
</style>