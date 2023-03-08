<template>
  <!-- <AtomsSection> -->
    <div>
      <div class="section__head--center">
        <div class="list-cirlce">
          <div class="item"></div>
          <div class="item"></div>
          <div class="item"></div>
          <div class="item"></div>
        </div>
        <div class="section__head--title">
          <h3>Món ăn hôm nay</h3>
        </div>
      </div>

      <CommonListView
        item-component="CommonCardHorizonal"
        :dataList="dataList"
        view-mode="slide"
        :items-to-show="2"
        to-page-name="recipe"
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
  <!-- </AtomsSection> -->
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