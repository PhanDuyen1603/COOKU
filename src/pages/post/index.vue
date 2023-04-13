<template>
  <div class="mt-5">
    <div class="container section" :style="getDefaultStyles">
      <CommonHeadSection
        title="BÀI VIẾT"
        subtitle="Cùng nhau khám phá và chia sẻ các bài viết thú vị của bạn đến với mọi người nhé."
        :btn="{ text: 'Tạo bài viết', show: $$isSigned }"
        @handle-action="navigateCreate()"
      />

      <div class="section__body--group">
        <div class="section__body--title">
          <h4>Bài viết nổi bật</h4>
        </div>
        <div v-if="top.length" class="section__body--content">
          <div
            v-if="top[0]"
            class="section__item--top-big"
            style="margin-bottom: 40px"
          >
            <CommonCardHorizonal
              :data="top[0]"
              page-type="post"
              class="widget__border-none widget__image--large"
              :show-avatar="true"
            />
          </div>

          <CommonListView
            item-component="CommonCardFullImage"
            :data-list="top"
            view-mode="slide"
            :items-to-show="3"
            page-type="post"
            :itemProps="{
              elementShow: {
                action: false,
                category: true,
              },
              itemStyles:{
                height: '240px'
              }
            }"
            :extraWrapperOptions="{
              showArrows: true,
            }"
          />

        </div>
      </div>

      <div class="section__body--group">
        <div class="section__body--title">
          <h4>Bài viết mới</h4>
        </div>
        <div class="section__body--content">
          <CommonListView
            key-event="posts"
            item-component="CommonCardVertical"
            :data-list="posts"
            :item-space="30"
            page-type="post"
            :load-more="false"
          />
        </div>
      </div>

      <div class="section__body--group">
        <div class="section__body--title">
          <h4>Gợi ý cho bạn</h4>
        </div>
        <div class="section__body--content">
          <!-- TODO load more -->
          <CommonListView
            key-event="hint"
            item-component="CommonCardVertical"
            :data-list="randoms.data"
            :load-more="false"
            :item-space="30"
            page-type="post"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { colorVariables } from '@/constants/theme'
const { find } = useStrapi()
const { $showLoading, $modal, $toast, $$isSigned, $wait } = useNuxtApp()

const getDefaultStyles = {
  '--section-main-clr': `var(${colorVariables.GREEN})`,
  '--section-horizonal-spacing': '70px',
}

const filters = reactive({
  _limit: 4,
  _sort: 'created_at:desc',
})

$showLoading(true)
const [ posts, randoms, top ] = await Promise.all([
  find('posts', filters),
  find('posts/random', { _limit: 4 }),
  find('posts/top-by/like', { _limit: 10 })
])
$showLoading(false)

const navigateCreate = async () => {
  if(!$$isSigned) {
    $toast.show({
      message: 'Vui lòng đăng nhập trước để tạo công thức',
      type: 'warning'
    })
    await $wait(1000)
    $modal.show({
      component: 'TemplateAuthModalAuth',
      wrapper: 'ModalWrapperAuthForm',
      wrapperProps: {
        style: {
          width: '900px'
        },
      }
    })
  } else {
    $router.push({ name: 'post-create' })
  }
}


</script>

<style scoped>
.icon__circle {
  width: 20px;
  height: 20px;
}
</style>
