<template>
  <div class="container mt-5" :style="getDefaultStyles">
    <div class="section__head section__head--vertical">
      <div class="section__head--title">
        <h3>CHẾ ĐỘ ĂN</h3>
      </div>
      <div class="section__head--desc">
        <p>
          Cùng khám phá ngay cách đạt được mục tiêu cho bản thân thông qua chế
          độ dinh dưỡng nhé
        </p>
      </div>
      <div class="tags tags__list">
        <!-- <AtomsBadge
          v-for="(tag, i) in dietTags"
          :key="i"
          @click="navigateTag(tag)"
        >
          #{{ tag.title }}
        </AtomsBadge> -->
      </div>
    </div>
    <div class="section__body">
      <div class="section__body--group">
        <div class="section__body--title">
          <span>
            <h4>Chế độ nào phù hợp ?</h4>
          </span>
        </div>
        <div class="section__body--content">

          <TemplateDietListCategories :modelValue="hintItems" />
        </div>
      </div>

      <div class="section__body--group">
        <div class="section__body--title">
          <span>
            <h4>Đạt được mục tiêu qua chế độ ăn</h4>
          </span>
        </div>
        <div class="section__body--content">
          <TemplateHomeListGridView :dataList="diets.value" pageType="diet" />
        </div>
      </div>

      <div class="section__body--group">
        <div class="section__body--title">
          <span>
            <h4>Gợi ý cho bạn</h4>
          </span>
        </div>
        <div class="section__body--content">
          <CommonListView
            :items-to-show="2"
            :total="2"
            :item-space="60"
            item-component="CommonCardHorizonal"
            :dataList="hintItems"
            page-type="diet"
            :load-more="false"
            :extra-item-options="{
              elementShow: [],
            }"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { colorVariables } from '@/constants/theme'
const { find } = useStrapi()

const filter = reactive({
  _limit: 5,
  _sort: 'created_at:desc'
})

const getDefaultStyles = {
  '--section-main-clr': `var(${colorVariables.RED})`,
  '--section-horizonal-spacing': '70px',
}

const navigateTag = (tag) => {
  router.push({
    name: 'tag-slug',
    params: {
      slug: tag.slug,
    },
  })
}

const [ randomDiets, diets ] = await Promise.allSettled([
  find('diets/random', { _limit: 10 }),
  find('diets', filter),
  // find('diets/top-by/join_users')
])
const hintItems = randomDiets.status === 'fulfilled'
  ? randomDiets.value.data
  .filter((item) => item.featured_media && item.featured_media.url)
  .splice(0, 2)
  : []
</script>

<style lang="scss" scoped>
.slide-diet {
  --section-horizonal-spacing: 20px;
}
</style>
