<template>
  <div class="hero ">
    <div class="hero_screen_wrapper">
      <div class="hero_overlay"></div>
      <div class="hero_bg" :style="BgStyle"></div>
      <div class="hero_content" :style="contentStyles">
        <h2 class="hero_title">
          <!-- You don't know what to cook ? -->
          Hôm nay bạn nấu gì?
        </h2>
        <div class="hero_searchbox">
          <div class="searchbox_top">
           <ul class="custom_tabs_1">
            <li class="custom_item">
              <span>
                <img src="/icons/cooking-book.png" width="20px" height="20px"/>
              </span>
              <span>Công thức</span>
            </li>
           </ul>
          </div>
          <div class="hero_provider"></div>
          <div class="searchbox_bottom">
            <div class="hero_search_area">
              <!-- <input type="text"> -->
              <div class="hero_search_input">
                <input v-model="search" type="text" placeholder="Tên món, nguyên liệu,...">
              </div>
              <button @click="handleSearch"><img class="img-response" src="/images/search.png"> Tìm kiếm</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    gallery: {
      type: [Object, Array],
      default: () => ({
        url: '/images/banner/cooking_man.jpeg'
      })
    }
  },
  computed: {
    BgStyle() {
      return {
        backGroundImage: this.gallery
      }
    }
  },
  setup() {
    const router = useRouter()

    const contentLeft = ref(0)
    const search = ref('')

    const contentStyles = computed(() => {
      return {
        left: contentLeft.value
      }
    })

    const handleSearch = () => {
      if(search.value.length > 0) {
        router.push('/search?tab=recipe&_q=' + search.value)
      }
    }

    onMounted(() => {
      if(process.client) {
        const screenW = window.screen.width
        if (screenW > 1320) {
          contentLeft.value = (screenW - 1320) / 2 + 'px'
        }
      }
    })

    return {
      contentLeft,
      contentStyles,
      search,
      handleSearch
    }
  }
}
</script>

<style lang="scss" scoped>
.hero {
  --header-height: 60px;
  width: 100vw;
  height: calc(100vh - var(--header-height));
  position: relative;
  margin-top: -61px;
}
.hero_screen_wrapper, .hero_overlay, .hero_bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: calc(100vh - var(--header-height));
}
.hero_overlay {
  background-color: #000;
  opacity: .2;
  z-index: 2;
}
.hero_bg {
  z-index: 1;
  background-image: url('/images/banner/cooking_man.jpeg');
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
}

.hero_content {
  z-index: 3;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  color: #fff;
}
.hero_title {
  font-size: var(--fs-subtitle);
  font-weight: bold;
}
.hero_searchbox {
  margin-top: 40px;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
}
.searchbox_top {
  // padding-bottom: 1.5rem;
  // border-bottom: 1px solid var(--clr-gray);
}
.custom_item {
  display: flex;
  align-items: center;
  gap: 8px;
  border-radius: 8px;
  border: none;
  background-color: rgba(241, 114, 40, 0.2);
  color: var(--clr-red-primary);
  padding: 12px;
  width: fit-content;
  span {
    font-weight: 700;
    height: 20px;
  }
}
.hero_provider {
  height: 1px;
  width: 100%;
  border-bottom: 1px solid var(--clr-gray);
  margin: 1.5rem 0;
}
.hero_search_area {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .hero_search_input {
    padding: 8px;
    border-radius: 8px;
    background-color: var(--clr-gray);
    width: 58%;

    input {
      border: none;
      outline: none;
      background-color: inherit;
    }
  }
  button {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 8px;
    border-radius: 8px;
    color: #fff;
    border: none;
    width: 38%;
    background-color: var(--clr-orange-primary);
    img {
      width: 18px;
      height: 18px;
    }
  }
}
</style>