<template>
  <CommonSectionWrapperType1>
    <ul class="tag-search my-4">
      <li v-if="recipeCollections" class="mr-3 cursor-pointer" :class="{ active: tabActive == 'recipes' }"
        @click="handleChangeTab('recipes')">
        <span>Món ăn ({{recipeCollections.length}})</span>
      </li>
      <li v-if="postCollections" class="cursor-pointer" :class="{ active: tabActive == 'posts' }"
        @click="handleChangeTab('posts')">
        <span> Bài viết ({{ postCollections.length }})</span>
      </li>
    </ul>
      <div>
        <CommonListView
          v-if="tabActive == 'recipes' && recipeCollections.length"
          :items-to-show="$$isMobile ? 1 : 2"
          :item-space="20"
          item-component="LazyCommonCardHorizonal2"
          :dataList="recipeCollections"
          :isEditable="isEditable"
          @remove-item="removeItem"
          type="recipe"
          :itemProps="{
            itemStyles:{
              height: '240px'
            }
          }"
        />

        <CommonListView
          v-if="tabActive == 'posts' && postCollections.length"
          :items-to-show="$$isMobile ? 1 : 2"
          :item-space="20"
          item-component="LazyCommonCardHorizonal2"
          :dataList="postCollections"
          :isEditable="isEditable"
          type="post"
          @remove-item="removeItem"
          :itemProps="{
            itemStyles:{
              height: '240px'
            }
          }"
        />
      </div>
  </CommonSectionWrapperType1>
</template>

<script>
import useProfileStore from '~/stores/profile.store'
export default {
  data() {
    return {
      data: [],
      selected: 'easy',
      tabActive: 'recipes',
      entityResults: this.recipeCollections ? this.recipeCollections : [],
      imageStyle: {
        height: "15rem",
      },
      loading: false,
    }
  },

  setup() {
    const profileStore = useProfileStore()
    const { $$user } = useNuxtApp()

    const isEditable = computed(() => {
      return unref($$user) && profileStore.profileInfo?.username && profileStore.profileInfo?.username === unref($$user).username
    })

    const removeItem = (id) => {
      profileStore.removeItem('collection', id)
    }

    const postCollections = computed(() => profileStore.postCollections)
    const recipeCollections = computed(() => profileStore.recipeCollections)

    return {
      isEditable,
      postCollections,
      recipeCollections,
      removeItem
    }
  },

  methods: {
    handleChangeTab(entity) {
      window.scrollTo(0, 0);
      this.tabActive = entity
      this.entityResults = this[entity]
    },
  },
}

</script>

<style lang="scss" scoped>
  .select-input {
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

  .color {
    color: #757575 !important;
  }
  .tag-search {
  display: flex;
  list-style: none;
  align-content: center;
  justify-content: center;
  li {
    font-weight: 600;
    font-size: 1.3rem;
    @media (min-width: 768px) {
      font-size: 1.8rem;
      line-height: 2.5rem;
    }
    margin-right: 10px;
    color: #b0b0b0;
    &.active {
      color: #4f4f4f;
    }
  }
}
</style>