<template>
  <div class="widget">
    <div class="d-flex wrap widget__item--wrap">
      <nuxt-link :to="navigateTo"
        class="widget__item--image clicked shadow-sm" :style="getItemStyle(data)">
        <div>
          <span v-if="getListShowElements.member" class="member-total">{{ data.hit || 0 }} thành viên</span>
          <span v-if="getListShowElements.practice" class="member-total">{{ data.hit }} Lượt thực hành</span>
          <span v-if="getListShowElements.commentCount" class="member-total">{{ data.comment_count ? data.comment_count
              : 0
          }} Bình luận</span>
        </div>
        <div class="widget__item--image--content position-absolute">
          <div v-if="getListShowElements.cookingTime" class="widget__item--badge">
            <div class="icon__circle">
              <img src="/icons/stop-watch.svg" alt="">
            </div>
            <span>{{ $get(data, 'cooking_time', 0) }}p</span>
          </div>
          <!-- <nuxt-link v-if="showList.category" :to="{ name: 'tag-slug', params: { slug: getCategory.slug } }"> -->
          <div v-if="showList.category">
            <span class="badge rounded-pill bg-primary">#{{ getCategory.title }}</span>
          </div>
          <h5 v-if="!getListShowElements.descTitle" class="text-primary text-shadow">
            {{ data.title }}
          </h5>
        </div>
      </nuxt-link>
      <div class="widget__item--desc w-100">
        <div class="widget__item--head">
          <nuxt-link :to="{
            name: 'profile-slug',
            params: { slug: data.author?.username || 'error' },
          }">
            <CommonAvatar v-if="showAvatar || getListShowElements.avatar" :author="data.author" />
          </nuxt-link>
          <CommonListColorCircle/>
        </div>
        <nuxt-link v-if="!getListShowElements.descTitle"  :to="navigateTo"
          class="line-clamp-4">
          {{ getItemContent(data) }}
        </nuxt-link>
        <div v-else class="widget__item--content line-clamp-4">
          <h4>
            <nuxt-link  :to="navigateTo">
              {{ $get(item, 'title', '') }}</nuxt-link>
          </h4>
          <p>{{ getItemContent(data) }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { postTypes } from '~/constants/app'

const intersection = (xs, ys) => xs.filter((x) => ys.includes(x))
const toObject = (array) => array.reduce((ac, a) => ({ ...ac, [a]: true }), {})

const showList = {
  member: false,
  practice: false,
  cookingTime: false,
  avatar: false,
  descTitle: false,
  commentCount: false,
  category: false
}

export default {
  props: {
    pageType: {
      type: String,
      default: 'recipe',
      validator: (value) => Object.values(postTypes).includes(value),
    },
    data: {
      type: Object,
      required: true,
    },
    showAvatar: {
      type: Boolean,
      default: false,
    },
    elementShow: {
      type: [Object, Array],
      default: () => [],
    },
  },
  data() {
    return {
      showList,
    }
  },
  computed: {
    navigateTo() {
      if(!this.pageType) return '#'
      return { name: this.pageType + '-slug', params: { slug: this.data.slug || 'error' } }
    },
    getListShowElements() {
      if (Array.isArray(this.elementShow)) {
        const list = Object.keys(showList)
        const matchList = list.filter((x) => this.elementShow.includes(x))
        return { ...showList, ...toObject(matchList) }
      }
      const list = Object.keys(this.elementShow)
      const defaultList = Object.keys(showList)
      const matchList = intersection(list, defaultList)
      return { ...showList, ...toObject(matchList) }
    },
    getCategory() {
      const category = this.data.diet_category
        ? this.$get(this.data, 'diet_category', null)
        : this.$get(this.data, 'post_categories[0]', null)
      return {
        title: category.title || '',
        slug: category.slug || '',
      }
    },
  },
  methods: {
    getItemStyle(item) {
      return {
        backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 0.52), rgba(255, 248, 248, 0.15)),
              url(${this.$$strapi.getMediaLink(item.featured_media, 'small')})`,
        'background-repeat': 'no-repeat',
        'background-size': 'cover',
      }
    },
    buiImageFlex() {
      switch (this.pageType) {
        case 'diet':
          return 40
        case 'post':
          return 'var(--elm-image-flex)'

        default:
          return 45
      }
    },
    getItemContent(item) {
      if (item.excerpt) return item.excerpt
      return item.content || ''
    },
  },
}
</script>

<style lang="scss">
.widget {
  --elm-spacing: 70px;
  --elm-rounded: 10px;
  --elm-border: 1px solid var(--clr-gray-dark);
  --elm-image-width: 45%;
  --elm-image-height: 210px;
  --elm-image-flex: var(--elm-image-width);
  --elm-content-padding: 30px;
  --elm-content-align: auto;

  @media (max-width: 768px) {
    --elm-content-padding: 15px;
    --elm-image-height: 170px;
  }

  &__border-none {
    --elm-border: unset;
  }

  &__image--large {
    --elm-image-width: 60%;
    --elm-image-height: 400px;
    --elm-content-padding: 10px;
  }

  &__grid {
    gap: var(--elm-spacing);

    &--item {
      width: calc((100% - var(--elm-spacing)) / 2);
    }

    &--reverse {
      .widget__item--wrap {
        display: flex;
        flex-direction: row-reverse
      }
    }

    &--sm-content {
      --elm-content-padding: 0;
      --elm-image-height: 150px;
      --elm-image-width: 300px;
      @media (max-width: 768px) {
        --elm-image-width: 200px;
      }

      .wrap {
        padding: 30px;
        border-radius: 10px;
        border: 1px solid var(--clr-gray-dark);
      }

      .icon__circle {
        width: 15px;
        height: 15px;
      }
    }


  }

  &__item {
    &--head {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-bottom: 10px;
    }

    &--wrap {
      gap: 10px;
    }

    &--image {
      border-radius: var(--elm-rounded);
      display: flex;
      justify-content: space-between;
      flex-direction: column;
      position: relative;
      height: var(--elm-image-height);
      width: var(--elm-image-width);
      flex: 0 0 var(--elm-image-flex);

      &--content {
        bottom: 20px;
        left: 20px;
        padding-right: 20px;
        min-height: 45px;
        z-index: 1;

        >span {
          padding: 3px 15px 3px 10px;
          font-size: var(--fs-sm);
          font-weight: var(--font-weight-6);
        }

        .badge {
          background-color: var(--section-main-clr);
        }

        h5 {
          margin-top: 5px;
          margin-bottom: 0;
          font-weight: var(--font-weight-7);
          color: var(--clr-white);
        }
      }
    }

    &--desc {
      display: flex;
      justify-content: var(--elm-content-align);
      flex-direction: column;
      border-radius: var(--elm-rounded);
      border: var(--elm-border);
      padding: var(--elm-content-padding);
      font-weight: var(--font-weight-4);
      font-size: var(--fs-sm);
      max-width: calc(100% - var(--elm-image-width) - 10px);
    }

    &--badge {
      display: flex;
      align-items: center;
      width: fit-content;
      border-radius: 100px;
      gap: 6px;
      padding: 0 3px;
      background-color: var(--clr-orange-primary);
      font-size: var(--fs-sm);
      color: var(--clr-white);

      span {
        padding-right: 2px;
      }

      .icon__circle {
        position: relative;
        width: 15px !important;
        height: 15px !important;
        background-color: var(--clr-white);
        border-radius: 50%;

        svg {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
      }
    }
  }
}

.widget__item--content {
  h4 {
    font-size: var(--fs-lg);
    font-weight: var(--font-weight-7);
    margin-bottom: 10px;
  }
}

.nuxt-link-disabled {
  cursor: default !important;
}

.member-total {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 0;
  background: var(--clr-white);
  font-weight: var(--font-weight-6);
  font-size: var(--fs-sm);
  border-radius: 0px 0px 10px 10px;
  padding: 5px 20px;
  color: var(--clr-black);
  @media (max-width: 768px) {
    padding: 5px 10px;
    width: 60%;
    text-align: center;
  }
}

.text-shadow {
    text-shadow: #fff -2px -2px 0, #fff -2px -1px 0, #fff -2px 0 0, #fff -2px 1px 0, #fff -2px 2px 0, #fff -1px -2px 0, #fff -1px -1px 0, #fff -1px 0 0, #fff -1px 1px 0, #fff -1px 2px 0, #fff 0 -2px 0, #fff 0 -1px 0, #fff 0 0 0, #fff 0 1px 0, #fff 0 2px 0, #fff 1px -2px 0, #fff 1px -1px 0, #fff 1px 0 0, #fff 1px 1px 0, #fff 1px 2px 0, #fff 2px -2px 0, #fff 2px -1px 0, #fff 2px 0 0, #fff 2px 1px 0, #fff 2px 2px 0;
}

.text-primary {
    color: #e5625c!important;
    font-family: Nunito;
    font-style: normal;
    font-weight: 600;
    font-size: 1.25rem;
}
</style>
