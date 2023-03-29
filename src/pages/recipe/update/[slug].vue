<template>
  <div class="container">
    <div class="wrap-main">
      <div class="title-main">Cập nhật công thức</div>
    </div>
    <CommonSectionWrapperType1>
      <TemplateRecipeSectionCreate
        actionType="update"
      />
    </CommonSectionWrapperType1>
  </div>
</template>

<script setup>
import useCookStore from '~/stores/cook.store'
const { find } = useStrapi()
const route = useRoute()

const $store = useCookStore()

definePageMeta({
  middleware: ["auth"]
})

try {
  const recipes = await find('recipes', {slug: route.params.slug})
  const recipe = recipes?.[0]

  $store.setRecipeData(recipe)
  $store.setCookingTime({
    isHumanReadable: false,
    minutes: recipe.cooking_time || 0,
    hours: 0,
  })
  if(recipe.recipe_categories?.length) {
    $store.changeRecipeMeal({
      id: recipe.recipe_categories?.[0].id,
      name: recipe.recipe_categories?.[0].title,
    })
  }
  const processings = recipe.processing ? await find('processings', { id: recipe.processing }) : []
  const regionals = recipe.regional ? await find('regionals', { id: recipe.regional }) : []
  if(processings.length) $store.setProcessing(processings[0])
  if(regionals.length)$store.setRegional(regionals[0])
} catch (error) {
  console.log(error)
}
</script>

