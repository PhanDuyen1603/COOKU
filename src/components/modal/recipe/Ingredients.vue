<template>
  <div>
    <div class="pop-masonry">
      <CommonListColorCircle />
      <div class="pop-masonry__title title-popup pt-0 pb-0 mt-2 mb-3">Nghiên liệu</div>
      <div class="pop-masonry__input-wrap input-text-wrap d-flex">
        <input
          v-model="searchString"
          type="text"
          placeholder="Tìm kiếm....."
          class="input-texts"
        />
        <div
          class="pop-masonry__icon-wrap wrap-icon fix-width-ic d-flex"
          @click="handlerFilter(searchString)"
        >
          <div class="title">Tìm kiếm</div>
          <img src="/images/search.png" />
        </div>
      </div>

      <ul
        v-if="tabs && tabs.length > 0"
        class="nav nav-tabs justify-content-left pb-3"
      >
        <li
          v-for="(item, index) in tabs"
          :key="index"
          class="nav-item tabs-title"
        >
          <a
            :class="{ active: currentTab === index }"
            class="nav-link tabs-link"
            @click="changeTabData(index, item.tab)"
            >{{ item.name }}</a
          >
        </li>
      </ul>

      <CommonListView :dataList="filterData" :items-to-show="5" :item-space="15" class="list__modal" :load-more="false">
        <template #item="{ data }">
          <div class="object-image masonry__item" style="padding-top: 69%" @click="getItem(data)">

            <img :src="$$strapi.getMediaLink(data.featured_media, 'small')" alt="">
            <p class="masonry__item--title">{{ data.title }}</p>
            <p class="masonry__item--overlay"></p>
          </div>
        </template>
      </CommonListView>

    </div>
  </div>
</template>

<script>
import _debounce from 'lodash/debounce';
import { removeAccent } from '~/utils/StringUtils'
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    cooks: {
      type: Array,
      required: true,
    },
    tabs: {
      type: Array,
      default: () => [],
    },
    isNavigate: {
      type: Boolean,
      default: false,
    },
    dataList: {
      type: Array,
      dedault:() => []
    }
  },
  data() {
    return {
      list: [],
      searchString: '',
      currentTab: 0,
    }
  },
  computed: {
    tagOptions() {
      const tabs = this.tabs.map((header) => {
        if (typeof header === 'string') return { text: header }
        else return header
      })
      return tabs
    },
    filterData() {
      return (!this.searchString || this.list.length) ? this.dataList : this.list
    }
  },
  watch: {
    searchString(val, oldVal) {
      this.handlerFilter(val)
    },
  },
  methods: {
    removeAccent,
    changeMainCook(name, type, slug) {
      this.$emit('change-main-cook', name, type, slug)
    },
    handlerFilter: _debounce(function(filterString) {
      const self = this
      const filter = self.removeAccent(filterString.toLowerCase())
      this.list = filterString && filterString.length > 0
          ? this.dataList.filter((item) => self.removeAccent(item.title.toLowerCase()).includes(filter) || item.title.toLowerCase().includes(filterString))
          : this.dataList
    }, 1000),
    changeTabData(tabIndex, tagName) {
      this.currentTab = tabIndex
      this.$emit('change-tab-data', tagName)
    },
    handleScroll() {
      if (this.$refs.scrollElement) {
        const bottomOfElement =
          Math.ceil(this.$refs.scrollElement.scrollTop) +
            Math.ceil(this.$refs.scrollElement.offsetHeight) >=
          Math.ceil(this.$refs.scrollElement.scrollHeight)
        if (bottomOfElement) {
          this.$emit('handle-scroll', this.title, this.searchString.length > 0)
        }
      }
    },
    getItem(data) {
      this.$emit('close', data)
    }
  },
}
</script>
<style lang="scss" scoped>
.pop-masonry {
  &__title {
    font-weight: 700;
    font-size: 25px;
    margin-top: 30px;
    margin-bottom: 30px;
    color: #4f4f4f;
    text-align: center;
  }
  &__input-wrap {
    background: #fff;
    border: 2px solid #fbe4c8;
    box-sizing: border-box;
    border-radius: 30px;
    padding: 5px 8px 5px 10px;
    margin: 10px;
    input {
      background: #fbfbfb;
      border-radius: 30px;
      padding: 5px 10px;
      border: none;
      font-size: 20px;
      line-height: 27px;
      color: #4f4f4f;
      outline: none;
      width: 100%;
    }
  }
  &__icon-wrap {
    width: 120px;
    height: 37px;
    padding: 5px 10px;
    background: #df8c26;
    border-radius: 100px;
    margin-left: 10px;
    cursor: pointer;
    color: #fff;
    font-weight: 600;
    font-size: var(--fs-sm);
    display: flex;
    justify-content: space-between;
    align-items: center;
    img {
      width: 20px;
      height: 20px;
    }
  }
}
.masonry__item {
  overflow: hidden;
  border-radius: 8px;
  transition: .4s all ease;
  &:hover {
    .masonry__item--title {
      // transform: translateY(0);
      color: #fff;
    }
    .masonry__item--overlay {
      background: linear-gradient(180deg,rgba(0,0,0,.0001),#000);
    }
  }
  &--title {
    position: absolute;
    bottom: 5px;
    left: 5px;
    // transform: translateY(50px);
    color: var(--clr-orange-primary);
    font-weight: 600;
    transition: .4s all ease;
    z-index: 3;

  }
  &--overlay {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    transition: .2s all ease;
  }
}
</style>