<template>
  <div class="card__image">
    <NuxtLink :to="{ name: 'recipe-slug', params: { slug: data.slug } }">
      <div
        :style="wrapperStyles"
        class="card__image--bg rounded-20px bg-shadow"
      >
      </div>
      <div class="content-title-bottom">
        <h3 :class="titleClass" class="card__image--title">{{ data.title }}</h3>
        <div class="card__image--author">
          <div class="symbol me-2">
            <CommonAvatar v-if="data.author" :author="data.author" :avatar-size="$$isMobile ? 'small' : 'normal'" />
          </div>
          <div class="cal">
            <div class="p">
              <span class="p-wrap">
                <img width="12" src="/icons/cooking-time.svg" alt />
              </span>
              {{ data.cooking_time || 0 }} p
            </div>
          </div>
        </div>
      </div>
    </NuxtLink>
    <div class="action-icon-right">
      <div v-if="$$isSigned" class="icon icon-wrap-circle me-2" @onClick="$emit('edit-item', data)">
        <img
          class="btn p-0"
          src="/icons/edit.svg"
        />
      </div>

      <div v-if="$$isSigned" class="icon icon-wrap-circle me-2" @onClick="$emit('remove-item', data)">
        <img
          class="btn p-0 trash-icon"
          src="/icons/trash-bin.svg"
        />
      </div>

      <div class="icon icon-bookmark cursor-pointer" @onClick="openAddRecipeModal()">
        <img src="/icons/bookmark-yellow.svg" alt="bookmark-yellow" />
      </div>
      <div v-if="hasMaterialIcon" class="icon ms-1 icon-bookmark cursor-pointer">
        <img src="/icons/material.svg" alt="bookmark-yellow" />
      </div>
      <!-- <div class="icon__circle" @onClick="shareUrl('/recipe/' + item.slug)"> -->
      <div class="icon-wrap-circle">
        <img src="/icons/share.svg" alt="bookmark-yellow" />
      </div>
    </div>
    <div v-if="getListShowElements.number_top" class="number-top">{{ index + 1 }}</div>
  </div>
</template>

<script>
const showList = {
  avatar: true,
  number_top: false,
}
const intersection = (xs, ys) => xs.filter((x) => ys.includes(x))
const toObject = (array) => array.reduce((ac, a) => ({ ...ac, [a]: true }), {})
export default {
  props: {
    data: {
      type: Object,
      required: true,
    },
    hasMaterialIcon: {
      type: Boolean,
      default: true,
    },
    imageRatioPercent: {
      type: Number,
      default: 0
    },
    gradientBackground: {
      type: Boolean,
      default: true,
    },
    toPageName: {
      type: String,
      default: '',
    },
    itemStyles: {
      type: Object,
      default:() => {},
    },
    titleClass: {
      type: String,
      default: 'text-yellow text-shadow h4 text-overfl-3'
    },
    isLogin: {
      type: Boolean,
      default: false
    },
    index: {
      type: Number,
      default: 0
    },
    elementShow: {
      type: [Object, Array],
      default: () => [],
    },
  },
  data() {
    this.showList = showList
    return {}
  },
  computed: {
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
    wrapperStyles() {
      return {
        backgroundImage: this.gradientBackground
          ? `linear-gradient(to top, rgba(0, 0, 0, 0.52), rgba(255, 248, 248, 0.15)), url(${this.$$strapi.getMediaLink(this.data.featured_media, 'small')})`:
          'url(' + this.$$strapi.getMediaLink(this.data.featured_media, 'small') + ')',
        'background-size': 'cover',
        'background-position': 'center',
        ...this.styles
      }
    },
    styles() {
      let res = {...this.itemStyles}
      if(+this.imageRatioPercent > 0) {
        res = {
          ...res,
          'padding-top': this.imageRatioPercent + '%',
        }
      }
      return res
    }
  },
  methods: {
    openAddRecipeModal() {
      if(this.$strapi.user) {
        this.$emit('open-modal', this.item, 'recipe', "Món ăn")
      } else {
        this.$toast.error('Bạn phải đăng nhập trước khi tạo bộ sưu tập')
        this.$store.dispatch('modules/app/changeModeForm', 'login')
        this.$store.dispatch('modules/app/changeFormStatus', true)
      }
    },
    getAspectRatio() {
      if(+this.imageRatioPercent > 0) {
        return this.imageRatioPercent
      }
      if(this.itemStyles?.height && this.itemStyles?.width) {
        const numReg = /\d+/i
        const height = this.itemStyles.height.match(numReg)
        const width = this.itemStyles.width.match(numReg)
        return (height / width) * 100
      }
      return 56.25
    },
  },
}

</script>
<style lang="scss" scoped>
.card__image {
  position: relative;

  .content-title-bottom {
    position: absolute;
    bottom: 20px;
    left: 20px;
    right: 20px;
  }
  &--bg {
    box-shadow: 4px 4px 11px 1px rgba(0, 0, 0, 0.12);
    border-radius: 20px;
  }
  &--author {
    display: flex;
  }
  &--title {
    text-shadow: 1px 0 0 #fff, 0 1px 0 #fff, -1px 0 0 #fff, 0 -1px 0 #fff;
    color: var(--clr-red-primary);
    font-family: Nunito;
    font-style: normal;
    font-weight: 600;
    font-size: 1.25rem;
  }
}
.cal {
  display: flex;
  align-items: center;
  color: #fff;
  font-family: Nunito;
  font-style: normal;
  font-weight: 600;
  font-size: .9rem;
  margin: 0;

  .cal-number {
    background: #df8c26;
    border-radius: 100px;
    padding: 0px 5px;
    margin-right: 10px;
    display: flex;
    align-items: center;
  }
  #__layout h1, #__layout .h1{
      font-size: 1.375rem;
      line-height: 1.4;
  }
  .p {
    background: #e5625c;
    border-radius: 100px;
    padding: 0px 5px;
    display: flex;
    align-items: center;
  }
  .p-wrap {
    margin-right: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background-color: #fff;
  }
}
.action-icon-right {
  position: absolute;
  right: 16px;
  top: 10px;
  display: flex;
  align-items: center;
  z-index: 1;
}

.icon__circle {
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background-color: #fff;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
  z-index: 1;
  position: relative;
  margin-left: 5px;
  cursor: pointer;
  svg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}

.number-top {
  font-size: 5rem;
  line-height: 110px;
  display: flex;
  align-items: center;
  color: #df8c26;
  font-weight: 700;
  position: absolute;
  left: 25px;
  top: -30px;
  z-index: 1;
  text-shadow: 1px 0 0 #fff, 0 1px 0 #fff, -1px 0 0 #fff, 0 -1px 0 #fff;
}
</style>
