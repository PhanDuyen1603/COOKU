<template>
  <div class="container">
    <div class="recipe recipe__wrap">
      <CommonHeadSection
        title="Công thức nấu ăn"
        subtitle="Khám phá các món ăn ngon, bổ, rẻ do cộng đồng cùng đóng góp."
      />
      <!-- <div class="recipe__title">
        <div class="title d-flex justify-content-between">
          <h2>Công thức nấu ăn</h2>
          <p class="content">Khám phá các món ăn ngon, bổ, rẻ do cộng đồng cùng đóng góp.</p>
        </div>
        <div>
          <div @click="navigateTo({ name: 'recipe-create' })" class="btn btn__add-new">
            <div class="icon-wrapper circle me-2">
              <img src="/icons/plus.svg" alt="">
            </div>
            <span>Tạo công thức</span>
          </div>
        </div>
      </div> -->
      <CommonSectionWrapperType1>
        <TemplateRecipeListCategories />
        <TemplateRecipeListHorizonalCards :dataList="random" />
        <TemplateRecipeListCards2 :dataList="topByComt" />
      </CommonSectionWrapperType1>
    </div>
  </div>
</template>

<script setup>
import { categories } from '~/constants/recipe'
const { find } = useStrapi()
const { $showLoading } = useNuxtApp()
const $router = useRouter()

$showLoading(true)
const [ { data: random }, topByComt, recipes ] = await Promise.all([
  find('recipes/random', { pageSize: 4, page: 1 }),
  find('recipes/top-by/comment', { _limit: 5 }),
  find('recipes', { _sort :'created_at:desc' , _limit :10 } )
])
$showLoading(false)

const navigateTo = (option) => $router.push(option)
</script>