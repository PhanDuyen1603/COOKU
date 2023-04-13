<template>
  <section class="section mb-40px">
    <div class="flex-view mb-4">
      <div class="flex-view dish" @click="$router.go(-1)">
      </div>
      <div class="right-diet right-diet-item">
        <div>

        </div>
      </div>
    </div>

    <div class="recipe-cook row">
      <div class="ingredients col-12 col-lg-5">
        <div
          v-if="modelValue.featured_media"
          class="img-bg-66 rounded-10px"
          :style="{
            backgroundImage:
              'url(' + $$strapi.getMediaLink(modelValue.featured_media) + ')',
          }"
        ></div>
      </div>

      <div class="col-12 col-lg-7 intro-cook">
          <CommonListColorCircle />
          <div class="intro-cook-title mt-4 mb-2">
            <h1 class="title h1">
              {{ modelValue.title }}
            </h1>
            <div class="right-diet right-diet-item">
              <button
                class="position-relative like-btn"
                :class="{ 'btn-liked': isLiked }"
                style="width: 80px; height: 40px; padding:.5rem"
                @click="toggleLikePost"
              >
                <div class="like-wrapper icon position-absolute">
                  <img src="/icons/like.svg" alt="">
                </div>
                <span class="like-count">{{ likeCount || 0}}</span>
              </button>
            </div>
          </div>
        <div
          v-if="modelValue.author"
          class="d-flex align-items-center avatar-author justify-content-between mt-3"
        >
          <div class="d-flex align-items-center">
            <NuxtLink :to="{name: 'profile-slug', params: { slug : modelValue.author.username }}" class="symbol symbol-40 me-2">
              <CommonAvatar :data="modelValue.author" />
            </NuxtLink>
            <div>
              <h3 class="name-user author">
                <NuxtLink :to="{name: 'profile-slug', params: { slug : modelValue.author.username }}">
                  {{ authorName }}
                </NuxtLink>
              </h3>
              <div class="date-post-cmt left">
                <div class="action-follow"
                  ><img
                    class="icon ic-right"
                    src="/icons/plus.svg"

                  />Đang theo dõi</div
                >
              </div>
            </div>
          </div>
          <div>
          <div class="date-post-cmt">{{ previousDate(modelValue.updated_at) }}</div>
          </div>
        </div>
        <div v-if="isShowProcess" class="d-flex mt-3 mt-md-4">
          <div class="measure-cook border-yellow me-3" style="--elm-clr: var(--clr-orange-primary)">
            <div class="icon-recipe-detail icon-recipe-detail-1">
              <img src="/icons/recipe-detail-1.svg" class="comment-avatar mb1" />
            </div>
            <div class="measure-cook__item work">
              <span class="bold work">{{ modelValue.processing }}</span>
              <br />Cách nấu
            </div>
          </div>
          <div class="measure-cook border-green me-3" style="--elm-clr: var(--clr-green-primary)">
            <div class="icon-recipe-detail icon-recipe-detail-2">
              <img src="/icons/recipe-detail-2.svg" class="comment-avatar mb1" />
            </div>
            <div class="measure-cook__item servings">
              <span class="bold servings">{{ modelValue.serving ? modelValue.serving : 1 }}</span>
              <br />Phần ăn
            </div>
          </div>
          <div class="measure-cook border-purple me-3" style="--elm-clr: var(--clr-violet-primary)">
            <div class="icon-recipe-detail icon-recipe-detail-3">
              <img src="/icons/recipe-detail-3.svg" class="comment-avatar mb1" />
            </div>
            <div class="measure-cook__item times-cook">
              <span class="bold times-cook">{{ modelValue.cooking_time }} </span>
              <br />Phút
            </div>
          </div>
        </div>
        <div v-if="isShowContent" class="content color-title left mt-3 mt-md-5 text-overflow">
          {{ modelValue.content }}
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import likePost from '~/mixins/like.mixin'

export default {
  props: {
    modelValue: {
      type: [Object, Array],
    },
    type: {
      type: String,
      default: 'recipe'
    },
    isShowProcess: {
      type: Boolean,
      default: true
    },
    isShowContent: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    authorName() {
      if (this.modelValue.author.fullname) return this.modelValue.author.fullname;
      return this.modelValue.author.username;
    }
  },
  async setup(props) {
    const {
      likeCount,
      isLiked,
      pendingLike,
      infoLike,
      toggleLikePost
    } = await likePost({ type: props.type, postData: props.modelValue });

    return {
      likeCount,
      isLiked,
      pendingLike,
      infoLike,
      toggleLikePost
    }
  },
  methods: {
    previousDate(date) {
      return this.$dayjs(date).fromNow()
    }
  },
}
</script>

