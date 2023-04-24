<template>
  <div v-if="data" class="card__vertical">
    <div class="card__vertical--image position-relative">
      <NuxtLink
        :to="navigateTo"
      >
        <div class="img-blog">
          <img
            :src="$$strapi.getMediaLink(data.featured_media, 'small')"
            class="img-response"
            alt="image-31"
            loading="lazy"
          />
        </div>
      </NuxtLink>
      <div class="action-icon-right">
         <div v-if="$$isSigned && isEditable" class="icon icon-wrap-circle" @click="editItem()">
          <img
            class="btn p-0"
            src="/icons/edit.svg"
          />
        </div>

         <div v-if="$$isSigned && isEditable" class="icon icon-wrap-circle" @click="removeItem()">
          <img
            class="btn p-0 ml-2 trash-icon"
            src="/icons/trash-bin.svg"
          />
        </div>

        <div class="icon icon-bookmark"  @click="bookMark()">
          <img
            class="btn p-0"
            src="/icons/bookmark-yellow.svg"
            alt="bookmark-yellow"
          />
        </div>

        <div class="icon icon-wrap-circle cursor-pointer" @click="openShareModal()">
          <img src="/icons/share.svg" alt="share" class="filter-orange" />
        </div>
      </div>
      <div class="card__vertical--author">
        <NuxtLink :to="{ name: 'profile-slug', params: { slug: data.author?.username || 'error' } }" class="img-author">
          <CommonAvatar :data="data.author" />
        </NuxtLink>
        <div v-if="data.post_categories?.length" class="mt-2">
          <NuxtLink :to="{ name: 'tag-slug', params: { slug: data.post_categories[0].slug }}"
            class="tag line-clamp-1"
          >
            # {{ data.post_categories?.[0]?.title }}
          </NuxtLink>
        </div>
        <div v-else class="tag line-clamp-1 mt-2">#</div>
      </div>
    </div>
    <span v-if="isTop" class="top-number font-mitr">{{ Index }}</span>
    <div class="bottom-blog">
      <NuxtLink
        :to="{ name: pageType + '-slug', params: { slug: data.slug || 'error' } }"
      >
        <h3 class="card__vertical--title line-clamp-2">{{ data.title }}</h3>
      </NuxtLink>
      <div
        v-if="!isTop"
        v-html="data.excerpt || data.content"
        class="card__vertical--content"
        :class="`line-clamp-${ $$isMobile ? 2 : 2 }`"
      />
      <div class="social-share mt-2">
        <div class="icon-comment">{{ count.comments }}</div>
        <div class="icon-like">{{ count.likes }}</div>
        <div class="icon-share">{{ count.shares }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import card from './card.mixin';

export default {
  mixins: [card],
  props: {
    data: {
      type: Object,
      required: true,
    },
    isTop: {
      type: Boolean,
      default: false
    },
    Index: {
      type: Number,
      default: 1
    },
    itemClasses: {
      type: String,
      default: '',
    },
    itemStyles: {
      type: Object,
      default:() => {},
    },
    isLogin: {
      type: Boolean,
      default: false
    },
    pageType: {
      type: String,
      default: 'recipe'
    }
  },
  data() {
    return {
      count: {
        likes: 0,
        comments: 0,
        shares: 0
      }
    }
  },
  // async mounted() {
  //   const self = this

    // await this.$strapi.count('likes', {
    //   'post': this.data.id,
    // }).then((result) => {
    //   self.count.likes = result
    // }).catch((err) => {
    //   self.$toast.error(err)
    // });
    // await this.$strapi.count('comments', {
    //   'post': this.data.id,
    // }).then((result) => {
    //   self.count.comments = result
    // }).catch((err) => {
    //   self.$toast.error(err)
    // });

  // },
}
</script>

<style lang="scss" scoped>
.card__vertical {
  --elm-clr: var(--clr-green-primary);

  background: #fff;
  box-shadow: 2px 2px 10px 1px rgb(0 0 0 / 5%);
  border-radius: 20px;
  padding: 15px 20px 20px;
  .action-icon-right {
    position: absolute;
    right: 16px;
    top: 10px;
    display: flex;
    align-items: center;
    z-index: 1;
    gap: 5px;
  }
  .tag {
    background-color: var(--elm-clr);
  }
}
.card__vertical--image {
  position: relative;
  .img-blog {
    position: relative;
    padding-top: 200px;
    background: #8898aa;
    border-radius: 25px;
    overflow: hidden;
    img {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}
.card__vertical--title {
  height: 3.2rem;
  margin: 14px 0 8px 0;
  font-weight: 600;
  line-height: 1.7rem;
  color: #4f4f4f;
}
.card__vertical--content {
  max-height: 3.9rem;
  overflow: hidden;
  font-family: Nunito;
  font-style: normal;
  font-weight: 300;
  font-size: .9rem;
  line-height: 1.25rem;
  color: #4f4f4f;
}
.card__vertical--author {
  position: absolute;
  bottom: 20px;
  left: 10px;
}
.top-number {
  position: absolute;
  bottom: 0;
  right: 1rem;
  font-weight: 500;
  font-size: 60px;
  -webkit-text-fill-color: white;
  -webkit-text-stroke-width: 3px;
  -webkit-text-stroke-color: var(--elm-clr);
}
.social-share {
  display: flex;
  align-items: center;
  color: var(--elm-clr);
  font-family: Nunito;
  font-style: normal;
  font-weight: 600;
  font-size: var(--fs-sm);
  gap: 5px;

  .icon-comment,
  .icon-like,
  .icon-share {
    position: relative;
  }

  .icon-comment:before,
  .licon-ike:before,
  .icon-share:before {
    content: '';
    background: url('/icons/comment-green.png') center center;
    background-size: cover;
    width: 18px;
    height: 14px;
    display: block;
    position: absolute;
    left: -22px;
    top: 3px;
  }

  .icon-like:before {
    background: url('/icons/like-green.png') center center;
    background-size: cover;
  }

  .icon-share:before {
    background: url('/icons/share-2.png') center center;
    background-size: cover;
    width: 14px;
  }

  .icon-comment,
  .icon-like,
  .icon-share {
    margin-right: 10px;
    margin-left: 23px;
    text-align: right;
  }

  div {
    position: relative;
    cursor: pointer;
    margin-right: 10px;
  }
}

</style>

