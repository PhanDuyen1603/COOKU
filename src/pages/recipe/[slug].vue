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
    <!-- <OrganismsListsRecipesListing4
      :recipes="recipeByProcessing"
      :title="titleBlockAuthor"
      row="5"
      :image-ratio-percent="isMobile ? 100 : 120"
    ></OrganismsListsRecipesListing4> -->
    <!-- <OrganismsListsRecipesListing4
      :recipes="recipeByAuthor"
      :title="titleBlockRecipeByProcessing"
      row="5"
      :image-ratio-percent="isMobile ? 100 : 120"
    ></OrganismsListsRecipesListing4> -->
  </div>
</template>

<script setup>
const { $modal } = useNuxtApp()
const { find } = useStrapi()
const route = useRoute()

const slug = route.params.slug

const { data: recipes, pending } = await useAsyncData('recipes', () => find('recipes', { slug }))

</script>

