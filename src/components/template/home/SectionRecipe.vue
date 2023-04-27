<template>
  <CommonSectionWrapperType1 :style="getDefaultStyles">
    <div class="home-section home-section__head">
      <div class="section__head--title">
        <img alt="Cooku" src="/images/spaghetti.svg" class="icon">
        <h3 class="title-blog">{{ $t('home.section.title3') }}</h3>
      </div>
      <a href="/recipe" class="section__head--title">
        <span>{{ $t('home.showall') }}</span>
        <div class="section-navigate-icon">
          <span>
            <img src="/icons/arrow-right.svg" alt="">
          </span>
        </div>
      </a>
    </div>
    <ul class="home-section__tags tag-blog">
      <li v-for="(tag, index) in tags" :key="index">
        <NuxtLink :to="{ name: 'tag-slug', params: { slug: tag.slug || 'error'} }" class="tag" >
          # {{ tag.title }}
        </NuxtLink>
      </li>
    </ul>

    <div class="section__body--group">
      <div class="section__body--title">
        <span>
          <h4 class="title-blog-content">{{ $t('home.section.subtitle4') }}</h4>
        </span>
      </div>
      <div class="section__body--content">
        <CommonListView
          :items-to-show="$$isMobile ? 2 : 4"
          :total="$$isMobile ? 4 : 12"
          :item-space="20"
          item-component="CommonCardFullImage"
          :dataList="recipes"
          page-type="recipe"
          :load-more="false"
          :itemProps="{
            itemStyles:{
              height: '240px'
            }
          }"
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
        '--section-main-clr': `var(${colorVariables.ORANGE})`,
      }
    },
    recipes() {
      return this.data.recipes || []
    },
    tags() {
      return this.data.tags || []
    },
  }
}
</script>
<style scoped>
.home-section__tags .tag-blog{
  background: orange !important;
  color: white !important;
}

.tag-blog .tag {
    margin-right: 0.9rem;
    font-size: 1.15rem;
    background-color: #df8c26!important;
    margin-bottom: 0.7rem;
    color: #fff;
    border-radius: 100px;
    padding: 1px 10px;
    box-shadow: 4px 4px 11px 1px rgba(0,0,0,.12);
    font-weight: 400;
}

.title-blog-content{
      color: #df8c26!important;
      border-bottom: 2px solid #df8c26;
      font-size: 1.25rem;
}

.title-blog {
    font-size: 1.5rem;
    font-family: Nunito;
    font-weight: 700;
}

</style>