<template>
  <section class="banner-home">
    <slick
      v-if="dataList.gallery"
      ref="slickone"
      :options="slickOptions"
      class="slider-slick-home-top flex-view"
    >
      <div
        v-for="gallery in dataList.gallery"
        :key="gallery.id"
        class="item"
      >
        <div v-if="gallery && gallery.image" class="image-banner">
          <a :href="gallery.link" target="_blank" :data-url="gallery.image.url">
            <img :src="getMediaLink(gallery.image, 'small')" class="img-response" loading="lazy">
          </a>
        </div>
      </div>
    </slick>
  </section>
</template>
<script>
import Slick from 'vue-slick'

export default {
  components: {
    slick: Slick,
  },
  props: {
    dataList: {
      type: [Array, Object],
      default: () => []
    }
  },
  data() {
    this.slickOptions = {
      dots: true,
      infinite: true,
      speed: 300,
      slidesToShow: 1,
      centerMode: true,
      variableWidth: true,
      autoplay: true,
      autoplaySpeed: 3000,
    }
    return {
      loading: true
    }
  },
  methods: {
    getMediaLink,
  },
}
</script>

<style lang="scss" scoped>
.banner-home {
  .slick-dots {
    bottom: -40px;
  }

  .slick-dotted.slick-slider {
    margin-bottom: 40px;
  }
}
.slider-slick-home-top {

.item:nth-child(1),
.item:nth-child(3) {
  width: calc(25% - 20px);
}

.item:nth-child(2) {
  width: calc(50% - 20px);
}

.image-banner {
  width: calc(566px - 2px);
  height: calc(383px - 2px);
  border: 1px solid #f2f2f2;
  box-shadow: 0px 4px 6px rgb(44 44 44 / 4%);
  border-radius: 4px;
  box-sizing: content-box;
  background: #fff;
}

.item:nth-child(2) {
  .image-banner {
    border-radius: 40px;
  }
}

.image-banner {
  height: 383px;
  box-shadow: 2px 2px 10px 1px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  border-radius: 40px;
}

.item:nth-child(1) {
  .image-banner {
    border-top-right-radius: 40px;
    border-bottom-right-radius: 40px;
  }
}

.item:nth-child(3) {
  .image-banner {
    border-top-left-radius: 40px;
    border-bottom-left-radius: 40px;
  }
}
}
</style>