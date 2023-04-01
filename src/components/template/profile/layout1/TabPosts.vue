<template>
  <CommonSectionWrapperType1>
    <ul class="tag-search my-4">
      <li v-if="recipes" class="mr-3 cursor-pointer" :class="{ active: tabActive == 'recipes' }"
        @click="handleChangeTab('recipes')">
        <span>Món ăn ({{recipes.length}})</span>
      </li>
      <li v-if="posts" class="cursor-pointer" :class="{ active: tabActive == 'posts' }"
        @click="handleChangeTab('posts')">
        <span> Bài viết ({{ posts.length }})</span>
      </li>
    </ul>
    <div>
        <CommonListView
          v-if="tabActive == 'recipes' && recipes.length"
          :items-to-show="$$isMobile ? 2 : 4"
          :item-space="20"
          item-component="CommonCardFullImage"
          :dataList="recipes"
          page-type="recipe"
          :isEditable="isEditable"
          :itemProps="{
            itemStyles:{
              height: '240px'
            }
          }"
        />

        <CommonListView
          v-if="tabActive == 'posts' && posts.length"
          :items-to-show="$$isMobile ? 2 : 4"
          :item-space="20"
          item-component="CommonCardVertical"
          :dataList="posts"
          :isEditable="isEditable"
          page-type="post"
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
    props: {
      recipes: {
        type: Array,
        required: true
      },
      posts: {
        type: Array,
        required: true
      },
    },

    data() {
      return {
        data: [],
        selected: 'easy',
        tabActive: 'recipes',
        entityResults: this.recipes ? this.recipes : [],
        imageStyle: {
          height: "15rem",
        },
        loading: false,
      }
    },

    setup(props) {
      const profileStore = useProfileStore()
      const { $$user } = useNuxtApp()

      const isEditable = computed(() => {
        return unref($$user) && profileStore.profileInfo?.username && profileStore.profileInfo?.username === unref($$user).username
      })

      return {
        isEditable
      }
    },

    methods: {
      handleChangeTab(entity) {
        window.scrollTo(0, 0);
        this.tabActive = entity
        this.entityResults = this[entity]
      },
      // refetchList(event, type) {
      //   this.$store.dispatch('modules/profile/removeProfilePostsData', { item: event, type })
      // }
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
<!-- <style lang="scss">

</style> -->