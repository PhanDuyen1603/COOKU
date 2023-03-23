<template>
  <section class="hot-mode section-1-diet">
    <div class="row category category__list">
      <div
        v-for="(item, index) in categories"
        :key="index"
        class="col-6 col-md-4 col-lg-4"
      >
        <NuxtLink
          class="category__item item-category-diet"
          :to="{ name: 'diet-category-slug', params: { slug: item.slug } }"
        >
          <CommonImageBaseObject
            :src="item.featured_media.url"
            height="200px"
            fit-type="cover"
          />
          <h3 class="category__item--title">{{ item.title }}</h3>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script>
import { categories } from '~/constants/diet'
export default {
  props: {
    modelValue: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      categories,
    }
  }
}
</script>

<style lang="scss">
.category {
  --elm-rounded: 10px;

  &__item {
    position: relative;

    img {
      border-radius: var(--elm-rounded);
      overflow: hidden;
    }

    &--title {
      position: absolute;
      bottom: 0;
      font-weight: var(--font-weight-7);
      font-size: var(--fs-lg);
      width: 100%;
      color: var(--clr-white);
      background: rgba(229, 98, 92, 0.7);
      border-radius: 0 0 var(--elm-rounded) var(--elm-rounded);
      text-align: center;
      padding: 5px 20px;
    }
  }
}
</style>