<style lang="scss">
.recipe-cook {
  display: flex;
  justify-content: space-between;
  margin: 0;

  .ingredients {
    .ingredients-detail {
      background: #ffffff;
      border: 3px dashed #df8c26;
      border-radius: 20px;
      padding: 30px 40px;

      .ingredients-main {
        .ingredients-main-title {
          font-weight: 600;
          font-size: 20px;
          line-height: 1.4;
          color: #4f4f4f;
          text-align: left;
        }
      }
    }

    .recipe-steps__item {
      background: #ffffff;
      border: 2px solid #df8c26;
      box-sizing: border-box;
      box-shadow: 4px 4px 11px 1px rgba(0, 0, 0, 0.12);
      border-radius: 15px;
      padding: 30px 20px;
    }
  }
}

.intro-cook {
  background: #ffffff;
  box-shadow: 2px 2px 10px 1px rgb(0 0 0 / 5%);
  border-radius: 20px;
  padding: 20px;

  .title-cook-detail {
    font-weight: bold;
    font-size: 25px;
    line-height: 2.5rem;

    .avatar-author {
      width: 34px;
      height: 34px;
      border-radius: 100px;
    }
  }
}

.measure-cook {
  --elm-clr: var(--clr-orange-primary);

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 15px 5px;
  width: 90.5px;
  height: 154px;
  box-sizing: border-box;
  border-radius: 100px;
  margin-right: 40px;
  border: 1px solid var(--elm-clr);
  &__item {
    font-weight: 600;
    font-size: var(--fs-lg);
    line-height: 25px;
    color: var(--elm-clr);
    text-align: center;
  }
  span {
    font-weight: 800;
    font-size: var(--fs-xl);
    line-height: 27px;
    color: var(--elm-clr);
  }
}

.img-bg-66 {
  height: 0px;
  padding-top: 66.66%;
  background-size: cover;
}

.rounded-10px {
  border-radius: 10px;
}

.like-btn {
  overflow: hidden;
  border-width: 2px;
  border-color: transparent;
}
.like-btn, .like-btn img, .like-btn span:not(.spinner-border) {
  transition: all 0.2s ease-in-out;
}
.like-btn img {
  left: 5px;
}
.right-icon span:not(.spinner-border) {
  transform: translateX(-10px);
}
.left-icon span:not(.spinner-border) {
  transform: translateX(10px);
}
.btn-loading {
  position: absolute;
  top: -15px;
  left: -15px;
  background-color: #000;
  opacity: .5;
  width: 100px;
  height: 100px;
}
.spinner-border {
  z-index: 1;
}
.like-wrapper {
  background: #fff;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  left: 5px;
  &.right-icon {
    transform: translateX(40px);
  }
  &.icon-violet svg{
    fill: #837793;
  }
}

.icon-recipe-detail {
  width: 60px;
  position: relative;
  padding-top: 60px;
  border-radius: 50%;
  background-color: #837793;
  &-1 {
    background-color: var(--clr-orange-primary);
  }
  &-2 {
    background-color: var(--clr-green-primary);
  }
  &-3 {
    background-color: var(--clr-violet-primary);
  }
  img {
    position: absolute;
    width: 32px;
    height: 32px;
    top: 15px;
    right: 15px;
  }
}

.name-user {
  font-weight: 600;
  font-size: var(--fs-xl);
  line-height: 1.4;
  color: var(--clr-gray-dark);
  margin-bottom: 0;
}
.action-follow {
  font-size: var(--fs-sm);
  color: var(--clr-orange-primary);
  display: flex;
  align-items: center;
}
.ic-right {
  width: 12px;
  height: 12px;
}
.like-btn {
  font-family: Nunito;
  font-style: normal;
  font-weight: 600;
  font-size: 15px;
  line-height: 20px;
  color: #ffffff;
  background: #e5625c;
  border-radius: 100px;
  padding: 5px 10px;
  display: flex;
  align-items: center;
  .icon {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
.intro-cook-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.like-count {
  position: absolute;
  right: 15px
}
.like-btn > * {
  transition: all .3s ease;
}
.btn-liked {
  .like-count {
    transform: translateX(-40px);
  }
  .like-wrapper {
    transform: translateX(40px);
  }
}
</style>
