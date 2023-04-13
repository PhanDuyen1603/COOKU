<template>
  <div>
    <div class="section__head--center">
      <div class="section__head--title my-5">
        <h3>Món ăn hôm nay</h3>
      </div>
    </div>

    <CommonListView
      item-component="CommonCardHorizonal"
      :dataList="dataList"
      view-mode="slide"
      :items-to-show="$$isMobile ? 1 : 2"
      page-type="recipe"
      :load-more="false"
      :extraWrapperOptions="{
        elementShow: ['avatar', 'cookingTime'],
        height: '210px',
      }"
      :itemProps="{
        class:
          'widget__grid--sm-content widget__grid--reverse widget__border-none',
      }"
    />
  </div>
</template>

<script>

export default {
  props: {
    dataList: {
      type: Array,
      default: () => []
    }
  },
}
</script>

<style scoped>
.section__head--title {
  text-transform: uppercase;
  font-size: var(--fs-xl);
}
</style>