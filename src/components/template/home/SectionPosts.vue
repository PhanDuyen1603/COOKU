<template>
  <CommonSectionWrapperType1 :style="getDefaultStyles">
    <div class="home-section home-section__head">
      <div class="section__head--title">
        <img alt="Cooku" src="/images/spaghetti.svg" class="icon">
        <h3>BÀI VIẾT MỚI NHẤT</h3>
      </div>
      <a href="/post" class="section__head--title">
        <span>Xem tất cả</span>
        <div class="section-navigate-icon">
          <span>
            <img src="/icons/arrow-right.svg" alt="" class="filter-green">
          </span>
        </div>
      </a>
    </div>
    <ul class="home-section__tags tag-blog">
      <li v-for="(tag, index) in tags" :key="index">
        <NuxtLink :to="{ name: 'tag-slug', params: { slug: tag.slug || 'error' } }" class="tag" >
          # {{ tag.title }}
        </NuxtLink>
      </li>
    </ul>

    <div class="section__body--group">
      <div class="section__body--title">
        <span>
          <h4>Bài viết vừa đăng</h4>
        </span>
      </div>
      <div class="section__body--content">
        <CommonListView
          view-mode="slide"
          :items-to-show="$$isMobile ? 2 : 4"
          :total="4"
          :item-space="20"
          item-component="CommonCardVertical"
          :dataList="posts"
          page-type="post"
          :load-more="false"
        />
      </div>
    </div>

  </CommonSectionWrapperType1>
</template>

<script>
import commonProps from '../../common/commonProps';
import { colorVariables } from '~/constants/theme'
export default {
  extends: commonProps,
  computed: {
    getDefaultStyles() {
      return {
        '--section-main-clr': `var(${colorVariables.GREEN})`,
      }
    },
    posts() {
      return this.data.posts || []
    },
    tags() {
      return this.data.tags || []
    },
  }
}
</script>