<template>
  <div class="section-6">
    <Form ref="infoSubmit" v-slot="observe" :validation-schema="validationSchema">
      <div class="d-flex row">
        <div class="col-6">
          <Field v-slot="{ field }" name="postname">
            <div class="input-text-wrap">
              <input
                v-model="title"
                type="text"
                :placeholder="`${$t('post.form.name')} (*)`"
                class="input-texts"
                v-bind="field"
              />
            </div>
          </Field>
          <ErrorMessage name="postname" class="error-red" />

        </div>
        <div class="col-6">
          <Field v-slot="{ field }" name="postcategory">
            <input type="hidden" v-bind="field" v-model="category">
            <div class="input-text-wrap d-flex">
              <select
                class="input-texts"
                :value="category"
                @change="changeValue(observe, $event)"
              >
                <option value="" disabled selected >{{ $t('post.form.chose') }} *</option>
                <option v-for="(item, index) in categories" :value="item.title">{{item.title}}</option>
              </select>
              <div class="wrap-icon">
                <img src="/images/arrow-down.png" />
              </div>
            </div>
          </Field>
          <ErrorMessage name="postcategory" class="error-red" />

        </div>

        <div class="col-12 mt-3">
          <Field
            v-slot="{ errors, field }"
            name="Nội dung"
            rules="required"
          >
            <vue-editor
              id="editor"
              v-model="content"
              class="edit--wrap"
              name="Nội dung"
              data-placeholder="Mô tả"
              useCustomImageHandler
              :editorToolbar="customToolbar"
              @image-added="handleImageAdded"
            ></vue-editor>
            <span class="error-red mt-3">{{ errors[0] }}</span>
          </Field>
        </div>

        <div class="col-12 add-image mt-4">
          <div class="row">
            <div class="col-12">
              <div class="input-text-wrap mt-0">
                <input
                  v-model="tags"
                  type="text"
                  placeholder="Tag (cách nhau bởi dấu phẩy)"
                  class="input-texts background-none"
                />
              </div>
            </div>
            <div class="col-12">
              <div class="ps-4 d-flex flex-column">
                <label class="text-normal">
                  {{ $t('post.form.thumb') }}
                  <span>(*)</span>
                </label>
                <LazyTemplateRecipeCreateGallery
                  ref="gallery"
                  :gallery="images"
                  @addGallery="addGalleryImage"
                  @removeGalleryImage="removeImage"
                />
              </div>
            </div>
          </div>
        </div>

        <div class="d-flex justify-content-center align-items-center">
          <span
            v-if="loadingInsert"
            role="status"
            class="spinner-border spinner-border-sm"
          >
            <span class="visually-hidden">Loading...</span>
          </span>
          <button
            class="recipe-create__submit-btn"
            :disabled="loadingInsert"
            @click.prevent="submit"
          >
              {{ actionType === 'create' ? $t('post.form.action_create') : $t('post.form.action_update') }}
            <img src="/images/Vector-submit.png" alt="submit" />
          </button>
        </div>
      </div>
    </Form>
  </div>
</template>
<script>
import { Form, Field, ErrorMessage } from 'vee-validate'
import { VueEditor } from "vue3-editor";
export default {
  components: {
    Form, Field, ErrorMessage, VueEditor
  },
  props: {
    actionType: {
      type: String,
      default: 'create',
    },
    type: {
      type: String,
      default: 'post',
    },
    modelValue: {
      type: [Object, Array],
      default:() => {}
    }
  },
  data() {
    this.validationSchema = {
      postname: 'required',
      postcategory: 'required',
    }
    this.customToolbar = [
      ['bold', 'italic', 'underline'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['image', 'code-block'],
    ]
    return {
      loading: true,
      loadingInsert: false,
      tags: '',
      show: false,
    }
  },

  async setup(props) {
    const { find, create, update } = useStrapi()
    const { $$user, $toast, $wait, $showLoading } = useNuxtApp()
    const router = useRouter()
    const category =  ref('')
    const content = ref('')
    const title = ref('')
    const images = reactive([])
    const featured_media = ref(null)
    const { actionType, modelValue } = props

    const categories = await find('post-categories')

    const submitForm = async () => {
      const formData = {
        featured_media: featured_media.value,
        author: unref($$user),
        collections: [],
        comments: [],
        content: content.value,
        title: title.value,
        steps: [],
        ingredients: [],
        processings: [],
        likes: [],
      }
      const matchCategory = categories.find(x => category.value === x.title)
      formData.post_categories = [matchCategory.id]

      // formData.tags = this.getTags(this.tags)
      if(actionType === 'create') {
        await handleCreate(formData)
      } else {
        await handleUpdate(formData)
      }
      // this.loadingInsert = false
    }

    const handleCreate = async (formData) => {
      try {
        $showLoading(true)
        const res = await create('posts', formData)
        $toast.show({
          message: 'đăng bài viết thành công',
          type: 'success'
        })
        await $wait(1000)
        router.push({ name: 'post-slug', params: {  slug: res.slug } })
      } catch (error) {
        $toast.show({
          message: 'đăng bài viết thất bại',
          type: 'error'
        })
        $showLoading(false)
        console.log(error)
      }
    }
    // TODO: update image
    const handleUpdate = async (formData) => {
      try {
        $showLoading(true)
        const res = await update('posts', modelValue?.id ,formData)
        $toast.show({
          message: 'Cập nhật bài viết thành công',
          type: 'success'
        })
        await $wait(1000)
        router.push({ name: 'post-slug', params: {  slug: res.slug } })
      } catch (error) {
        $toast.show({
          message: 'Cập nhật bài viết thất bại',
          type: 'error'
        })
        $showLoading(false)
        console.log(error)
      }
    }

    return {
      categories,
      category,
      content,
      title,
      images,
      featured_media,
      submitForm
    }
  },
  mounted() {
    if(document) this.loading = false
    if(process.client && this.modelValue?.id) {
      this.title = this.modelValue.title
      this.category = this.modelValue.post_categories?.[0]?.title
      this.content = this.modelValue.content
      this.images = [this.$$strapi.getMediaLink(this.modelValue.featured_media)]
    }
  },
  updated() {
    if(this.modelValue?.id) {
      this.$refs.infoSubmit?.setFieldValue('postname', this.title)
      this.$refs.infoSubmit?.setFieldValue('postcategory', this.category)
    }
  },
  methods: {
    submit() {
      this.$refs.infoSubmit.validate().then((valid) => {
        if (valid) {
          return this.submitForm()
        }
      })
    },
    handleCreat() {
      this.$refs.infoSubmit.validate().then((valid) => {
        if (valid) {
          return this.submitForm()
        }
      })
    },
    getTags(tags) {
      if (tags !== '') {
        const arrTags = tags.split(', ')
        return arrTags
      }
      return []
    },

    addGalleryImage(e, data) {
      this.featured_media = e.id
      this.images[0] = e.image
    },

    changeValue(observe, $event) {
      observe.setFieldValue('postcategory', $event.target.value)
      this.category = $event.target.value
    }
  },
}
</script>

<style lang="scss" scoped>
#ration {
  -webkit-appearance: none;
  -moz-appearance: none;
}
.add-image {
  margin-top: 25px;
  .img-wrap img {
    border-radius: 10px;
    }
}
.error-red {
  color: red;
  margin-top: -10px;
  padding-bottom: 10px;
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
select {
  -webkit-appearance: none;
  -moz-appearance: none;
  text-indent: 1px;
  text-overflow: '';
}
.quillWrapper {
  --border-color: #fbe4c8;
}

.recipe-create__submit-btn{
  border: none !important;
}
</style>
