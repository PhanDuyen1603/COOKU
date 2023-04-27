<template>
  <div class="mt-5">
    <div class="container" :style="getDefaultStyles">
      <CommonHeadSection
        title="BÀI VIẾT"
        subtitle="Cùng nhau khám phá và chia sẻ các bài viết thú vị của bạn đến với mọi người nhé."
        :btn="{ text: 'Tạo bài viết', show: $$isSigned }"
        @handle-action="navigateCreate()"
      />

      <div class="section__body--group section__shadow m-0 section p-more">
        <div class="text-center">
          <div class="center-cirlce">
            <div class="item"></div>
            <div class="item"></div>
            <div class="item"></div>
            <div class="item"></div>
          </div>
        </div>
        <div class="flex-view">
          <div class="flex-view">
            <img src="../../public/images/TheMunchiesBowl.svg" class="icon" />
            <h3 class="title-blog">CHỦ ĐỀ HOT</h3>
          </div>
          <a
            href="/post"
            aria-current="page"
            class="all-link flex-view nuxt-link-exact-active nuxt-link-active"
            ><span class="span fix-view-more">Xem tất cả</span>
            <img
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd+UAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAALLSURBVHgBtZY/aFNRFMZPihRMOzybwQxJCdik6NC8TpV2sKGDtBhMwVEwDjooCOLkFDK5KKigIA6t4CqJRCwdSuxg0amJg9K0QyApmKFpBonQJX7f9UVe0qTvT+0HJ+flXbi/3JNzzzkesaFWqzULdxVGH4JpxlIDVjDsvcfj+WS1l8cClIRLbf3cDpVq2wIve7/qsD217h08LYGRgARh0+em6Mt4nQZ42REQoBBcBgA9V/woJYDsKOIPSzy6IOP+cBlfYwCXLYGA3WgeNJ/miiva2ve8uNHchZhcic43hga9NwHN9gUClkDIMi/zr6RS35XjiKG+G7stvuGRJKBvDgEZRpxs88nqM80KxrBRDLcV9MHlezzpZDu8A6b1PMNoBZsMTkhcX/hrBrifqvWqfMCeeMy03ykgs5GZaOc/26x8k42dL+rZDpR7MvmMjP93wpRVeMxa/vzWEdTYO6WAvNSVejVkN/XdQLk3I0gWT5jY2PkqbuQUShaB0cp+VdzKLnSrpoCXTuFDZzaZ5RvyiRPlCiuqzOmjUQVV77pywiiHIQK15sHvjsVH19JyHPWCsgaTNSAnpT5tgSds+IZ9WrsDUA/fpcSpkjPXWbTVM0+WK3SGlCEni8Ay6p1uBpqf/weMCpwJ0BUY0vXxs2FxK8Kmxy4eCaPYM6EigdmI3x3QLoyaGZuiyw5wLGDDdAp1AosggugcZbLaWZq2qoduYZRxTdRdU0DOIDhlYe58TKykj044gnFPRrA95xxqwI9Xn2vdlafPL7aEBY0G7DU14O4RI4krsfQi/1qsoFYi7E7sFkYM36J5ruk1RCVw0iXUR23th8shCmGM6/M82f3ukfGoMTHPHsawlWo2x0RkI8PNfMDXRVtjYhc4CZdig2bPhJfq/q4gAmqdXQVVSlUZXitjHnU+CPcAz8IlYFGYLp2jfhm2DsvaGfX/APGtdM7QPGIbAAAAAElFTkSuQmCC"
              class="icon icon-fix"
          /></a>
        </div>

        <ul class="tag-blog">
          <li>
            <a href="/tag/giam-can" class="tag tab-blog-child"># giảm cân </a>
          </li>
          <li>
            <a href="/tag/healthy" class="tag tab-blog-child"># healthy </a>
          </li>
          <li>
            <a href="/tag/an-toan" class="tag tab-blog-child"># an toàn </a>
          </li>
          <li>
            <a href="/tag/tan-huong" class="tag tab-blog-child"># tận hưởng </a>
          </li>
          <li>
            <a href="/tag/dinh-duong" class="tag tab-blog-child"
              ># dinh dưỡng
            </a>
          </li>
        </ul>
        <div class="d-flex">
          <img src="../../public/images/TheMunchiesBowl.svg" class="icon" />
          <h3 class="title-blog">Gợi ý cho bạn</h3>
        </div>
        <div class="section__body--group">
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

        <div class="section__body--group p-10 p-20">
           <div class="d-flex">
          <img src="../../public/images/TheMunchiesBowl.svg" class="icon" />
          <h3 class="title-blog">Bài viết từ những người bạn theo dõi</h3>
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
  </div>
</template>

<script setup>
import { colorVariables } from "@/constants/theme";
const { find } = useStrapi();
const router = useRouter();
const { $showLoading, $modal, $toast, $$isSigned, $wait, $$isMobile } =
  useNuxtApp();

const getDefaultStyles = {
  "--section-main-clr": `var(${colorVariables.GREEN})`,
  "--section-horizonal-spacing": "70px",
};

const filters = reactive({
  _limit: unref($$isMobile) ? 4 : 8,
  _sort: "created_at:desc",
});

$showLoading(true);
const [posts, randoms, top] = await Promise.all([
  find("posts", filters),
  find("posts/random", { _limit: 4 }),
  find("posts/top-by/like", { _limit: 12 }),
]);
$showLoading(false);

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
    router.push({ name: "post-create" });
  }
};
</script>

<style scoped>
.icon__circle {
  width: 20px;
  height: 20px;
}
.m-0 {
  margin-top: 0;
}

.p-more {
  padding-bottom: 50px;
  padding-left: 50px;
  padding-right: 50px;
  padding-top: 38px;
}

.flex-view {
  display: flex;
  justify-content: space-between;
}

.title-blog {
  font-family: Nunito;
  font-style: normal;
  font-weight: 700;
  font-size: 1.125rem;
  color: #65a06b;
  margin-bottom: 0;
  font-size: 1.5rem;
}

.all-link {
  align-items: center;
}

.icon-fix {
  width: 20px;
  height: 20px;
}

.fix-view-more {
  font-weight: 700;
  margin-right: 10px;
  font-size: 1.25rem;
  color: #65a06b !important;
}

.tag-blog {
  white-space: unset;
  overflow: auto;
  margin: 2rem 0;
  list-style: none;
  padding: 0;
  display: flex;
  padding-left: 1.5rem;
  margin-bottom: 3rem;
}

.tab-blog-child {
  background-color: #65a06b !important;
  margin-bottom: 0.7rem;
  color: #fff;
  border-radius: 100px;
  padding: 1px 10px;
  font-family: Nunito;
  font-style: normal;
  margin-right: 0.9rem;
  font-size: 1.15rem;
}

.p-10 {
  padding-top: 30px;
}

.p-20 {
  padding-top: 40px;
}
</style>
