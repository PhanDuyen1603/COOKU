<template>
  <div>
    <TemplateBannerHero />
    <!-- <CommonSliderCustomSwiprer
      v-if="banners && banners.length"
      :dataList="banners?.[0]?.gallery"
      :itemShow="3"
      :itemsSpace="20"
      :dots="true"
      class="slider-banner slider-banner__wrapepr"
      slideItemClass="slider-banner__item"
    /> -->
    <TemplateHomeSectionDiet :data="{ diets , topDiets}" />
    <TemplateHomeSectionRecipe :data="{ recipes , tags: recipeTags || []}" />
    <TemplateHomeSectionPosts :data="{ posts , tags: postTags || []}" />
  </div>
</template>

<script setup>
const { find } = useStrapi()
const { $showLoading } = useNuxtApp()

$showLoading(true)
const [ banners, diets, topDiets ] = await Promise.all([
  [],
  // find('galleries', { slug: 'home_banner' }),
  find('diets', { _limit: 5, _sort: 'created_at:desc' }),
  find('diets/top-by/join_users')
])

const [ recipes, recipeTags ] = await Promise.all([
  find('recipes', { _limit: 12, _sort: 'created_at:desc' }),
  find('tags/top/recipe', { _limit: 4, _sort: 'created_at:desc' }),
])

const [ posts, postTags ] = await Promise.all([
  find('posts', { _limit: 12, _sort: 'created_at:desc' }),
  find('tags/top/post', { _limit: 4, _sort: 'created_at:desc' }),
])
$showLoading(false)

</script>