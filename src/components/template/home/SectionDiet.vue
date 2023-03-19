<template>
  <CommonSectionWrapperType1>
    <div class="home-section home-section__head">
      <div class="section__head--title">
        <img alt="Cooku" src="/images/diet-group.svg" class="icon">
        <h3>CHẾ ĐỘ ĂN HOT</h3>
      </div>
      <a href="/diet" class="section__head--title">
        <span>Xem tất cả</span>
        <div class="section-navigate-icon">
          <span>
            <img src="/icons/arrow-right.svg" alt="">
          </span>
        </div>
      </a>
    </div>
    <ul v-if="tags.length" class="home-section__tags tag-blog">
      <li v-for="(item, index) in tags" :key="index">
        <NuxtLink :to="{ name: 'tag-slug', params: { slug: item.slug }}" class="tag">
          # {{ item.title }}
        </NuxtLink>
      </li>
    </ul>

    <div class="section__body--group">
      <div class="section__body--title">
        <span>
          <h4>Đạt được mục tiêu qua chế độ ăn</h4>
        </span>
      </div>
      <div class="section__body--content">
        <TemplateHomeListGridView :dataList="diets" />
      </div>
    </div>

    <div class="section__body--group">
        <div class="section__body--title">
          <span>
            <h4>Đông thành viên nhất</h4>
          </span>
        </div>
        <div class="section__body--content">
          <CommonListView
            view-mode="slide"
            :items-to-show="2"
            item-component="CommonCardHorizonal"
            :dataList="topDiets"
            to-page-name="grid"
            :load-more="false"
            :extra-item-options="{
              elementShow: ['member'],
            }"
          />
        </div>
    </div>

  </CommonSectionWrapperType1>
</template>

<script>
import commonProps from '../../common/commonProps';

export default {
  extends: commonProps,
  computed: {
    diets() {
      return this.data.diets
    },
    topDiets() {
      return this.data.topDiets
    },
    tags() {
      const allTags = this.$cloneDeep(this.diets).map(item => item.tags).flat() || []
      if(allTags.length && allTags.length > 5) {
        return allTags.slice(0, 5)
      } else {
        return allTags
      }
    },
  }
}
</script>