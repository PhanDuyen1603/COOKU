<template>
  <CommonSectionWrapperType1>
    <div class="home-section home-section__head">
      <div class="section-title">
        <img alt="Cooku" src="images/diet-group.svg" class="icon">
        <h3>CHẾ ĐỘ ĂN HOT</h3>
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
          <h4>Đạt được mục tiêu qua chế độ ăn</h4>
        </span>
      </div>
      <div class="section__body--content">

        <!-- <Widget1 v-if="diets.length" :items="diets" :loading="!diets"></Widget1> -->
      </div>
    </div>

  </CommonSectionWrapperType1>
</template>

<script>
import commonProps from '../../common/commonProps';
export default {
  extends: commonProps,

}
</script>