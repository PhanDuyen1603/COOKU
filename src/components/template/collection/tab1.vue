<template>
  <div>
    <CommonListColorCircle />
    <div class>
      <div class="fw-bold mt-2 fw-light text-gray text-custom-title uppercase">
        {{ $t('collection') }} {{ title }}
      </div>
      <div class="mt-2 mb-2 text-gray"></div>
    </div>
    <div class="padding-tab content-body hidden-scroll-bar mt-3 " :class="collections.length > 0 ? 'scroll-bar' : ''">
      <div v-if="collections.length > 0" class="">
        <div v-if="$$isSigned" class="text-decoration-underline text-start mb-3 text-custom">
          {{ $t('collection.personal_collection') }}
        </div>
        <span
          v-if="loading"
          role="status"
          class="spinner-border spinner-border-sm"
        >
          <span class="visually-hidden">Loading...</span>
        </span>
        <div class="row">
          <div v-for="(collection, index) in collections" :key="index" class="col-12 col-md-6">
            <div class="mt-1 mb-2 image" style="box-shadow: rgb(99 99 99 / 20%) 0px 2px 8px 0px;">
              <div class="d-flex mr-4 justify-content-between modals-custom">
                <div
                  class="d-flex align-items-center"
                  @click="addCollection(collection, item)"
                >
                  <div
                    class="border-radius-15 wcollections mr-2"
                    :class="'image' + getListImages(collection).length"
                  >
                    <div
                      v-for="(itemImage, i) in getListImages(collection)"
                      :key="i"
                      class="image"
                    >
                      <img
                        v-if="itemImage"
                        :src="$$strapi.getStrapiMedia(itemImage)"
                      />
                    </div>
                  </div>

                  <div>
                    <p class="text-custom fw-bold text-start">
                      {{ collection.name }}
                    </p>
                    <p class="text-start text-small">
                      {{ collection.is_public ? $t('collection.public') : $t('collection.personal') }}
                    </p>
                  </div>
                </div>
                <!---->
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="collections.length === 0 && $$user" class="mt-5 mb-5 text-center">
        {{ $t('collection.message.no_collection') }}
      </div>
    </div>
    <div class="content-footer my-3">
      <button
        class="btn btn-rounded fw-bold text-yellow btn-outline-secondary collection-btn"
        :class="`btn-${type}`"
        @click="step2"
      >
        {{ $t('collection.action.create_new') }}
      </button>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    item: {
      type: Object,
      required: true,
    },
    collections: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      items: [],
      images: [],
      loading: false,
    }
  },

  setup(props, { emit }) {
    const { $cloneDeep, $toast } = useNuxtApp()
    const { update } = useStrapi()

    const addCollection = async (collection, item) => {
      let formData = $cloneDeep(collection)
      formData[`${props.type}s`].push(props.item)
      await editData(formData, collection, item)
    }
    const editData = async (formData, collection) => {
      $toast.show({
        message: 'Đang thêm vào bộ sưu tập...'
      })
      try {
        await update('collections', collection.id , { [props.type + 's']: formData[props.type + 's'] })
        $toast.show({
          message: 'Thêm món ăn thành công',
          type: 'success'
        })
        emit('success-step', collection)
      } catch (error) {
        console.log(error)
        $toast.show({
          message: 'Đã có lỗi xảy ra',
          type: 'error'
        })
      }
    }

    return {
      addCollection,
      editData
    }
  },

  methods: {
    step2() {
      this.$emit('next-step', 'step2')
    },
    checkEmpty(array, item) {
      return typeof array.find((c) => c.id === item.id)
    },
    getListImages(collection) {
      const collections = collection[`${this.type}s`]
      const listElementInCollection = [...collections].filter((ele, index) => index < 3)
      const images = listElementInCollection.map((item) => item.featured_media ? item.featured_media.url : '')
      return images
    }
  },
}
</script>
<style lang="scss">
.text-custom-title {
  font-size: 2rem;
}

.wcollections {
  width: 150px;
  height: 150px;
  overflow: hidden;
  display: flex;
  flex-wrap: wrap;
}
.image1 .image {
  height: 100%;
}   .image2 .image {
  height: 50%;
}   .image3 .image {
  height: 33.33%;
}   .image4 .image {
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
.scroll-bar::-webkit-scrollbar-thumb {
  background-color: #000000;
}
.scroll-bar::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgb(0 0 0 / 30%);
  background-color: #f5f5f5;
}
.scroll-bar {
  height: 400px;
  overflow-x: hidden;
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
.content-footer {
  display: flex;
  justify-content: center;
}
.collection-btn {
  --bs-btn-color: var(--clr-orange-primary);
  --bs-btn-border-color: var(--clr-orange-primary);
  --bs-btn-hover-bg: var(--clr-orange-primary);
  --bs-btn-hover-border-color: var(--clr-orange-primary);
}
</style>