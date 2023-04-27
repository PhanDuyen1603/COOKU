<template>
  <div class="container">
    <div class="recipe recipe__wrap">
      <CommonHeadSection
        title="Công thức nấu ăn"
        subtitle="Khám phá các món ăn ngon, bổ, rẻ do cộng đồng cùng đóng góp."
        :btn="{ text: 'Thêm món ăn', show: $$isSigned }"
        @handle-action="navigateCreate()"
      />
      <CommonSectionWrapperType1>
        <TemplateRecipeListCategories />
        <TemplateRecipeListHorizonalCards :dataList="random" />
        <TemplateRecipeListCards2 :dataList="topByComt" />
        <!-- hash -->
        <div class="home-section home-section__head">
          <div class="section-title mb-3 mt-5 ps-3 text-yellow">
            <img
              alt="Cooku"
              src="../../public/images/chinese-food-svgrepo-com.svg"
              class="icon"
            />
            <div>
              <h3 class="title-content">Món ăn mới nhất</h3>
              <p class="content">Theo ưu tiên những người bạn đã theo dõi</p>
            </div>
          </div>
        </div>
        <CommonListView
          :items-to-show="$$isMobile ? 2 : 4"
          :total="$$isMobile ? 4 : 12"
          :item-space="20"
          item-component="CommonCardFullImage"
          :dataList="recipes"
          page-type="recipe"
          :load-more="false"
          :itemProps="{
            itemStyles: {
              height: '240px',
            },
          }"
        />
        <!-- end hash -->
      </CommonSectionWrapperType1>
    </div>
  </div>
</template>

<script setup>
import { categories } from "~/constants/recipe";
const { find } = useStrapi();
const { $showLoading, $$isSigned, $toast, $wait, $modal } = useNuxtApp();
const $router = useRouter();

$showLoading(true);
const [{ data: random }, topByComt, recipes] = await Promise.all([
  find("recipes/random", { pageSize: 4, page: 1, _sort: "created_at:desc" }),
  find("recipes/top-by/comment", { _limit: 5 }),
  find("recipes", { _sort: "created_at:desc", _limit: 12 }),
]);
$showLoading(false);

const navigateTo = (option) => $router.push(option);
const navigateCreate = async () => {
  if (!$$isSigned) {
    $toast.show({
      message: "Vui lòng đăng nhập trước để tạo công thức",
      type: "warning",
    });
    await $wait(1000);
    $modal.show({
      component: "TemplateAuthModalAuth",
      wrapper: "ModalWrapperAuthForm",
      wrapperProps: {
        style: {
          width: "900px",
        },
      },
    });
  } else {
    $router.push({ name: "recipe-create" });
  }
};
</script>

<style lang="scss" scoped>
.title-content{
  font-size: 1.5rem !important;
  font-weight: 700;
  font-size: 1.5rem;
  line-height: 34px;
  margin-bottom: 0;
  font-family: "Nunito";
  color: #615375 !important;
}

.content {
  font-size: 15px;
  color: #615375 !important;
  font-family: "Nunito";
}
</style>
