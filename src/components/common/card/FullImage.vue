<template>
  <div class="card__image">
    <NuxtLink :to="navigateTo">
      <div
        :style="wrapperStyles"
        class="card__image--bg rounded-20px bg-shadow"
      >
      </div>
      <div class="content-title-bottom">
        <h3 :class="titleClass" class="card__image--title">{{ data.title }}</h3>
        <div class="card__image--author">
          <div class="symbol me-2">
            <CommonAvatar v-if="data.author" :data="data.author" :avatar-size="$$isMobile ? 'small' : 'normal'" />
          </div>
          <div v-if="getListShowElements.cooking_time" class="cal">
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
      <div v-if="unref($$isSigned) && isEditable" class="icon icon-wrap-circle" @click="editItem()">
        <img
          class="btn p-0"
          src="/icons/edit.svg"
        />
      </div>

      <div v-if="$$isSigned && isEditable" class="icon icon-wrap-circle" @click="removeItem()">
        <img
          class="btn p-0 trash-icon"
          src="/icons/trash-bin.svg"
        />
      </div>

      <div v-if="getListShowElements.bookMark" class="icon icon-bookmark cursor-pointer" @click="bookMark()">
        <img src="/icons/bookmark-yellow.svg" alt="bookmark-yellow" />
      </div>
      <!-- TODO: show material list -->
      <div v-if="getListShowElements.icon_material" class="icon ms-1 icon-bookmark cursor-pointer">
        <img src="/icons/material.svg" alt="bookmark-yellow" />
      </div>
      <!-- <div class="icon__circle" @onClick="shareUrl('/recipe/' + item.slug)"> -->
      <div class="icon-wrap-circle cursor-pointer">
        <img src="/icons/share.svg" alt="bookmark-yellow" class="filter-orange"  @click="openShareModal()"/>
      </div>
    </div>
    <div v-if="getListShowElements.number_top" class="number-top">{{ index + 1 }}</div>
  </div>
</template>

<script>
import card from './card.mixin';

const showList = {
  avatar: true,
  number_top: false,
  icon_material: false,
  bookMark: true,
  cooking_time: false
}
const intersection = (xs, ys) => xs.filter((x) => ys.includes(x))
const toObject = (array) => array.reduce((ac, a) => ({ ...ac, [a]: true }), {})
export default {
  mixins: [card],
  props: {
    data: {
      type: Object,
      required: true,
    },
    imageRatioPercent: {
      type: Number,
      default: 0
    },
    gradientBackground: {
      type: Boolean,
      default: true,
    },
    pageType: {
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
    isLoginEditable: {
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
      // const list = Object.keys(this.elementShow)
      // const defaultList = Object.keys(showList)
      // const matchList = intersection(list, defaultList)
      return { ...showList, ...this.elementShow }
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
  --elm-rounded: 20px;
  --elm-border: 1px solid var(--clr-gray-dark);
  --elm-image-width: 45%;
  --elm-content-padding: 30px;
  --elm-content-align: auto;
  --elm-clr: var(--clr-orange-primary);

  position: relative;

  .content-title-bottom {
    position: absolute;
    bottom: 20px;
    left: 20px;
    right: 20px;
  }
  &--bg {
    box-shadow: 4px 4px 11px 1px rgba(0, 0, 0, 0.12);
    border-radius: var(--elm-rounded);
  }
  &--author {
    display: flex;
    justify-content: space-between;
  }
  &--title {
    text-shadow: 1px 0 0 #fff, 0 1px 0 #fff, -1px 0 0 #fff, 0 -1px 0 #fff;
    color: var(--elm-clr);
    font-family: Nunito;
    font-style: normal;
    font-weight: 600;
    font-size: var(--fs-lg);
  }
}
.cal {
  display: flex;
  align-items: center;
  color: #fff;
  font-family: Nunito;
  font-style: normal;
  font-weight: 600;
  font-size: var(--fs-sm);
  margin: 0;

  .cal-number {
    background: var(--elm-clr);
    border-radius: 100px;
    padding: 0px 5px;
    margin-right: 10px;
    display: flex;
    align-items: center;
  }
  #__layout h1, #__layout .h1{
      font-size: var(--fs-xl);
      line-height: 1.4;
  }
  .p {
    background: var(--elm-clr);
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
  gap: 5px;
  .icon {
    height: 25px;
  }
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
  color: var(--elm-clr);
  font-weight: 700;
  position: absolute;
  left: 25px;
  top: -60px;
  z-index: 1;
  text-shadow: 1px 0 0 #fff, 0 1px 0 #fff, -1px 0 0 #fff, 0 -1px 0 #fff;
}
</style>
