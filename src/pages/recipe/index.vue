<template>
  <div class="container">
    <div class="recipe recipe__wrap">
      <CommonHeadSection
        title="Công thức nấu ăn"
        subtitle="Khám phá các món ăn ngon, bổ, rẻ do cộng đồng cùng đóng góp."
        :btn="{ text: 'Thêm món ăn', show: $$isSigned }"
      />
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