<template>
  <section class="section">
    <div class="recipe-cook row">
      <div class="ingredients col-12 col-lg-5 mb-5">
        <div class="flex-view mb-3">
          <div class="flex-view">
            <img
              src="/images/munchies-bowl.svg"
              class="icon"
            />
            <div class="d-flex align-items-center ps-2">
              <h3 class="recipe-cook-sub-title">Nguyên liệu</h3>
            </div>
          </div>
          <!-- <div class="right-diet right-diet-item">
            <a href="/" class="link-now right-diet-note a-hover-white text-center"
              >&emsp;{{ data.serving ? data.serving : 1 }} phần ăn
            </a>
          </div> -->
        </div>
        <div class="ingredients-detail">
          <div v-if="ingredientsMain.length" class="ingredients-main">
            <div class="ingredients-main-title mb-2">Nguyên liệu chính</div>
            <div class="ingredients-main-content">
              <div
                v-for="ingredient in ingredientsMain"
                :key="ingredient.id"
                class="d-flex content ingredients-item"
              >
                <div class="ingredients-item-head">
                  <div class="ingredients-image object-image">
                    <img
                      :src="
                        $$strapi.getMediaLink(ingredient.ingredient?.featured_media)
                      "
                      :alt="ingredient.ingredient?.title"
                    />
                  </div>
                  <span>{{ ingredient.ingredient?.title }}</span>
                </div>
                <div class="ingredients-item-content">
                  <span class="count"> {{ ingredient.quantity }}</span>
                  <span v-if="ingredient.unit">{{
                    ingredient.unit.title
                  }}</span>
                </div>
              </div>
            </div>
          </div>
          <div v-if="ingredientsSide.length" class="ingredients-main">
            <div class="ingredients-main-title mb-2">Nguyên liệu phụ</div>
            <div class="ingredients-main-content">
              <div
                v-for="ingredient in ingredientsSide"
                :key="ingredient.id"
                class="flex-view content"
              >
                <p class="underline">
                  <img
                    v-if="ingredient.ingredient.featured_media"
                    class="icon ic-right ingredients-img"
                    :src="
                      $$strapi.getMediaLink(ingredient.ingredient?.featured_media)
                    "
                    alt=""
                  />{{ ingredient.ingredient?.title }}
                </p>
                <p>
                  <span class="count"> {{ ingredient.quantity }}</span>
                  <span v-if="ingredient.unit">{{
                    ingredient.unit.title
                  }}</span>
                </p>
              </div>
            </div>
          </div>
          <div v-if="ingredientsSpice.length" class="ingredients-main">
            <div class="ingredients-main-title mb-2">Gia vị</div>
            <div class="ingredients-main-content">
              <div
                v-for="ingredient in ingredientsSpice"
                :key="ingredient.id"
                class="flex-view content"
              >
                <p class="underline">
                  <img
                    v-if="ingredient.ingredient?.featured_media"
                    class="icon ic-right ingredients-img"
                    :src="
                      $$strapi.getMediaLink(ingredient.ingredient?.featured_media)
                    "
                    alt=""
                  />{{ ingredient.ingredient?.title }}
                </p>
                <p>
                  <span class="count"> {{ ingredient.quantity }}</span>
                  <span v-if="ingredient.unit">{{
                    ingredient.unit?.title
                  }}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-12 col-lg-7">
        <div class="ingredients">
          <div class="d-flex mb-3">
            <div class="d-flex dish">
              <img
                src="/images/munchies-beverage.svg"
                class="icon"
              />
              <div class="d-flex align-items-center ps-2">
                <h3 class="recipe-cook-sub-title">CÁCH LÀM</h3>
              </div>
            </div>
          </div>

          <div class="">
            <div class="recipe-steps">
              <div
                v-for="(step, key) in data.steps"
                :key="key"
                class="recipe-steps__item mb-4"
              >
                <CommonListColorCircle position="start" />
                <div class="flex-view">
                  <div class="recipe-steps-title">
                    Bước {{ key + 1 }}:
                  </div>
                  <div class="content">{{ step.title }}</div>
                </div>
                <div class="left content mt-2">
                  {{ step.content }}
                </div>
                <div class="left d-flex mt-2">
                  <img
                    v-for="(gallery, index) in step.galleries"
                    :key="index"
                    :src="$$strapi.getMediaLink(gallery)"
                    class="me-3 image-cook"
                    :alt="gallery.name"
                  />
                </div>
              </div>
            </div>
            <div class="mt-2 mb-4 bold text-center">Hoàn thành</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ingredientsMain() {
      return this.data.ingredients
        ? this.data.ingredients.filter(
            (i) => i.type === 'main' || i.type === null
          )
        : []
    },
    ingredientsSide() {
      return this.data.ingredients
        ? this.data.ingredients.filter((i) => i.type === 'side')
        : []
    },
    ingredientsSpice() {
      return this.data.ingredients
        ? this.data.ingredients.filter((i) => i.type === 'spice')
        : []
    },
  },
}
</script>

<style lang="scss" scoped>
.image-cook {
  width: 100px;
  height: 100px;
  border-radius: 10px;
}
.recipe-cook-sub-title {
  font-family: Nunito;
  font-style: normal;
  font-weight: 700;
  font-size: var(--fs-lg);
  color: var(--clr-orange-primary);
  text-transform: uppercase;
}
.ingredients-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: var(--fs-sm);
  transition: .2s all ease;
  border-radius: 20px;
}
.ingredients-item-head {
  display: flex;
  gap: 10px;
  align-items: center;
}
.ingredients-image {
  width: 40px;
  padding-top: 40px;
  border-radius: 50%;
  background-color: var(--clr-gray);
}
.recipe-steps-title {
  line-height: 1.4;
  font-size: var(--fs-lg);
  text-decoration: underline;
  font-weight: 700;
}
</style>
