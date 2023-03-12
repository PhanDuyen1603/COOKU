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
      />
      <TemplateRecipeCreateStep2
        v-show="activeItem === 'material'"
        ref="material"
        key="material"
        :class="{ 'active show': activeItem === 'material' }"
      />
      <TemplateRecipeCreateStep3
        v-show="activeItem === 'cooking'"
        ref="cooking"
        key="cooking"
        :class="{ 'active show': activeItem === 'cooking' }"
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
        {{ submitType === 'create' ? 'Tạo ' : 'Cập nhật ' }} công thức
        <img src="/images/Vector-submit.png" alt="submit" />
      </button>
      <a href="javascript:void(0)" class="arrow-icon" @click="next">
        <span
          v-if="activeItem === 'material' || activeItem === 'info'"
          class="d-flex align-items-center"
        >
          <span class="pe-2">Tiếp theo</span>
          <img src="/images/arrow_back_circle_outline.png" />
        </span>
      </a>
    </div>

  </div>
</template>

<script>
export default {
  setup(props) {
    const activeItem = ref('info')

    const setActive = (name) => activeItem.value = name

    const prev = () => {
      if (activeItem.value === 'material') {
        activeItem.value.value = 'info'
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
      activeItem
    }
  },
  methods: {
    async submit() {
      await this.$refs.infoTab.validate()
    }
  }
}
</script>

<style lang="scss" scoped>
.nav-tabs {
  border: unset;
}
.recipe-create {
  &__tabs-link {
    border: unset!important;
    font-weight: 600;
    font-size: 1.8rem;
    margin-top: 10px;
    color: #b0b0b0;
    &.active {
      color: #525f7f;
    }
  }
  &__submit-btn {
    border-radius: 30px;
    color: #fff;
    font-weight: 700;
    font-size: 20px;
    text-transform: uppercase;
    height: 57px;
    line-height: 46px;
    padding: 0 30px;
    background-color: var(--clr-orange-primary);
    border-color: var(--clr-orange-primary);
  }
}
</style>