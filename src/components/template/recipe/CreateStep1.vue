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
                v-model="formData.title"
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
              @click="openTimePickerModal(observe)"
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

          <Field v-slot="{ field }" name="servings">
            <input type="hidden" v-bind="field" v-model="formData.serving">
            <div class="input-text-wrap d-flex">
              <select
                class="input-texts"
                :value="formData.serving"
              >
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
            <input v-model="formData.tags" type="text" placeholder="Tag (cách nhau bởi dấu phẩy)" name="tag" class="input-texts" />
          </div>

          <div class="add-image">
            <label>
              1 hình đại diện (ảnh món ăn hoàn thiện)
              <span>(*)</span>
            </label>

            <Field v-slot="{ field }" name="files" rules="required">
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
            :class="{ active: formData.level === 'easy' }"
            class="select-button"
            @click="formData.level = 'easy'"
          >
            Dễ
          </div>
          <div
            :class="{ active: formData.level === 'normal' }"
            class="select-button"
            @click="formData.level = 'normal'"
          >
            Trung bình
          </div>
          <div
            :class="{ active: formData.level === 'hard' }"
            class="select-button"
            @click="formData.level = 'hard'"
          >
            Khó
          </div>
        </div>
        <div class="input-text-wrap texts-area mb-3">
          <textarea v-model="formData.content" class="input-texts" placeholder="Mô tả" cols="4" rows="4"></textarea>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Form, Field, ErrorMessage } from 'vee-validate'
import useCookStore from '~/stores/cook.store'

import { readableTime } from '~/utils/StringUtils'
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
// TODO: serving and image with vee-validate
  data() {
    this.validationSchema = {
      recipeName: 'required',
      cooktime: 'required',
      servings: 'required',
      // files: 'required|image'
    }
    return {
      numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    }
  },

  async setup(props) {
    const { find } = useStrapi()
    const token = useStrapiToken()
    const { $modal, $config, $axios, $$strapi } = useNuxtApp()
    const $store = useCookStore()
    const files = ref(null)
    const basicInfo = ref(null)

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

    const formData = reactive({
      title: '',
      content: null,
      featured_media: null,
      serving: null,
      level: 'normal',
      tags: null,
      cooking_time: null,
      //
      recipe_categories: [],
      regional: null,
      processing: null,
    })

    const image = ref('')

    // methods
    const createImage = async (file, observe) => {
      loadingImage.value = true
      const fileData = new FormData()
      fileData.append('files', file)

      const { data } = await $axios.post(
        strapiBaseUri + '/upload',
        fileData, {
          headers: {
            Authorization: 'Bearer ' + unref(token),
          },
        }
      )
      image.value = $$strapi.getStrapiMedia(data[0].url)
      observe.setFieldValue('files', $$strapi.getStrapiMedia(data[0].url))
      formData.featured_media = data[0].id
      loadingImage.value = false
    }

    const onFileChange = async (e, observe) => {
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
        if (category.name === 'processing') {
          formData.processing = data.id
          extraData.processing.name = data.title
        }
        if (category.name === 'meal') {
          formData.recipe_categories.push(data.id)
          extraData.meal.name = data.title
        }
        if (category.name === 'regional') {
          formData.regional = data.id
          extraData.regional.name = data.title
        }
      }
    }

    const openTimePickerModal = async (observe) => {
      const time = await $modal.show({
        component: 'ModalRecipeTimePicker'
      })
      // console.log(time)
      cooking_time.humanReadable = readableTime(time)
      cooking_time.time = time.hours * 60 + time.minutes
      formData.cooking_time = time.hours * 60 + time.minutes
      observe.setFieldValue('cooktime', cooking_time.humanReadable)
    }

    const changeServing = (observe, $event) => {
      formData.serving = $event.target.value
      observe.setFieldValue('servings', $event.target.value)
    }

    onMounted(async () => {
      const recipe = $store.data
      if(recipe.id) {
        formData.title = recipe.title
        formData.content = recipe.content
        formData.featured_media = recipe.featured_media
        formData.serving = recipe.serving + ''
        formData.level = recipe.level
        // tags: null,
        formData.cooking_time = recipe.cooking_time
        cooking_time.humanReadable = readableTime({minutes: recipe.cooking_time})
        cooking_time.time = recipe.cooking_time

        formData.recipe_categories = recipe.recipe_categories
        formData.regional = recipe.regional
        formData.processing = recipe.processing

        extraData.processing = {...$store.processing}
        extraData.regional = {...$store.regional}
        extraData.meal.name = recipe.recipe_categories?.length ? recipe.recipe_categories[0].title : ''

        image.value = $$strapi.getMediaLink(recipe.featured_media)

        basicInfo.value.setFieldValue('recipeName', recipe.title)
        basicInfo.value.setFieldValue('cooktime', readableTime({minutes: recipe.cooking_time}))
        basicInfo.value.setFieldValue('servings', recipe.serving + '')
        // basicInfo.value.setFieldValue('files', $$strapi.getMediaLink(recipe.featured_media))
      }
    })

    return {
      openModal,
      onFileChange,
      openTimePickerModal,
      changeServing,
      // ref
      basicInfo,

      loadingImage,
      createCategories,
      cooking_time,
      extraData,
      formData,
      image,
      files
    }

  },

  methods: {
    async validate() {
      const result = await this.$refs.basicInfo.validate()
      if(!result.valid) {
        this.$toast.show({ message: 'Vui lòng kiểm tra thông tin bước 1' })
        this.$emit('swtich-step', 1)
        return false
      }
      return true
    }
  }
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
</style>
