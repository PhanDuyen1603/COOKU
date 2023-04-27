<template>
  <div class="page-search">
    <CommonSectionWrapperType1>
      <section class="container-width-1360px">
        <div class="flex-view">
          <h1 class="title h1 text-uppercase text-center my-3">
            Kết quả tìm kiếm cho "{{ searchString }}"
          </h1>
        </div>
        <div class="search-wrap">
          <div class="search-bar-custom my-3">
            <div class="search-bar-custom__search">
              <div class="">
                <input
                  v-model="searchString"
                  type="text"
                  class="w-full"
                  placeholder="Tìm kiếm"
                  @change="search"
                />
                <a class="btn-search justify-content-center d-flex position-absolute rounded--10">
                  <img src="/icons/search.svg" alt="">
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div class="row mb-4">
        <ul class="tag-search text-center mt-3">
          <li
            class="cursor-pointer"
            :class="{ active: tabActive == 'recipe' }"
            @click="handleChangeTab('recipe')"
          >
            <span>Món ăn ( {{ total.recipe }} )</span>
          </li>
          <li
            class="cursor-pointer"
            :class="{ active: tabActive == 'diet' }"
            @click="handleChangeTab('diet')"
          >
            <span> Chế độ ăn ( {{ total.diet }} ) </span>
          </li>
          <li
            class="cursor-pointer"
            :class="{ active: tabActive == 'post' }"
            @click="handleChangeTab('post')"
          >
            <span> Bài viết ( {{ total.post }} ) </span>
          </li>
        </ul>
      </div>
      <div class="row">
        <!-- <MoleculesLoadingSearch v-if="loading && hasResult"></MoleculesLoadingSearch> -->

        <CommonListView
          :items-to-show="!$$isMobile ? 4 : 2"
          item-component="CommonCardVertical"
          :type="tabActive"
          :dataList="searchResult"
          :item-space="20"
          :page-type="tabActive"
          :load-more="false"
        />

        <div class="search-pagination my-3 mt-5">
          <CommonPaginationHorizonal
            v-if="+total[tabActive] > 12"
            :modelValue="currentPage"
            :per-page="12"
            :total="total[tabActive]"
            @pageChange="handlePage"
          />
        </div>
      </div>

    </CommonSectionWrapperType1>
  </div>
</template>

<script setup>
const route = useRoute()
const router = useRouter()
const { find } = useStrapi()
const { $showLoading } = useNuxtApp()

const tabActive = ref(route.query.tab || 'recipe')
const searchString = ref(route.query._q || '')
const currentPage = computed(() => route.query.page || 1)
const start = computed(() => (currentPage.value * 12) - 1)

const total = reactive({
  recipe: 0,
  post: 0,
  diet: 0
})

const getSearchData = async () => {
  try {
    const res = await find(tabActive.value + 's', {
      _q: searchString.value,
      _limit: 12,
      _start: start.value
    })
    await getExtraData()
    return res
  } catch (error) {
    console.log(error)
  }
}

const getExtraData = async () => {
  try {
    const [ recipeCounts, dietsCounts, postCounts ] = await Promise.all([
      find('recipes/count', { _q: searchString.value }),
      find('diets/count', { _q: searchString.value }),
      find('posts/count', { _q: searchString.value }),
    ])
    total.recipe = recipeCounts
    total.diet = dietsCounts
    total.post = postCounts
  } catch (error) {
    console.log(error)
    total.recipe = 0
    total.diet = 0
    total.post = 0
  }
}

const { data: searchResult, pending } = await useAsyncData('entityResults', () => getSearchData(), {
  watch: [searchString, tabActive, currentPage]
})

watch(pending, (newValue, oldValue) => {
  if(newValue) $showLoading(true)
  else $showLoading(false)
});

// methods
const handleChangeTab = (tab) => {
  tabActive.value = tab
  router.replace({ query: { tab, _q: searchString.value, page: 1 }})
}

const handlePage = (page) => {
  router.replace({ query: { tab: tabActive.value, _q: searchString.value, page }})
}

const search = () => {
  router.replace({ query: { tab: tabActive.value, _q: searchString.value, page: 1 }})
}

</script>

<style lang="scss" scoped>
.tag-search {
  display: flex;
  gap: 10px;
  justify-content: center;
  li {
    font-weight: 600;
    font-size: var(--fs-xl);
    color: #b0b0b0;

    &.active {
      color: #000;
    }
  }
}

.search-wrap {
  display: flex;
  justify-content: center;
}
</style>
