<template>
  <div class="mt-5">
    <div class="container section" :style="getDefaultStyles">
      <div class="section__head section__head--vertical mb-5">
        <CommonCardHorizonal
          :data="category"
          :page-type="null"
          :class="'widget__grid--bg-big'"
          style="--elm-image-height: 300px;--elm-image-width: 700px;--elm-content-align: unset;"
          :element-show="{
            descTitle: true,
          }"
        />
      </div>
      <div class="section__body--group">
        <div class="section__body--title">
          <span>
            <h4>Chế độ ăn phù hợp</h4>
          </span>
        </div>
        <div class="section__body--content">
          <CommonListView
            item-component="CommonCardFullImage"
            :data-list="diets"
            :items-to-show="4"
            :item-space="20"
            page-type="diet"
            :load-more="false"
            :itemProps="{
              itemStyles:{
                height: '200px'
              },
              elementShow: {
                bookMark: false
              }
            }"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { colorVariables } from '~/constants/theme'
const {$showLoading} = useNuxtApp()
const { find } = useStrapi()
const route = useRoute()

const getDefaultStyles = {
  '--section-main-clr': `var(${colorVariables.RED})`,
  '--section-horizonal-spacing': '70px',
}

$showLoading(true)
const categories = await find('diet-categories', { slug: route.params.slug })
const category = categories?.[0]
const diets = await find('diets', { diet_category: category.id }) || []
$showLoading(false)
</script>
