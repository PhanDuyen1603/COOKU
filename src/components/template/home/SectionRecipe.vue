<template>
  <CommonSectionWrapperType1 :style="getDefaultStyles">
    <div class="home-section home-section__head">
      <div class="section-title">
        <img alt="Cooku" src="images/spaghetti.svg" class="icon">
        <h3>MÓN ĂN HẤP DẪN</h3>
      </div>
      <a href="/diet" class="section-navigate">
        <span>Xem tất cả</span>
        <div class="section-navigate-icon">
          <span>
            <img src="icons/arrow-right.svg" alt="">
          </span>
        </div>
      </a>
    </div>
    <ul class="home-section__tags tag-blog">
      <li> <a href="/tag/keto" class="tag"># keto</a> </li>
      <li><a href="/tag/eat-clean" class="tag"># eat clean </a></li>
      <li><a href="/tag/benh-tieu-duong" class="tag"># bệnh tiểu đường </a></li>
      <li><a href="/tag" class="tag"># dukan </a></li>
      <li><a href="/tag/low-carb" class="tag"># low carb </a></li>
    </ul>

    <div class="section__body--group">
      <div class="section__body--title">
        <span>
          <h4>Công Thức Vừa Đăng</h4>
        </span>
      </div>
      <div class="section__body--content">
        <CommonListView
          type="grid"
          :items-to-show="isMobile ? 2 : 4"
          :total="4"
          :item-space="20"
          item-component="CommonCardFullImage"
          :dataList="dataList"
          to-page-name="recipe"
          :load-more="false"
          :itemProps="{
            itemStyles:{
              height: '300px'
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
  }
}
</script>