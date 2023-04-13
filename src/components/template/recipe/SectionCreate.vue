<template>
  <div class="recipe-create recipe-create__wrap">
    <ul class="nav nav-tabs justify-content-center">
      <li class="nav-item recipe-create__tabs-title">
        <a class="nav-link recipe-create__tabs-link" :class="{ active: unref(activeItem) === 'info' }" href="#info"
          @click.prevent="setActive('info')">Thông tin</a>
      </li>
      <li class="nav-item recipe-create__tabs-title">
        <a class="nav-link recipe-create__tabs-link" :class="{ active: unref(activeItem) === 'material' }" href="#material"
          @click.prevent="setActive('material')">Nguyên liệu</a>
      </li>
      <li class="nav-item recipe-create__tabs-title">
        <a class="nav-link recipe-create__tabs-link" href="#cooking" :class="{ active: unref(activeItem) === 'cooking' }"
          @click.prevent="setActive('cooking')">Cách nấu</a>
      </li>
    </ul>

    <div>
      <TemplateRecipeCreateStep1
        v-show="activeItem === 'info'"
        key="info"
        ref="infoTab"
        :class="{ 'active show': activeItem === 'info' }"
        @swtich-step="setActive('info')"
      />
      <TemplateRecipeCreateStep2
        v-show="activeItem === 'material'"
        ref="material"
        key="material"
        :class="{ 'active show': activeItem === 'material' }"
        @swtich-step="setActive('material')"
      />
      <TemplateRecipeCreateStep3
        v-show="activeItem === 'cooking'"
        ref="cooking"
        key="cooking"
        :class="{ 'active show': activeItem === 'cooking' }"
        @swtich-step="setActive('cooking')"
      />
    </div>

    <!-- <span v-if="loadingInsert" role="status" class="spinner-border spinner-border-sm">
      <span class="visually-hidden">Loading...</span>
    </span> -->

    <div class="d-flex justify-content-between align-items-center">
      <a href="javascript:void(0)" class="arrow-icon" @click="prev">
        <span
          v-if="activeItem === 'material' || activeItem === 'cooking'"
          class="d-flex align-items-center"
        >
          <img src="/images/arrow_back_circle_outline.png" />
          <span class="px-2">Quay lại</span>
        </span>
      </a>
      <button
        class="recipe-create__submit-btn"
        :disabled="loadingInsert"
        @click="submit"
      >
        {{ actionType === 'create' ? 'Tạo ' : 'Cập nhật ' }} công thức
        <img src="/images/Vector-submit.png" alt="submit" />
      </button>
      <a href="javascript:void(0)" class="arrow-icon" @click="next">
        <span
          v-if="activeItem === 'material' || activeItem === 'info'"
          class="d-flex align-items-center"
        >
          <span class="pe-2">Tiếp theo</span>
          <img src="/images/arrow-step.png" />
        </span>
      </a>
    </div>

  </div>
</template>

<script>
import useCookStore from '~/stores/cook.store'
export default {
  props: {
    actionType: {
      type: String,
      default: 'create'
    },
  },
  setup(props) {
    const $store = useCookStore()
    const activeItem = ref('info')

    const setActive = (name) => activeItem.value = name

    const { create, update } = useStrapi()

    const prev = () => {
      if (activeItem.value === 'material') {
        activeItem.value = 'info'
      } else if (activeItem.value === 'cooking') {
        activeItem.value = 'material'
      }
    }
    const next = () => {
      if (activeItem.value === 'info') {
        activeItem.value = 'material'
      } else if (activeItem.value === 'material') {
        activeItem.value = 'cooking'
      }
    }

    return {
      setActive,
      prev,
      next,
      strapiCreate: create,
      strapiUpdate: update,

      activeItem,
      recipeData: $store.data,
      cookStore: $store
    }
  },
  methods: {
    async submit() {
      try {
        this.$showLoading(true)
        const step1 = await this.$refs.infoTab.validate()
        if(!step1) return this.$showLoading(false)
        const step2 = await this.$refs.material.validate()
        if(!step2) return this.$showLoading(false)
        const step3 = await this.$refs.cooking.validate()
        if(!step3) return this.$showLoading(false)
        const itemIngredients = []
        const step1Data = this.$refs.infoTab.formData
        const material = this.$refs.material.formData
        const cookings = this.$refs.cooking.formData

        for (const index in material) {
          const item = {
            ingredient: material[index].ingredient,
            quantity: parseInt(material[index].number),
            unit: material[index].unitId || null,
            type: material[index].type ? material[index].type : 'side',
          }
          itemIngredients.push(item)
        }

        const itemSteps = []
        // const Cooking = this.$refs.cooking.data
        for (const index in cookings) {
          const item = {
            title: cookings[index].title,
            content: cookings[index].desc,
            order: +index + 1,
            type: cookings[index].type ? cookings[index].type : 'cook',
            galleries: cookings[index].galleryId ? cookings[index].galleryId : [],
          }
          if (this.submitType !== 'create') item.id = cookings[index].id
          itemSteps.push(item)
        }

        const formData = {
          title: step1Data.title,
          content: step1Data.content,
          recipe_categories: step1Data.recipe_categories,
          cooking_time: step1Data.cooking_time,
          level: step1Data.level,
          featured_media: step1Data.featured_media,
          serving: step1Data.serving,
          processing: step1Data.processing,
          regional: step1Data.regional,
          author: unref(this.$$user).id,
          ingredients: itemIngredients,
          steps: itemSteps,
        }
        const routeName = this.$route.name
        const type = routeName.includes('create') ? 'create' : 'update'
        if (type === 'create') {
          formData.comments = []
          formData.tags = []
          // formData.tags = info.data.tags && info.data.tags.length ? info.data.tags.split(',').map(e => e.trim()) : []
          // console.log(formData)
          await this.postCreateRecipes(formData)
        } else {
          // formData.tags = info.data.tags.split(',').map(e => e.trim())
          await this.postUpdate(formData)
          console.log('update')
        }

        this.cookStore.clearCook()
        this.clearAllForm()
        this.$showLoading(false)
      } catch (error) {
        console.log(error)
        this.$showLoading(false)
      }
    },
    async postCreateRecipes(formData) {
      this.loadingInsert = true
      try {
        const res = await this.strapiCreate('recipes', formData)
        this.$toast.show({
          message: 'Tạo mới món ăn thành công',
          type: 'success'
        })
        this.$router.push({ name: 'recipe-slug', params: { slug: res.slug || 'error' } })

      } catch (error) {
        this.$toast.show({
          message: 'Tạo mới món ăn thất bại, vui lòng thử lại',
          type: 'error'
        })
      }
    },
    async postUpdate(formData) {
      try {
        await this.strapiUpdate('recipes', this.recipeData.id, formData)
        this.$toast.show({
          message: 'Cập nhật thành công'
        })
        this.$router.push({
          name: 'recipe-slug',
          params: { slug: this.recipeData.slug },
        })
      } catch (error) {
        console.log(error);
      }
    },
    clearAllForm() {
      this.$refs.infoTab.clear()
      this.$refs.material.clear()
      // this.$refs.cooking.clear()
    }
  }
}
</script>

<style lang="scss" scoped>
.nav-tabs {
  border: unset;
}

.recipe-create__submit-btn{
  border: none !important;
}
</style>