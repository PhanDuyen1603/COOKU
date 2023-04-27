<template>
  <div class="mt-1 mb-2 image" style="box-shadow: rgb(99 99 99 / 20%) 0px 2px 8px 0px;">
    <div class="d-flex mr-4 justify-content-between align-items-center cursor-pointer">
      <div
        class="d-flex align-items-center"
        @click="addCollection(data)"
      >
        <div
          class="border-radius-15 wcollections mr-2"
          :class="'image' + getListImages(data).length"
        >
          <div
            v-for="(itemImage, i) in getListImages(data)"
            :key="i"
            class="image"
          >
            <img
              :src="itemImage"
            />
          </div>
        </div>

        <div class="ms-3">
          <p class="text-custom fw-bold text-start">
            {{ data.name }}
          </p>
          <p class="text-start text-small">
            {{ data.is_public ? 'Công khai' : 'Cá nhân  ' }}
          </p>
        </div>

      </div>
      <div class="btn-remove-collection pe-4">
        <div v-if="unref($$isSigned) && isEditable" class="icon icon-wrap-circle" @click="removeItem('Bộ sưu tập')">
          <img
            class="btn p-0 trash-icon"
            src="/icons/trash-bin.svg"
          />
        </div>
      </div>
      <!---->
    </div>
  </div>
</template>

<script>
import card from './card.mixin';

export default {
  mixins: [card],
  props: {
    data: {
      type: Object,
      default: () => {}
    },
    type: {
      type: String,
      default: 'recipe'
    }
  },
  methods: {
    getListImages(collection) {
      const $strapi = this.$$strapi
      const collections = collection[`${this.type}s`]
      const listElementInCollection = [...collections].filter((ele, index) => index < 3)
      const images = listElementInCollection.map((item) => $strapi.getMediaLink(item.featured_media || {})) || []
      return images
      // console.log(collections)
    }
  }
}
</script>

<style lang="scss" scoped>

.wcollections {
  width: 150px;
  height: 150px;
  overflow: hidden;
  display: flex;
  flex-wrap: wrap;
}
.image1 .image {
  height: 100%;
}
.image2 .image {
  height: 50%;
}
.image3 .image {
  height: 33.33%;
}
.image4 .image {
  height: 50%;
}
.image1 .image,
.image2 .image,
.image3 .image {
  width: 100%;
}
.image2 .image {
  height: 50%;
}
.image3 .image:nth-child(2),
.image3 .image:nth-child(3),
.image4 .image {
  width: 50%;
}
.image3 .image {
  height: 50%;
}
.scroll-bar::-webkit-scrollbar {
  width: 6px;
  background-color: #f5f5f5;
  display: block;
}
.wcollections img {
  width: 100%;
  max-height: 100%;
  object-fit: cover;
  height: 100%;
}
.btn-tip {
  border-color: #615375 !important;
  color: #615375 !important;
  &:hover {
    background-color: #615375 !important;
    color: #fff !important;
  }
}
.btn-post {
  border-color: #65A06B !important;
  color: #65A06B !important;
  &:hover {
    background-color: #65A06B !important;
    color: #fff !important;
  }
}
.text-custom {
  font-size: 25px;
  line-height: 34px;
}

.trash-icon {
  width: 24px;
  height: 24px;
}
.icon-wrap-circle {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  transition: all .2s ease;
  &:hover {
    background-color: var(--clr-gray);
  }
}
</style>