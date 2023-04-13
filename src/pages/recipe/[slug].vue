<template>
  <div v-if="recipes?.length" class="container">
    <TemplateRecipeDetailMainInfo :model-value="recipes?.[0]" type="recipe" />
    <TemplateRecipeDetailProcessing :data="recipes?.[0]" />
    <CommonComment
      v-if="recipes?.[0].id"
      entity="recipe"
      :is-login="$$isSigned"
      :entity-i-d="recipes?.[0].id"
    />

    <div>
      <div class="list-header">
        <p>Các món ăn tương tự</p>
      </div>
      <CommonListView
        :data-list="relativeRecipes"
        item-component="CommonCardVertical"
        page-type="recipe"
        :load-more="false"
        :items-to-show="$$isMobile ? 2 : 5"
      />
    </div>
  </div>
</template>

<script setup>
const { $showLoading } = useNuxtApp()
const { find } = useStrapi()
const route = useRoute()

const slug = route.params.slug
$showLoading(true)
const { data: recipes, pending } = await useAsyncData('recipes', () => find('recipes', { slug }))
const recipe = recipes[0] || {}
const relativeRecipes = await find('recipes', {
  processing: recipe.processing,
  _limit: 5
}) || []
$showLoading(false)

</script>

<style lang="scss" scoped>
.list-header {
  font-size: var(--fs-xl);
  font-weight: 700;
  color: #000;
  margin: 20px 0 15px 0;
  width: fit-content;
  p {

    border-bottom: 2px solid #000;
  }
}
</style>

