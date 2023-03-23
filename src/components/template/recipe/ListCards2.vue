<template>
  <section>
    <div class="home-section home-section__head">
      <div class="section-title mb-3 mt-5">
        <img alt="Cooku" src="/images/diet-group.svg" class="icon">
        <div>
          <h3>Nhiều người thực hành</h3>
          <p>Top 5 món hot nhất</p>
        </div>
      </div>
    </div>
    <div class="">
      <CommonListView
        view-mode="grid"
        :items-to-show="5"
        :total="5"
        :item-space="20"
        item-component="CommonCardFullImage"
        :dataList="dataList"
        page-type="recipe"
        :load-more="false"
        :itemProps="{
          imageRatioPercent: $$isMobile ? 100 : 120,
          elementShow: ['number_top']
        }"
      />
    </div>
  </section>

</template>
<script>
export default {
  props: {
    dataList:{
      type: Array,
      default: () => []
    }
  }
}
</script>