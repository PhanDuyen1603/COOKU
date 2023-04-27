<template>
  <div class="widget__grid">
    <div v-for="(item, i) in dataList" :key="i" class="widget__grid__card clicked">
      <nuxt-link :to="buildNavigate(item)" class="card card--image h-100" :style="getItemStyle(item)">
      </nuxt-link>
      <div class="widget__grid__card--content">
        <nuxt-link :to="buildNavigate(item)">
          <h5 class="text-primary text-shadow">
            {{ item.title }}
          </h5>
        </nuxt-link>
        <NuxtLink v-if="!isStatic" :to="buildNavigate(item)" >
          <span class="badge rounded-pill">#{{ item.diet_category?.title }}</span>
        </NuxtLink>
        
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    dataList: {
      type: Array,
      required: true,
    },
    isStatic: {
      type: Boolean,
      default: false,
    },
    isNavigate: {
      type: Boolean,
      default: true,
    },
    pageType: {
      type: String,
      default: 'diet'
    }
  },
  methods: {
    getItemStyle(item) {
      return {
        backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 0.52), rgba(255, 248, 248, 0.15)),
              url(${this.getItemImage(item)})`,
        'background-repeat': 'no-repeat',
        'background-size': 'cover',
      }
    },
    getItemImage(item) {
      if (this.isStatic) return item.featured_media.url
      return this.$$strapi.getMediaLink(item.featured_media, 'small')
    },
    buildNavigate(item) {
      if (!this.pageType || !this.isNavigate) return { path: '#' }
      return { name: this.pageType + '-slug', params: { slug: item.slug || 'error' } }
    },
  },
}
</script>

<style lang="scss" scoped>
.widget__grid {
  --elm-rounded: 10px;
  --elm-color: var(--section-main-clr, #000);
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 230px 230px;
  grid-gap: 10px;
  @media (max-width: 768px) {
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: 230px 150px 150px;
    &__card:first-child {
      grid-column-start: 1;
      grid-column-end: span 4;
      grid-row-start: 1;
      grid-row-end: span 1 !important;
    }
    &__card:not(:first-child) {
      grid-column-end: span 2;
    }
  }

  &--custom {
    grid-gap: 20px;
    grid-template-rows: 200px 200px;

    .widget__grid__card:last-child {
      grid-column-start: 2;
      grid-column-end: 4;
      grid-row-start: 2;
    }

    .widget__grid__card--content {
      top: 0;
      left: 0;
      padding: 5px 20px;
      background-color: var(--elm-color);
      height: fit-content;
      border-radius: 10px 0;

      h5 {
        color: var(--clr-white);
        margin: 0;
        font-size: var(--fs-lg);
      }

    }
  }

  &--custom-2 {
    grid-template-columns: repeat(6, 1fr);
    grid-template-rows: 230px 230px 230px;
    grid-gap: 20px;

    .widget__grid__card:first-child {
      grid-column-start: 1;
      grid-column-end: span 3;
      grid-row-start: 1;
      grid-row-end: span 1;
    }

    .widget__grid__card:nth-child(2) {
      grid-column-start: 4;
      grid-column-end: 7;
      grid-row-start: 1;
    }

    .widget__grid__card:nth-child(3) {
      grid-column-start: 1;
      grid-column-end: span 2;
      grid-row-start: 2;
      grid-row-end: span 2;
    }

    .widget__grid__card:nth-child(4) {
      grid-column-start: 3;
      grid-column-end: span 2;
      grid-row-start: 2;
    }

    .widget__grid__card:nth-child(5) {
      grid-column-end: span 2;
      grid-row-start: 2;
    }

    .widget__grid__card:nth-child(6) {
      grid-column-start: 3;
      grid-column-end: 7;
      grid-row-start: 3;
    }

    .widget__grid__card--content {
      top: 0;
      left: 0;
      padding: 5px 20px;
      background-color: var(--elm-color);
      height: fit-content;
      border-radius: 10px 0;

      h5 {
        color: var(--clr-white);
        margin: 0;
        font-size: var(--fs-lg);
      }
    }
  }

  &__card:first-child {
    grid-row-start: 1;
    grid-row-end: span 2;
  }

  &__card {
    position: relative;
    border-radius: var(--elm-rounded);
    overflow: hidden;

    &--content {
      position: absolute;
      bottom: 20px;
      left: 20px;
      z-index: 1;
      @media (max-width: 768px) {
        bottom: 5px;
        left: 5px;
      }

      span {
        padding: 3px 15px 3px 10px;
        font-size: var(--fs-sm);
        font-weight: var(--font-weight-6);
      }

      .badge {
        background-color: var(--section-main-clr);
      }

      h5 {
        margin-top: 5px;
        font-weight: var(--font-weight-7);
        color: var(--clr-white);
        @media (max-width: 768px) {
          font-size: var(--fs-normal);
        }
      }
    }
  }
}
</style>
