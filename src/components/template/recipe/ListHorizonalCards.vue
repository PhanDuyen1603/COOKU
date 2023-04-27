<template>
  <div>
    <div class="home-section home-section__head">
      <div class="section-title mb-3 mt-5 ps-3 text-yellow">
        <img
          alt="Cooku"
          src="../../../public/images/TheMunchiesBowl.svg"
          class="icon"
        />
        <div>
          <h3 class="title-content">Món ăn hôm nay</h3>
          <p class="content">Theo ưu tiên của bạn</p>
        </div>
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
      default: () => [],
    },
  },
};
</script>

<style scoped>
.section__head--title {
  text-transform: uppercase;
  font-size: var(--fs-xl);
  font-family: Nunito;
}

.text-yellow {
  color: #df8c26;
}

.title-content {
  font-size: 1.5rem !important;
  font-weight: 700;
  font-size: 1.5rem;
  line-height: 34px;
  margin-bottom: 0;
  font-family: "Nunito";
}

.content {
  font-size: 15px;
  color: #e5625c;
  font-family: "Nunito";
}
</style>
