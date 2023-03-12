<template>
  <div id="info" class="tab-pane fade">
    <div class="d-flex row">
      <div class="col-6">
        <Form
          as="div"
          ref="basicInfo"
          :validation-schema="validationSchema"
          v-slot="observe"
        >
          <Field v-slot="{ field }" name="recipeName">
            <div class="input-text-wrap">
              <input
                v-model="Formdata.title"
                type="text"
                placeholder="Tên món ăn (*)"
                class="input-texts"
                v-bind="field"
              />
            </div>
          </Field>
          <ErrorMessage name="recipeName" class="error-red" />

          <Field v-slot="{ field }" name="cooktime" rules="required">
            <div
              class="input-text-wrap d-flex"
              @click="openModel('timeCook')"
            >
              <input
                :modelValue="cooking_time.humanReadable"
                v-bind="field"
                type="text"
                placeholder="Thời gian nấu (*)"
                class="input-texts" autocomplete="off"
              />
              <div class="wrap-icon">
                <img src="/images/arrow-down.png" />
              </div>
            </div>
          </Field>
          <ErrorMessage name="cooktime" class="error-red" />

          <Field v-slot="{ field }" name="servings" rules="required">
            <div class="input-text-wrap d-flex">
              <select id="ration" v-bind="field" v-model="Formdata.serving" class="input-texts" >
                <option value="" disabled selected >Số khẩu phần *</option>
                <option v-for="(item, index) in numbers" :key="index" :value="item">{{item}}</option>
              </select>
              <div class="wrap-icon">
                <img src="/images/arrow-down.png" />
              </div>
            </div>
          </Field>
          <ErrorMessage name="servings" class="error-red" />

          <div class="input-text-wrap">
            <input v-model="Formdata.tags" type="text" placeholder="Tag (cách nhau bởi dấu phẩy)" name="tag" class="input-texts" />
          </div>

          <div class="add-image">
            <label>
              1 hình đại diện (ảnh món ăn hoàn thiện)
              <span>(*)</span>
            </label>

            <Field v-slot="{ field }" name="files" rules="required">
              {{ field }}
              <div class="d-flex mt-3 mt-3">
                <div v-if="image" class="img-wrap mr-2 mt-0">
                  <img class="img-response" :src="image" />
                </div>
                <input v-bind="field" v-model="image" type="hidden" name="Hình đại diện">
                <span v-if="loadingImage" role="status" class="spinner-border spinner-border-sm">
                  <span class="visually-hidden">Loading...</span>
                </span>
                <div class="img-wrap position-relative mt-0 mb-3">
                  <img src="/images/plus-big.png" />
                  <input
                    accept="image/*"
                    type="file"
                    required
                    class="upload file-hidden"
                    @change="onFileChange($event, observe)"
                  />
                </div>
              </div>
            </Field>
            <ErrorMessage name="files" class="error-red" />
          </div>
        </Form>
      </div>

      <div class="col-6">
        <div
          v-for="item in createCategories" :key="item.id"
          class="input-text-wrap d-flex"
          @click="openModal(item)"
        >
          <input
            v-model="extraData[item.name].name"
            type="text"
            :placeholder="`${extraData[item.name].name} ${item.title} (${item.subTitle})`"
            class="input-texts"
          />
          <div class="wrap-icon">
            <img src="/images/arrow-down.png" />
          </div>
        </div>

        <div class="d-flex justify-content-between align-items-center">
          <div
            :class="{ active: Formdata.level === 'easy' }"
            class="select-button"
            @click="Formdata.level = 'easy'"
          >
            Dễ
          </div>
          <div
            :class="{ active: Formdata.level === 'normal' }"
            class="select-button"
            @click="Formdata.level = 'normal'"
          >
            Trung bình
          </div>
          <div
            :class="{ active: Formdata.level === 'hard' }"
            class="select-button"
            @click="Formdata.level = 'hard'"
          >
            Khó
          </div>
        </div>
        <div class="input-text-wrap texts-area mb-3">
          <textarea v-model="Formdata.content" class="input-texts" placeholder="Mô tả" cols="4" rows="4"></textarea>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Form, Field, ErrorMessage } from 'vee-validate'
// import useCookStore from '~/stores/cook.store'

