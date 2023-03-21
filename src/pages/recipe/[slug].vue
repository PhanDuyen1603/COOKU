<template>
  <div v-if="recipes?.length" class="container">
    <TemplateRecipeDetailMainInfo :model-value="recipes?.[0]" type="recipe" />
    <TemplateRecipeDetailProcessing :data="recipes?.[0]" />
    <div class="comments comments__wrapper">
      <CommonComment
        v-if="recipes?.[0].id"
        entity="recipe"
        :is-login="$$isSigned"
        :entity-i-d="recipes?.[0].id"
      />
    </div>
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

// export default {
//   layout: 'layout2',
  // async asyncData({ $strapi, store, params }) {
  //   const matchingDiets = await $strapi.find('recipes', { slug: params.slug })
  //   const recipe = matchingDiets[0]
  //   const matchingRecipeAuthor = await $strapi.find('recipes', { author: recipe.author.id, _limit: 5 })
  //   const matchingRecipeByProcessing = await $strapi.find('recipes', { processing: recipe.processing, _limit: 5 })
  //   // await store.dispatch('core/breadcrumbs/setBreadcrumb', [ { title: 'Món ăn' },{ title: recipe.title },])
  //   // await store.dispatch('core/breadcrumbs/setTitle', recipe.title)
  //   // await store.dispatch('modules/recipe/fetchRecipeDetail', { type: 'recipe', slug: params.slug })
  //   // await store.dispatch('modules/recipe/countLike', { type: 'recipe' })
  //   // await store.dispatch('modules/recipe/fetchLikeStatus', { type: 'recipe' })

  //   return {
  //     recipe,
  //     recipeByAuthor: matchingRecipeAuthor,
  //     titleBlockRecipeByProcessing: 'Món khác của ' + recipe.author.fullname ? recipe.author.fullname : 'Foodmood Team' ,
  //     recipeByProcessing: matchingRecipeByProcessing,
  //   }
  // },
  // data() {
  //   return {
  //     titleBlockAuthor: 'Món liên quan',
  //     isMobile: false,
  //   }
  // },
  // mounted() {
  //   const width = this.$viewPort.getViewport().x
  //   if (width < 768) this.isMobile = true
  //   else this.isMobile = false
  // },
// }
</script>

<style lang="scss">
.comments {
  &__top {
    margin: 40px 0;
    h5 {
      font-size: var(--fs-xxl);
      font-weight: var(--font-weight-7);
    }
    p {
      font-size: var(--fs-lg);
      font-weight: var(--font-weight-4);
      &:last-child {
        margin-top: 30px;
      }
    }
    .text__highlight {
      color: var(--clr-orange-primary);
    }
  }
}
</style>
