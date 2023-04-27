<template>
  <div class="list" :style="defaultVariables">
    <div class="list__wrapper">
      <CommonSliderCustomSwiprer
        v-if="viewMode === listViews.SLIDE"
        :dataList="totalShowItems"
        :itemShow="itemsToShow"
        :itemsSpace="itemSpace"
        v-bind="extraWrapperOptions"
      >
        <template #slider="{ data, index }">
          <slot name="item" :data="data">
            <component
              :is="getComponent(itemComponent)"
              :data="data"
              :pageType="pageType"
              :route-info="buildRoute(data)"
              :card-index="index + 1"
              v-bind="itemProps"
              :isEditable="isEditable"
              @click="handleItemAction"
              @remove-item="(id) => $emit('remove-item', id)"
            />
          </slot>
        </template>
      </CommonSliderCustomSwiprer>
      <div
        v-if="viewMode === listViews.GRID"
        class="list__grid"
        :class="wrapperClass"
        v-bind="extraWrapperOptions"
      >
        <div v-for="(item, index) in totalShowItems">
          <slot name="item" :data="item" :index="index">
            <component
              :is="getComponent(itemComponent)"
              :key="index"
              :data="item"
              :index="index"
              :pageType="pageType"
              :isEditable="isEditable"
              v-bind="itemProps"
              @click="handleItemAction"
              @remove-item="(id) => $emit('remove-item', id)"
            />
          </slot>
        </div>
      </div>
      <div
        v-if="viewMode === listViews.MASONRY"
        class="list__grid"
        :class="wrapperClass"
        v-bind="extraWrapperOptions"
      >

        <component
          :is="getComponent(itemComponent)"
          v-for="(item, index) in totalShowItems"
          :key="index"
          :item="item"
          :card-index="index + 1"
          :pageType="pageType"
          :isEditable="isEditable"
          v-bind="itemProps"
          @click="handleItemAction"
          @remove-item="(id) => $emit('remove-item', id)"
        />
      </div>
      <LoadingCardsList
        v-if="loadingState"
        :items-to-show="itemsToShow"
      ></LoadingCardsList>
      <div v-if="loadMore && dataList.length && dataList.length % itemsToShow === 0" class="loadmore clicked" @click="handleLoadMore">
        <span class="loadmore__btn">
          <!--  -->
          <LoadingSpinnerDotFlashing v-if="loadingMore" />
          <span v-else>Xem thêm</span>
        </span>
      </div>
      <div v-if="message && !loadingState" class="list__message">
        {{ message }}
      </div>
    </div>
  </div>
</template>

<script>
import { resolveComponent } from 'vue'
import { listViews } from '~/constants/theme'
import { postTypes } from '~/constants/app'
import _cloneDeep from 'lodash/cloneDeep'

const messages = {
  error: 'Đã có lỗi xảy ra',
  noItemFound: 'Không có kết quả tìm kiếm',
  lastItem: ''
}

export default {
  props: {
    itemsToShow: {
      type: Number,
      default: 4,
    },
    viewMode: {
      type: String,
      default: 'grid',
      validator: (value) => Object.values(listViews).includes(value),
    },

    dataList: {
      type: [Array, Object],
      required: true,
    },

    pageType: {
      type: String,
      default: 'recipe',
      validator: (value) => Object.values(postTypes).includes(value),
    },

    itemComponent: {
      type: String,
      default: null,
    },

    itemSpace: {
      type: Number,
      default: 8,
    },

    loadMore: {
      type: Boolean,
      default: false,
    },

    loadingState: {
      type: Boolean,
      default: false,
    },

    loadingMore: {
      type: Boolean,
      default: false,
    },

    keyEvent: {
      type: String,
      default: '',
    },

    itemProps: {
      type: Object,
      default: () => {},
    },

    extraWrapperOptions: {
      type: Object,
      default: () => {},
    },

    total: {
      type: Number,
      default: null
    },
    isEditable: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      listViews,
    }
  },
  computed: {
    wrapperClass() {
      return [`list__wrapper--${this.viewMode}`]
    },
    defaultVariables() {
      return {
        '--item-show': this.itemsToShow,
        '--item-space': this.itemSpace + 'px',
      }
    },
    totalShowItems() {
      if(this.total && this.dataList) return _cloneDeep(this.dataList).slice(0, this.total)
      return _cloneDeep(this.dataList)
    },
    message() {
      if(!this.dataList) return messages.error
      if(this.dataList.length === 0) return messages.noItemFound
      if(this.loadMore && this.dataList.length % this.itemsToShow === 0) return messages.lastItem
      return ''
    }
  },
  methods: {
    getComponent(name) {
      return resolveComponent(name)
    },
    handleLoadMore() {
      this.$emit('handle-load-more', this.keyEvent)
    },
    buildRoute(item) {
      return {
        name: this.pageType + '-slug',
        param: {
          slug: item.slug,
        },
      }
    },
    handleItemAction(action, item) {
      this.$emit('handleItemAction', item, action)
    }
  },
}
</script>

<style lang="scss" scoped>
.list {
  --item-show: 4;
  --item-space: 30px;
  --item-height: 330px;
  --item-min-width: 100px;

  --total-gap-width: calc((var(--item-show) - 1) * var(--item-space));
  --grid-item--max-width: calc(
    (100% - var(--total-gap-width)) / var(--item-show)
  );

  &__wrapper--grid {
    display: grid;
    grid-template-columns: repeat(
      var(--item-show),
      calc(var(--grid-item--max-width))
    );
    gap: var(--item-space);
  }

  &__message {
    margin-top: 20px;
    text-align: center;
  }

  &__modal {
    max-height: 600px;
    overflow-y: scroll;
  }
}

.loadmore {
  margin-top: 30px;
  width: 100%;
  border-radius: 8px;
  border: 1px solid var(--section-main-clr);
  color: var(--section-main-clr);
  padding: 5px 10px;
  text-align: center;
  transition: all 0.3s ease;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;

  &__btn {
    font-weight: var(--font-weight-7);
  }

  &:hover {
    background-color: var(--section-main-clr);
    color: var(--clr-white);
  }
}
</style>
