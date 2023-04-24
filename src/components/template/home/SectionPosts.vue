<template>
  <CommonSectionWrapperType1 :style="getDefaultStyles">
    <div class="home-section home-section__head">
      <div class="section__head--title">
        <img alt="Cooku" src="/images/TheMunchiesBowl.svg" class="icon">
        <h3 class="title-blog">{{ $t('home.section.title2') }}</h3>
      </div>
      <a href="/post" class="section__head--title">
        <span>{{ $t('home.showall') }}</span>
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
          <h4 class="title-blog-content">{{ $t('home.section.subtitle3') }}</h4>
        </span>
      </div>
      <div class="section__body--content">
        <CommonListView
          :items-to-show="$$isMobile ? 2 : 4"
          :total="$$isMobile ? 4 : 12"
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
<style lang="scss" scoped>
.section-6 .tag {
    background-color: #65a06b!important;
}

.tag-blog {
    flex-wrap: wrap;
    white-space: unset;
    overflow: auto;
    margin: 2rem 0;
    padding-left: 1.5rem;
}

.tag-blog .tag {
    margin-bottom: 0.7rem;
    font-weight: 400;
    color: #fff;
    border-radius: 100px;
    padding: 1px 10px;
}

.tag-blog .tag {
    margin-right: 0.9rem;
    font-size: 1.15rem;
    font-weight: 400;
}

.tag {
    background-color: #65a06b!important;
}
.title-blog {
    font-size: 1.5rem;
    font-family: Nunito;
    font-weight: 700;
}

.title-blog-content {
   color: #65a06b !important;
    border-bottom: 2px solid #65a06b;
    margin-left: 17px;
    font-size: 1.25rem;
}
</style>