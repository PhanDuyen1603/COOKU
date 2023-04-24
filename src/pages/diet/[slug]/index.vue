<template>
  <div class="mt-5" style="--section-main-clr: var(--clr-red-primary)">
    <div class="diet__detail container">
      <div class="diet__detail--hero">
        <img :src="$$strapi.getMediaLink(diet.featured_media)" />
        <div
          class="diet__detail--card-content diet__detail--card-content-glass"
        >
          <div>
            <CommonListColorCircle />
            <h4>{{ diet.title }}</h4>
            <p class="line-clamp-4">{{ diet.excerpt }}</p>
          </div>
          <!-- <button v-if="isJoined" class="btn btn-join" @click="unJoinGroup">Đã tham gia</button>
          <button v-else class="btn btn-join" @click="joinGroup">Tham gia</button> -->
        </div>
      </div>
      <div class="diet__detail--content">
        <div
          v-for="(item, index) in content"
          :key="index"
          class="content__block"
        >
          <div v-if="diet[item.content]">
            <div class="title-des">
              {{ item.title }}
            </div>
            <div
              class="content__block--text"
              v-html="convertContent(diet[item.content])"
            ></div>
          </div>
        </div>
      </div>
      <div class="diet__detail--social">
        <div class="social__left">
          <CommonImageBaseObject
            src="/images/social.png"
            :height="260"
            :width="450"
            fit-type="cover"
            class="social__image"
          />
        </div>
        <div class="social__right">
          <div class="diet__detail--card-content">
            <div>
              <CommonListColorCircle />
              <h4>Cộng đồng ăn uống</h4>
              <p>
                Cùng tham gia vào cộng đồng ăn uống để chia sẻ những bữa ăn thú
                vị, những chế độ ăn lành mạnh cho sức khoẻ và học hỏi kinh
                nghiệm từ những người bạn đồng hành nhé
              </p>
            </div>
            <button class="btn btn-join btn__outline" @click="developing()">
              Cộng đồng
            </button>
          </div>
        </div>
      </div>
      <div class="diet__detail--relative">
        <div
          class="section__body--title"
          style="--section-main-clr: var(--clr-black)"
        >
          <h4>Món ăn liên quan</h4>
          <NuxtLink
            :to="{ name: 'diet-slug-practice', prams: { slug: diet.slug } }"
            class="section__head--title"
          >
            <span class="text-underline">Xem tất cả</span>
            <div class="section__head__icon">
              <img
                :style="`--elm-color: var(--section-main-clr)`"
                src="/icons/arrow-right.svg"
                alt=""
              />
            </div>
          </NuxtLink>
        </div>
        <div class="section__body--content">
          <CommonListView
            :items-to-show="isMobile ? 2 : 4"
            :total="4"
            :item-space="30"
            item-component="CommonCardVertical"
            :data-list="matchRelative"
            page-type="recipe"
            :load-more="false"
            :itemProps="{
              itemStyles: {
                height: '240px',
              },
            }"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { marked } from "marked";
const { find } = useStrapi();
const route = useRoute();
const { $modal, $showLoading } = useNuxtApp();

const content = [
  {
    title: "Giới thiệu",
    content: "content",
  },
  {
    title: "Nguyên lý",
    content: "principle",
  },
  {
    title: "Lợi ích",
    content: "benefit",
  },
  {
    title: "Đối tượng",
    content: "goal",
  },
];

const transformArrayByRecipe = (arr) => {
  return arr.map((item) => item.recipe).filter((item) => item && item.id);
};

const developing = () => {
  $modal.show({ component: modalComponents.DEVELOP });
};

const convertContent = (content) => {
  return marked.parse(content);
};
$showLoading(true);
const diets = await find("diets", { slug: route.params.slug });
const diet = diets?.[0] || {};
const relative = diet.id ? await find("diet-recipes", { diet: diet.id }) : [];
const matchRelative = relative.length ? relative.map((x) => x.recipe) : [];
$showLoading(false);
</script>

<style lang="scss" scoped>
.content__block--text {
  font-size: 1.25rem;
  line-height: 27px;
  color: #615375 !important;
  margin-top: 6px;
  margin-bottom: 10px;
  text-align: justify;
}

.content__block--text p{
font-size: 1.25rem;
  line-height: 27px;
  color: #615375 !important;
  margin-top: 6px;
  margin-bottom: 10px;
  text-align: justify;
}
.title-des {
  font-weight: 700;
  font-size: 1.375rem;
  line-height: 30px;
  color: #e5625c;
}
</style>
<style>
body {
  font-family: Nunito, sans-serif;
}
</style>
