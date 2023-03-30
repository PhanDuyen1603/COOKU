<template>
  <div class="comment__form align-items-center mb-3 mb-md-5 border-30px">
    <div class="comment__form--body">
      <div class="comment__form--input d-flex justify-content-between align-items-center mp-5 w-full">
        <!--TODO: v-autogrow -->
        <textarea
          v-model="form.content"
          :readonly="!$$isSigned"
          name="comment"
          class="w-full"
          placeholder="Nhập bình luận của bạn"
          spellcheck="false"
          @keyup.enter="submitComment"
        />
        <div class="d-flex">
          <!-- <button
            class="btn btn-browse py-2 px-6 mx-1 position-relative"
          >
            <img src="/icons/plus.svg" alt="gửi" class="position-absolute"/>
          </button> -->
          <button
            class="btn btn-browse py-2 px-6 mx-1 position-relative"
            @click="showUpload = !showUpload"
          >
            <img src="/icons/camera.svg" alt="camera" class="position-absolute">
          </button>
          <button
            class="btn btn-browse py-2 px-6 mx-1 position-relative"
            @click="submitComment"
          >
            <img src="/icons/send.svg" alt="camera" class="position-absolute">
          </button>
        </div>
      </div>
    </div>
    <!--begin::Compose-->
    <div class="mt-2">
      <LazyTemplateRecipeCreateGallery
        v-if="showUpload"
        ref="gallery"
        :gallery="images"
        @addGallery="addGalleryImage"
        @removeGalleryImage="removeImage"
      />
    </div>

    <!--begin::Compose-->
  </div>
</template>
<script>
import set from 'lodash/set'
export default {
  props: {
    entity: {
      required: true,
    },
    entityID: {
      required: true,
    },
    commentParent: {
      default: null,
    },
    disabled: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      removeImage: 0,
      browseFiles: 0,
      loading: false,
      awaitUpload: false
    }
  },

  async setup(prop, { emit }) {
    const { $$user } = useNuxtApp()
    const { find, create } = useStrapi()

    const form = reactive({
      content: '',
      images: [],
    })
    const processFiles = ref(0)
    const images = reactive([])

    const submitComment = async (e) => {
      const isValid = form.content?.length < 100
      if(!isValid) return false
      e.preventDefault()
      processFiles.value = Math.random()
      set(form, prop.entity, prop.entityID)
      set(form, 'author', $$user.id)
      if (prop.commentParent) {
        set(form, 'parent_comment', prop.commentParent.id)
      }
      // this.loading = true
      try {
        const comment = await create('comments', form)
        if (images.length) {
          set(comment, 'images', images)
        }
        if (prop.commentParent) {
          emit('pushCommentChild', {
            commentParentId: prop.commentParent.id,
            commentChild: comment,
          })
        } else {
          emit('pushComment', comment)
        }

        // this.loading = false
        clearForm()
      } catch (error) {
        // this.loading = false
        console.log(error)
      }
    }

    const clearForm = () => {
      form.content = ''
      form.images = []

      // image = []
      // removeImage = Math.random()
    }

    // upload
    const showUpload = ref(false)
    const addGalleryImage = (e, data) => {
      form.images.push(e.id)
      images.push(e.image)
    }

    const removeImage = (e) => {
      images.splice(e.imageIndex, 1)
    }

    return {
      form,
      processFiles,
      images,
      showUpload,

      submitComment,
      clearForm,
      addGalleryImage,
      removeImage
    }
  },

  methods: {
    handleBrowseFiles() {
      this.browseFiles = Math.random()
    },
    setImageId(image) {
      this.images.push(image)
      this.form.images.push(image.id)
    },
  },
}
</script>
<style lang="scss" scoped>
.comment__action--custom {
  .comment__form {
    margin-bottom: 0 !important;
  }
}
.comment__form {
  margin-bottom: 35px;
  textarea {
    padding: 0px;
    border: none;
    resize: none;
    overflow: hidden;
    margin-bottom: .5rem;
    &:focus {
      outline: none;
    }
  }
  .btn-browse {
    background: #f1f1f1;
    border-radius: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      width: 15px;
    }
  }
  .comment__form--body {
    border: 2px solid var(--clr-gray-dark);
    display: flex;
    flex-direction: column;
    border-radius: 1rem;
    padding: 8px;
  }
  .comment__form--input {
    background-color: var(--clr-gray);
    border-radius: 10px;
    textarea {
      background-color: transparent;
    }
  }
}
@media (min-width: 768px) {

  .comment__form {
    .comment__form__body__imput {
      width: calc(100% - 160px);
    }
    textarea {
      border-radius: 10px;
      min-height: 25px;
      max-height: 300px;
      padding-left: .5rem;
      margin-bottom: 0;
    }
    .comment-send {
      padding: 10px 8px;
      height: 3.4rem;
      border-radius: 40px;
    }

    .btn-browse {
      height: 25px;
      width: 25px;
      background-color: #ffde82;
    }
    .comment__form--body {
      border-radius: 10px;
      flex-direction: row;
    }
  }
}
.border-30px {
  border-radius: 30px;
}
</style>
