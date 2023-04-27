<template>
  <div class="recipe-categories">
    <div class="home-section home-section__head">
      <div class="section-title mb-3 mt-2 ps-3 text-yellow">
        <img
          alt="Cooku"
          src="../../../public/images/TheMunchiesBowl.svg"
          class="icon"
        />
        <div>
          <h3 class="title-content">Gu ăn uống</h3>
        </div>
      </div>
    </div>
    <CommonListView
      :dataList="categories"
      :itemsToShow="$$isMobile ? 2 : 4"
      :itemSpace="20"
      :loadMore="false"
    >
      <template #item="{ data, index, handleClick }">
        <div
          :class="`recipe-category__image object-image recipe-category__image-${
            index + 1
          } cursor-pointer`"
          @click="openModal(data)"
        >
          <img :src="data.featured_media.url" alt="" />
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
import { categories } from "~/constants/recipe";

const { find } = useStrapi();
const { $modal } = useNuxtApp();

const openModal = async (category) => {
  let res = await find(category.service.api);
  if (typeof res === "object" && !!res.data) res = res.data;
  await $modal.show({
    component: "ModalRecipeIngredients",
    props: {
      style: {
        width: "900px",
      },
      dataList: res,
      tags: category.tags,
    },
  });
};
</script>

<style lang="scss" scoped>
.recipe-category__image {
  padding-top: 65%;
  border-radius: 10px;
  transition: all 0.2s ease;
  &:hover {
    box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
  }
  &--overlay {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba($color: #e5625c, $alpha: 0.7);
  }
}
.recipe-category__image-2 {
  .recipe-category__image--overlay {
    background-color: rgb(223 140 38 / 72%);
  }
}
.recipe-category__image-3 {
  .recipe-category__image--overlay {
    background-color: rgb(229 98 92 / 70%);
  }
}
.recipe-category__image-4 {
  .recipe-category__image--overlay {
    background-color: rgba($color: #65a06b, $alpha: 0.7);
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
    color: #e5625c;
    margin-bottom: 0.5rem;
    font-family: Nunito;
    font-style: normal;
    font-weight: 600;
    font-size: 1.25rem;
  }
  p {
    color: #fff;
    font-size: var(--fs-sm);
  }
}

.title-content {
  font-size: 1.5rem !important;
  font-weight: 700;
  font-size: 1.5rem;
  line-height: 34px;
  margin-bottom: 0;
  font-family: "Nunito";
  color: #df8c26 !important;
}
</style>
