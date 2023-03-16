<template>
  <div id="cooking" class="tab-pane fade">
    <Form as="div" class="row" :validation-schema="validationSchema" ref="createStep3" >
      <div
        v-for="(item, index) in formData"
        :key="index"
        class="col-6"
        @click="activeItem = index"
      >
        <div class="wrap-items" :class="{ 'active-wrap-items': index === activeItem }">
          <Field
            :name="`methodTitle-${index}`"
            v-slot="{ field }"
          >
            <div class="d-flex justify-content-between align-items-center">
              <div class="title-step">{{ index + 1 }}</div>
              <input
                v-model="formData[index].title"
                v-bind="field"
                class="select-input-wrap"
                placeholder="Tiêu đề bước"
                type="text"
              />
              <img src="/images/trash-bin-red.png" @click="removeForm(index, item)" />
            </div>
          </Field>
          <ErrorMessage :name="`methodTitle-${index}`" class="error-red" />

          <Field :name="`methodDesc-${index}`" v-slot="{ field }">
            <div class="content-step">
              <textarea
                v-model="formData[index].desc"
                v-bind="field"
                cols="2"
                class="input-step input-step__area bg-white"
                placeholder="Mô tả bước*"
                type="text"
              />
            </div>
          </Field>
          <ErrorMessage :name="`methodDesc-${index}`" class="error-red"/>

          <LazyTemplateRecipeCreateGallery
            ref="gallery"
            :gallery="formData[index]?.gallery"
            :index="index"
            :key="index"
            @addGallery="addGalleryImage"
            @removeGalleryImage="removeI"
          />

          <div class="d-flex justify-content-between align-items-center">
            <input :id="'oneCooking' + index" v-model="formData[index].type" type="radio" class="hidden-input" value="prepare" />
            <label
              class="select-button select-button--sm fix-btn-tabs"
              :class="{ active: formData[index].type === 'prepare'}"
              :for="'oneCooking' + index">
              Sơ chế
            </label>
            <input :id="'twoCooking' + index" v-model="formData[index].type" type="radio" class="hidden-input" value="cook" />
            <label
              class="select-button select-button--sm fix-btn-tabs"
              :class="{ active: formData[index].type === 'cook' || !formData[index].type }"
              :for="'twoCooking' + index"
            >
              Chế biến
            </label>
            <input :id="'threeCooking' + index" v-model="formData[index].type" type="radio" class="hidden-input" value="decorate" />
            <label
              class="select-button select-button--sm fix-btn-tabs"
              :class="{ active: formData[index].type === 'decorate' }"
              :for="'threeCooking' + index"
            >
              Trang trí
            </label>
          </div>

        </div>
      </div>
    </Form>
    <div class="col-12 d-flex justify-content-end">
      <div class="button-add" @click="addForm">
        <div class="icon__circle">
          <img class="fix-ic" with="15" height="15" src="/images/plus-big.png" />
        </div>
        Thêm
      </div>
    </div>
  </div>
</template>

<script>
import { Form, Field, ErrorMessage } from 'vee-validate'

const initFormData = {
  id: 0,
  title: '',
  desc: '',
  type: 'prepare',
  gallery: [],
  galleryId: [],
}

export default {
  components: {
    Form, Field, ErrorMessage
  },
  data() {
    return {
      activeItem: 0,
      showUpload: true,
      loading: false,
    }
  },
  setup(props) {
    const formData = reactive([{
      id: 0,
      title: '',
      desc: '',
      type: 'prepare',
      gallery: [],
      galleryId: [],
    }])

    const validationSchema = reactive({
      [`methodTitle-0`]: 'required',
      [`methodDesc-0`]: 'required',
    })

    watch('formData.length', ( newValue, oldValue ) => {
      if(newValue > oldValue) {
        validationSchema = {
          validationSchema,
          [`methodTitle-${newValue - 1}`]: 'required',
          [`methodDesc-${newValue - 1}`]: 'required',
        }
      } else {
        const cloneOb = $cloneDeep(validationSchema)
        delete cloneOb[`methodTitle-${oldValue - 1}`]
        delete cloneOb[`methodDesc-${oldValue - 1}`]
        validationSchema = cloneOb
      }
    })

    const addForm = () => formData.push({
      id: 0,
      title: '',
      desc: '',
      type: 'prepare',
      gallery: [],
      galleryId: [],
    })

    const removeForm = (index, item) => {
      if (formData.length === 1) {
        return this.$toast.error('Món ăn cần ít nhất cách nấu')
      }
      formData.splice(index, 1)
    }

    const addGalleryImage = (e) => {
      const galery = formData[e.pos]
      galery.gallery = [...galery.gallery, e.image]

      galery.galleryId = [...galery.galleryId, e.id]
    }

    const removeI = (e) => {
      const galery = formData[e.pos]
      galery.gallery.splice(e.imageIndex, 1)
      galery.galleryId.splice(e.imageIndex, 1)
    }

    return {
      formData,

      addForm,
      removeForm,
      addGalleryImage,
      removeI
    }
  },
  // computed: {
  //   ...mapGetters({ steps: 'modules/cook/steps' }),
  // },
  // mounted() {
  //   if (this.steps?.length > 0) {
  //     this.steps.forEach((element, index) => {
  //       if (index > 0) this.addField()
  //       this.data[index].id = element.id
  //       this.data[index].title = element.title
  //       this.data[index].desc = element.content
  //       this.data[index].type = element.type
  //       // this.data[index].gallery = element.galleries.map(media => this.getStrapiMedia(media.url))
  //       this.data[index].galleryId = element.galleries.map(media => media.id)
  //       this.$refs.gallery[0].renderGallery(this.data[index].gallery)
  //     });
  //   }

  // },
  methods: {

    openModel(modalName) {
      this.$emit('open-modal', modalName)
    },

    addField() {
      this.showUpload = true
      this.data.push(initFormData)
    },

    removeField(index, item) {
      if (this.data?.length === 1) {
        return this.$toast.error('Món ăn cần ít nhất cách nấu')
      }
      this.data.splice(index, 1)
    },

    async validate() {
      const result = await this.$refs.createStep3.validate()
      if (!result.valid) {
        this.$toast.show({ message: 'Vui lòng kiểm tra thông tin bước 3' })
        this.$emit('swtich-step', 3)
        return false
      }
      return true
    }

  },
}
</script>

<style lang="scss" scoped>

.hidden-input {
  opacity: 0;
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

.item-image img {
  display: block;
  width: 100%;
  height: 100%;
  -o-object-fit: cover;
  object-fit: cover;
  border-radius: 10px;
  margin-left: 0 !important;
  margin-right: 0 !important;
}

.add-image>div:nth-child(1) {
  display: flex;
  flex-wrap: wrap;
}

.item-image {
  position: relative;
}

.hidden {
  display: none;
}

.item-image .close {
  width: 20px;
  height: 20px;
  background: url('/images/close-image-recipe-v2.png') center center;
  background-size: cover;
  cursor: pointer;
  margin-right: 10px;
  position: absolute;
  right: -20px;
  top: -7px;
}
.input-step__area {
  font-size: 1rem;
  font-weight: var(--font-weight-5);
  color: var(--clr-gray-600);
}
</style>