import { categories } from '~/constants/recipe'
export default {
  props: {
    time: {
      type: String,
      default: null,
    },
    cookingTime: {
      type: Number,
      default: 0,
    },
  },

  components: {
    Form, Field, ErrorMessage
  },

  data() {
    this.validationSchema = {
      recipeName: 'required',
      cooktime: 'required|number',
      servings: 'required',
      files: 'required|image'
    }
    return {
      numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    }
  },

  async setup(props) {
    const { find } = useStrapi()
    const token = useStrapiToken()
    const { $modal, $config, $axios, $$strapi } = useNuxtApp()

    const files = ref(null)

    const strapiBaseUri = unref($config).public.strapi.url

    const createCategories = computed(() => categories.filter(i => i.slug !== 'nguyen-lieu'))

    const cooking_time = reactive({
      time: 0,
      humanReadable: '',
    })

    const loadingImage = ref(false)

    const extraData = reactive({
      processing: {
        name: '',
        id: 0
      },
      regional: {
        name: '',
        id: 0
      },
      meal: {
        name: ''
      }
    })

    const Formdata = reactive({
      title: '',
      content: null,
      featured_media: null,
      recipe_categories: null,
      processing: null,
      level: 'normal',
      serving: '',
      tags: null,
      cooking_time: null,
    })

    const image = ref('')

    // methods
    const createImage = async (file, observe) => {
      console.log(files)
      loadingImage.value = true
      const formData = new FormData()
      formData.append('files', file)

      const { data } = await $axios.post(
        strapiBaseUri + '/upload',
        formData, {
          headers: {
            Authorization: 'Bearer ' + unref(token),
          },
        }
      )
      image.value = $$strapi.getStrapiMedia(data[0].url)
      observe.setFieldValue('files', $$strapi.getStrapiMedia(data[0].url))
      Formdata.featured_media = data[0].id
      loadingImage.value = false
    }

    const onFileChange = async (e, observe) => {
      console.log(e, observe)
      const files = e.target.files || e.dataTransfer.files
      if (!files.length) return
      const imgPath = files[0].name
      const extn = imgPath.substring(imgPath.lastIndexOf('.') + 1).toLowerCase()
      if (
        extn === 'gif' ||
        extn === 'png' ||
        extn === 'jpg' ||
        extn === 'jpeg'
      ) {
        await createImage(files[0], observe)
        // console.log(files[0])
      } else {
        alert('Chưa đúng định dạng gif, png, jpg, jpeg')
      }
    }

    const openModal = async (category) => {
      console.log(category)
      let res = await find(category.service.api)
      if(typeof res === 'object' && !!res.data) res = res.data
      const data = await $modal.show({
        component: 'ModalRecipeIngredients',
        props: {
          style: {
            width: '900px'
          },
          dataList: res,
          tags: category.tags
        }
      })
      if (!!data) {
        if (category.name === 'processing') extraData.processing.name = data.title
        if (category.name === 'meal') extraData.meal.name = data.title
        if (category.name === 'regional') extraData.regional.name = data.title
      }
    }

    return {
      openModal,
      onFileChange,

      loadingImage,
      createCategories,
      cooking_time,
      extraData,
      Formdata,
      image,
      files
    }

  },

  methods: {
    async validate() {
      const result = await this.$refs.basicInfo.validate()
      console.log(result)
    }
  }
  // computed: {
  //   cookStore() { return useCookStore() },
  //   recipeData() { return this.cookStore.recipeData },
  //   cooking_time() { return this.cookStore.cooking_time },
  //   meal() { return this.cookStore.meal },
  //   processing() { return this.cookStore.processing },
  //   regional() { return this.cookStore.regional },
  // },

  // mounted() {
  //   if (this.recipeData && this.recipeData.id) {
  //     this.data.cooking_time = this.recipeData.cookingTime
  //     this.data.processing = this.recipeData.processing
  //     this.data.serving = this.recipeData.serving
  //     this.data.level = this.recipeData.level
  //     this.data.serving = this.recipeData.serving % 10
  //     this.data.tags = this.recipeData.tags.map(tag => tag.title).join(', ')
  //     this.data.title = this.recipeData.title
  //     this.data.content = this.recipeData.content
  //     this.data.featured_media = this.recipeData.featured_media.id
  //     this.image = this.$$strapi.getMediaLink(this.recipeData.featured_media, 'small')
  //     const tags = document.querySelector('input[name="tag"]')
  //     tags.setAttribute("disabled","true")
  //     tags.style.opacity = 0.5
  //   }
  // },
}

</script>

<style lang="scss">
  #ration {
    -webkit-appearance: none;
    -moz-appearance: none;
  }

  .add-image .img-wrap img {
    border-radius: 10px;
  }

  .error-red {
    color: red;
    margin-top: -10px;
    margin-left: 20px;
    font-size: var(--fs-sm);
    display: block;
  }

  .select-input {
    background: #fbfbfb;
    border-radius: 30px;
    padding: 5px 10px;
    border: none;
    font-size: 20px;
    line-height: 27px;
    color: #4f4f4f;
    outline: none;
    width: 100%;
  }

  .color {
    color: #757575 !important;
  }
  .input-text-wrap {
  background: #ffffff;
  border: 2px solid #fbe4c8;
  box-sizing: border-box;
  border-radius: 30px;
  padding: 5px 8px 5px 10px;
  // margin-bottom: 20px;
  margin: 10px;
  align-items: center;

  .input-texts {
    background: #fbfbfb;
    border-radius: 30px;
    padding: 5px 10px;
    border: none;
    font-size: 20px;
    line-height: 27px;
    color: #4f4f4f;
    outline: none;
    width: 90%;
  }

  .wrap-icon {
    width: 30px;
    height: 30px;
    padding: 5px 10px;
    background: #df8c26;
    border-radius: 100px;
    margin-left: 10px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width: 10px;
      height: 5px;
    }
  }
}
.select-button {
  background: #fbfbfb;
  border-radius: 20px;
  height: 43px;
  padding: 8px 10px;
  width: 100%;
  margin-right: 20px;
  font-size: 20px;
  line-height: 27px;
  color: #b0b0b0;
  margin-top: 10px;
  cursor: pointer;
  text-align: center;
  &.active {
    color: #fff;
    background: #df8c26;
  }
  &--sm {
    font-size: var(--fs-sm);
  }
}
.add-image {
  font-weight: 300;
  font-size: 20px;
  line-height: 27px;
  color: #b0b0b0;
  text-align: left;

  label {
    span {
      color: #df8c26;
    }
  }

  .img-wrap {
    width: 142px;
    height: 136px;
    background: #f1f1f1;
    border: 1px dashed #b0b0b0;
    border-radius: 10px;
    margin-top: 15px;
    cursor: pointer;
    position: relative;

    img {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
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
