<template>
  <div class="d-flex mb-4 add-image" :class="`gallery-${index}`">

    <div v-show="gallery.length < 4"  class="img-wrap position-relative mt-0 mb-3">
      <img src="/images/plus-big.png" />
      <input
        accept="image/*"
        type="file" required
        class="upload file-hidden"
        @change="handleGalleryUploads(index, $event)"
      />
    </div>
    <span v-if="loading" role="status" class="spinner-border spinner-border-sm">
      <span class="visually-hidden">Loading...</span>
    </span>

    <div v-if="gallery.length" :ref="'gallery-image gallery-image' + (index)" class="d-flex flex-wrap" :class="'gallery-image' + (index)">

      <div class="item-image hidden">
        <span class="close"></span><img src="/images/image_loading.svg" class="m-0" width="104px" />
      </div>
      <div class="item-image hidden">
        <span class="close"></span><img src="/images/image_loading.svg" class="m-0" width="104px" />
      </div>
      <div class="item-image hidden">
        <span class="close"></span><img src="/images/image_loading.svg" class="m-0" width="104px" />
      </div>
      <div class="item-image hidden">
        <span class="close"></span><img src="/images/image_loading.svg" class="m-0" width="104px" />
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'Gallery',
  props: {
    index: {
      type: Number,
      default: 1
    },
    gallery: {
      type: Array,
      required: true
    },
    key: {
      type: [String, Number],
      default: 0
    }
  },
  data() {
    return {
      loading: false,
    }
  },

  mounted() {
    const self = this;
    const gallery = document.querySelectorAll(`.gallery-image${this.index} .item-image .close`)
    if(this.gallery.length) this.renderGallery()
    gallery.forEach((element, i) => {
      element.addEventListener('click', function() {
        const pos = Array.from(gallery).indexOf(this)
        self.removeImage(pos)
      })
    })
  },

  watch: {
    gallery(val, oldVal) {
      this.renderGallery(val)
    },
  },

  setup(props) {
    const { $config } = useNuxtApp()
    const strapiBaseUri = unref($config).public.strapi.url
    const token = useStrapiToken()

    return {
      strapiBaseUri,
      token
    }
  },
  methods: {
    async handleGalleryUploads(index, event) {
      this.loading = true
      const files = event.target.files
      const lengthGalley = this.gallery.length
      if (files.length > 4 || lengthGalley === 4) {
        this.loading = false
        return this.$toast.show({
          message: 'Bạn không được tải lên quá 4 hình ảnh',
          type: 'error'
        })
      }

      for (let i = 0; i < files.length; i++) {
        const formData = new FormData()
        formData.append('files', files[i])
        const { data } = await this.$axios.post(
          this.strapiBaseUri + '/upload',
          formData,
          {
            headers: {
              Authorization: 'Bearer ' + this.token,
            },
          }
        )

        if (i + lengthGalley + 1 === 5) {
          this.showUpload = false
          this.loading = false
          return alert('Bạn không được nhập quá 4 hình ảnh')
        } else {
          const imageUrl = this.$$strapi.getStrapiMedia(data[0].url)
          await this.$emit('addGallery', {
            pos: index,
            image: imageUrl,
            id: data[0].id
          })

          const imageWrapElement = document.querySelector(`.gallery-image${this.index} .item-image:nth-child(${i + lengthGalley + 1})`)
          const imageElement = document.querySelector(`.gallery-image${this.index} .item-image:nth-child(${i + lengthGalley + 1}) img`)
          const hasHiddenClass = imageWrapElement?.classList.contains('hidden')
          hasHiddenClass && imageWrapElement.classList.remove('hidden')
          if(imageElement) imageElement.src =  imageUrl
        }
      }
      if (this.gallery.length === 4) {
        this.showUpload = false
        this.loading = false
      }
      this.loading = false
    },

    removeImage(imageIndex) {
      this.$emit('removeGalleryImage', {
        pos: this.index,
        imageIndex
      })
      const image = document.querySelector(`.gallery-${this.key} .gallery-image${this.index} .item-image:nth-child(${imageIndex})`)
      image.remove()
      document.querySelector(`.gallery-image${this.index}`).innerHTML +=
      `<div class="item-image hidden">
        <span class="close"></span><img src="" width="104px" />
      </div>`
    },

    renderGallery(galery = this.gallery) {
      galery.forEach((url, index) => {
        const imageWrapElement = document.querySelector(`.gallery-image${this.index} .item-image:nth-child(${index + 1})`)
        const imageElement = document.querySelector(`.gallery-image${this.index} .item-image:nth-child(${index + 1}) img`)
        const hasHiddenClass = imageWrapElement?.classList.contains('hidden')
        hasHiddenClass && imageWrapElement.classList.remove('hidden')
        if(imageElement) imageElement.src = url
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.add-image {
  --elm-width: 110px;
  --elm-height: 110px;
  --elm-rounded: 10px;
  --elm-space: 10px;

  font-weight: 300;
  font-size: 20px;
  line-height: 27px;
  color: var(--clr-gray-dark);
  text-align: left;

  label {
    span {
      color: #df8c26;
    }
  }

  .item-image,
  .img-wrap {
    width: var(--elm-width);
    height: var(--elm-width);
    background: #f1f1f1;
    border-radius: var(--elm-rounded);
    position: relative;
    overflow: hidden;
  }

  .img-wrap {
    margin-right: var(--elm-space);
    margin-top: 15px;
    cursor: pointer;
    border: 1px dashed #b0b0b0;
    img {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
  }

  .item-image {
    margin-right: var(--elm-space);
    padding-top: var(--elm-height);
    img {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      object-fit: cover;
    }
  }
  .file-hidden {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: 0;
    padding: 0;
    font-size: 1.25rem;
    cursor: pointer;
    opacity: 0;
  }
}
</style>