<template>
  <div class="recipe-categories my-4">
    <!-- <div class="section-title">
      <img alt="Cooku" src="/images/diet-group.svg" class="icon">
      <h3>CHẾ ĐỘ ĂN HOT</h3>
    </div> -->
    <CommonListView :dataList="categories" :itemsToShow="4" :itemSpace="20" :loadMore="false">
      <template #item="{ data, index, handleClick }">
        <div :class="`recipe-category__image object-image recipe-category__image-${index + 1} cursor-pointer`" @click="openModal(data)">
          <img :src="data.featured_media.url" alt="">
          <div :class="`recipe-category__image--overlay`"></div>
          <div class="recipe-category__content position-absolute">
            <h3 class="title-blog-new">{{ data.title }}</h3>
            <p class="cont">{{ data.subTitle }}</p>
          </div>
        </div>
      </template>
    </CommonListView>
  </div>
</template>

<script setup>
import { categories } from '~/constants/recipe'

const { find } = useStrapi()
const { $modal } = useNuxtApp()

const openModal = async (category) => {
  console.log(category)
  let res = await find(category.service.api)
  if(typeof res === 'object' && !!res.data) res = res.data
  await $modal.show({
    component: 'ModalRecipeIngredients',
    props: {
      style: {
        width: '900px'
      },
      dataList: res,
      tags: category.tags
    }
  })
}
</script>
<!-- <script>
import { categories } from '~/constants/recipe'
export default {
  data() {
    this.categories = categories
    return {}
  },
  methods: {
    openModal(data) {
      console.log(data)
      this.$modal.show({
        component: data.component,
        props: {
          style: {
            width: '900px'
          }
        }
      })
    }
  },
}
</script> -->

<style lang="scss" scoped>
.recipe-category__image {
  padding-top: 65%;
  border-radius: 10px;
  transition: all .2s ease;
  &:hover {
    box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
  }
  &--overlay {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba($color: #e5625c, $alpha: .4);
  }
}
.recipe-category__image-2 {
  .recipe-category__image--overlay {
    background-color: rgba($color: #df8c26, $alpha: .4);
  }
}
.recipe-category__image-3 {
  .recipe-category__image--overlay {
    background-color: rgba($color: #615375, $alpha: .4);
  }
}
.recipe-category__image-4 {
  .recipe-category__image--overlay {
    background-color: rgba($color: #65A06B, $alpha: .4);
  }
}
.recipe-category__content {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  text-align: center;
  h3 {
    text-shadow: 1px 0 0 #fff, 0 1px 0 #fff, -1px 0 0 #fff, 0 -1px 0 #fff;
    color: var(--clr-red-primary);
    font-family: Nunito;
    font-style: normal;
    font-weight: 600;
  }
  p {
    color: #fff;
    font-size: var(--fs-sm);
  }
}
</style>