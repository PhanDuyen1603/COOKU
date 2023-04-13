<template>
  <div class="container diet__practice">
    <div class="diet__practice--head">
      <h3>
        MÓN ĂN LIÊN QUAN TỚI CHẾ ĐỘ ĂN
        <nuxt-link :to="{ name: 'diet-slug', params: { slug: diet.slug } }">{{
          diet.title
        }}</nuxt-link>
      </h3>
    </div>
    <ul class="diet__practice--tabs">
      <li
        class="item"
        :class="{ active: isOfficial }"
        @click="handleChangeTab(true)"
      >
        <a class="link">9meals gợi ý</a>
      </li>
      <li
        class="item"
        :class="{ active: !isOfficial }"
        @click="handleChangeTab(false)"
      >
        <a class="link">Người dùng đóng góp</a>
      </li>
    </ul>
    <CommonListView
      key-event="random"
      item-component="CommonCardVertical"
      :data-list="matchRecipes"
      :loading-state="loading"
      :items-to-show="isMobile ? 2 : 4"
      :item-space="30"
      page-type="recipe"
    />
  </div>
</template>

<script setup>
const { find } = useStrapi()
const route = useRoute()

const res = await find('diets', { slug: route.params?.slug })
const diet = res?.[0] || {}

const isOfficial = ref(true)

const filter = reactive({
  _limit: 8,
  _start: 0,
})

const recipes = await find('diet-recipes', {
  ...filter,
  is_official: isOfficial.value,
  diet: diet?.id,
})
const matchRecipes = recipes.length ? recipes.map(x => x.recipe) : []

</script>