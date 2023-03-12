<template>
  <div class="d-flex mb-4 add-image">

    <!-- <div v-show="gallery.length < 4" class="img-wrap me-3 max-image">
      <input ref="file" class="input-file" type="file" multiple accept="image/*"
        @change="handleGalleryUploads(index, $event)" />
      <img class="no-margin" src="/images/plus-big.png" />
    </div> -->
    <div v-show="gallery.length < 4"  class="img-wrap position-relative mt-0 mb-3">
      <img src="/images/plus-big.png" />
      <input accept="image/*" type="file" required class="upload file-hidden" @change="handleGalleryUploads(index, $event)" />
    </div>
    <span v-if="loading" role="status" class="spinner-border spinner-border-sm">
      <span class="visually-hidden">Loading...</span>
    </span>

    <div :ref="'gallery-image' + (index + 1)" class="d-flex flex-wrap" :class="'gallery-image' + (index + 1)">

      <div class="item-image hidden">
        <span class="close"></span><img src="" width="104px" />
      </div>
      <div class="item-image hidden">
        <span class="close"></span><img src="" width="104px" />
      </div>
      <div class="item-image hidden">
        <span class="close"></span><img src="" width="104px" />
      </div>
      <div class="item-image hidden">
        <span class="close"></span><img src="" width="104px" />
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
    }
  },
  data() {
    return {
      loading: false,
    }
  },
  mounted() {
    const self = this;
    const gallery = document.querySelectorAll(`.gallery-image${this.index + 1} .item-image .close`)
    gallery.forEach((element, index) => {
      element.addEventListener('click', function() {
        const pos = Array.from(gallery).indexOf(this)
        self.removeImage(pos)
      })
    })
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
        return this.$toast.error('Bạn không được tải lên quá 4 hình ảnh')
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
          const imageWrapElement = document.querySelector(`.gallery-image${this.index + 1} .item-image:nth-child(${i + lengthGalley + 1})`)
          const imageElement = document.querySelector(`.gallery-image${this.index + 1} .item-image:nth-child(${i + lengthGalley + 1}) img`)
          imageWrapElement.classList.remove('hidden')
          imageElement.src = imageUrl
          this.$emit('addGallery', {
            pos: index,
            image: imageUrl,
            id: data[0].id
          })
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
      const image = document.querySelector(`.gallery-image${this.index + 1} .item-image:nth-child(${imageIndex + 1})`)
      image.remove()
      document.querySelector(`.gallery-image${this.index + 1}`).innerHTML +=
      `<div class="item-image hidden">
        <span class="close"></span><img src="" width="104px" />
      </div>`
    },

    renderGallery(galery) {
      galery.forEach((url, index) => {
        const image = document.querySelector(`.gallery-image${this.index + 1} .item-image:nth-child(${index + 1}) img`)
        document.querySelector(`.gallery-image${this.index + 1} .item-image:nth-child(${index + 1})`).classList.remove('hidden')
        image.src = url
      })
    }
  }
}
</script>

<style>
.item-image {
  position: relative;
  border: 1px dashed #b0b0b0;
  border-radius: 10px;
  margin-right: 10px;
  width: 110px;
  height: 110px;
}
.img-wrap .input-file {
  opacity: 0;
  height: 100%;
  position: absolute;
  left: 0;
  z-index: 99;
  right: 0;
  cursor: pointer;
}
</style>