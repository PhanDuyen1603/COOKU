<template>
  <div>
    <CommonSliderCustomSwiprer
      v-if="banners && banners.length"
      :dataList="banners?.[0]?.gallery"
      :itemShow="3"
      :itemsSpace="20"
      :dots="true"
      class="slider-banner slider-banner__wrapepr"
      slideItemClass="slider-banner__item"
    />
    <TemplateHomeSectionDiet :data="{ diets , topDiets}" />
    <TemplateHomeSectionRecipe :dataList="recipes" />
    <!-- <LazyTemplatesHomeSection2 :items="diets"></LazyTemplatesHomeSection2>
    <TemplatesHomeSection3></TemplatesHomeSection3>
    <LazyTemplatesHomeSection5></LazyTemplatesHomeSection5>
    <LazyTemplatesHomeSection6></LazyTemplatesHomeSection6> -->
  </div>
</template>

<script setup>
const { find } = useStrapi()

const [ banners, { data: randomDiets }, diets, topDiets ] = await Promise.all([
  find('galleries', { slug: 'home_banner' }),
  find('diets/random', { _limit: 10 }),
  find('diets', { _limit: 5, _sort: 'created_at:desc' }),
  find('diets/top-by/join_users')
])

const [ recipes ] = await Promise.all([
  find('recipes', { _start: 0, _limit: 10, _sort: 'created_at:desc' }),
])

</script>