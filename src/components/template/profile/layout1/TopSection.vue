<template>
  <section>
    <div
      class="card card-custom gutter-b border-radius-40 mt-4"
    >
      <div class="card-body p-0 w-100">
        <div class="row mb-4">
          <div class="col-12 col-xl-4">
            <div class="row text-white info-title align-items-center">
              <div class="d-flex flex-column flex-xl-row align-items-center justify-content-center justify-content-xl-start mb-4">
                <CommonAvatar size="large" :data="data" />
                <div class="ps-4-xl mx-2">
                  <h5 class="fw-bold info-name">
                    {{ data.fullname ? data.fullname : data.username }}
                  </h5>
                  <p> {{ data.info }} </p>
                </div>
              </div>
            </div>
          </div>
          <div class="col-12 col-xl-8">
            <div class="d-flex fw-bold text-center justify-content-around">
              <div class="text-white text-custom cursor-pointer" @click="openListFollows('follower')">
                    {{ data.followersCount || 0 }}
                <div class="text-custom-small">{{ $t('profile.follower') }}</div>
              </div>
              <div class="text-white text-custom cursor-pointer" @click="openListFollows('following')">
                    {{ data.followingsCount || 0 }}
                <div class="text-custom-small">{{ $t('profile.following') }}</div>
              </div>
              <div class="text-white text-custom">
                    {{ data.totalPosts || 0 }}
                <div class="text-custom-small">{{ $t('profile.posts') }}</div>
              </div>
              <div class="text-white text-custom">
                    {{ data.totalLikes || 0 }}
                <div class="text-custom-small">{{ $t('profile.liked') }}</div>
              </div>
              <div class="">
                {{ isLogginUser }}
                <button
                  v-if="isLogginUser"
                  class="btn border-radius-15 bg-white btn-custom btn-text text-custom fw-bold"
                  @click="openEditModal"
                >
                  <img class="me-1" width="15" height="15" src="/icons/edit-pen.png"/>
                  Cập nhật
                </button>
                <button v-else class="btn border-radius-15 bg-white btn-custom btn-text text-custom fw-bold d-flex align-items-center"
                @click="toggleFollowing"
                >
                  <!-- <IconsPlus v-if="!isFollowing"></IconsPlus> -->
                  {{ isFollowing ? $t('profile.status.following') : $t('profile.status.un_following') }}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="tabs-custom">
          <ul class="nav nav-tabs justify-content-center">
            <li v-for="(tab, index) in listTabs" :key="index" class="nav-item tabs-title">
              <a
                class="nav-link text-custom tabs-link bg-transparent fw-normal text-uppercase p-0"
                :class="{ active: activeItem === tab.slug }"
                :href="`#${tab.slug}`"
                @click.prevent="setActive(tab.slug)"
              >
                {{ $t(tab.title) }}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <TemplateProfileLayout1TabPosts
      v-show="activeItem === 'posted'"
      :recipes="recipes"
      :posts="posts"
    />
    <TemplateProfileLayout1TabCollection
      v-show="activeItem === 'collection'"
    />
  </section>
</template>

<script>
import useProfileStore from '~/stores/profile.store'
const listTabs = [
  {
    id: 1,
    title: 'profile.tab.posts',
    slug: 'posted',
    isLogged: false
  },
  {
    id: 2,
    title: 'profile.tab.collections',
    slug: 'collection',
    isLogged: false
  },
  // {
  //   id: 1,
  //   title: 'profile.tab.gifts',
  //   slug: 'award',
  //   isLogged: true
  // },
]
export default {
  props: {
    data: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    this.listTabs = listTabs
    return {
      activeItem: listTabs[0].slug,
    }
  },
  computed: {
    isLogginUser() {
      return (
        this.data.username === this.$route.params.slug
      )
    },
  },
  setup(props) {
    const $store = useProfileStore()
    const { $modal } = useNuxtApp()

    const openListFollows = async (type) => {
      await $store.fetchUserFollowers()
      if(type === 'following') $store.transformList(type)
      // await $modal.show({
      //   component: 'TemplateProfileLayout1PopFollowing',
      //   props: {
      //     data: {
      //       followings: props.data.followings,
      //       followers: props.data.followers,
      //     },
      //     type
      //   },
      //   wrapperProps: {
      //     style: {
      //       width: '900px'
      //     },
      //   },
      // })
      await $modal.develop({})
    }

    return {
      recipes: $store.posts.recipes,
      posts: $store.posts.posts,

      collectionRecipes: $store.collections.recipes,
      collectionPosts: $store.collections.posts,
      openListFollows
    }
  },
  methods: {
    async setActive(menuItem) {
      this.activeItem = menuItem
      // if(menuItem === 'collection') {
      //   await this.$store.dispatch('modules/profile/fetchCollection', { type: 'recipe', user: this.user })
      // }
    },

    async openEditModal() {
      await this.$modal.show({
        component: 'TemplateProfileLayout1PopProfileEdit',
        props: {
          data: this.data
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.nav-tabs {
  --bs-nav-tabs-border-width: 0;
  gap: 30px;
  .nav-link {
    color: #b0b0b0;
    font-size: var(--fs-lg);
  }
  .nav-link.active {
    border-bottom: 2px solid #fff!important;
    color: #fff;
    padding: 0!important;
    font-weight: 600!important;
  }
}
.card-custom {
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.85), rgba(0, 0, 0, 0.85));
  box-shadow: 4px 4px 11px 1px rgba(0, 0, 0, 0.12);
  align-items: flex-start;
  padding: 1.8rem 2.2rem 1.2rem;
  @media screen and (min-width: 1200px) {
    padding: 30px 50px 20px;
  }

  .info-name {
    font-size: 1.8rem;
    line-height: 2.5rem;
  }

  .text-custom {
    font-size: 1rem;
    line-height: 1rem;
    @media screen and (min-width: 768px) {
      font-size: 1.5rem;
      line-height: 2rem;
    }
  }

  .text-custom-small {
    font-size: .7rem;
    line-height: 1.3rem;
    @media screen and (min-width: 768px) {
      font-size: 1.25rem;
      line-height: 1.68rem;
    }
  }

  .btn-custom {
    padding: 5px 15px;
    @media screen and (min-width: 1200px) {
      padding: 5px 30px;
    }

    .btn-text {
      margin-left: 10px;
      color: #4f4f4f;
    }
  }
}

.info-title {
  text-align: center;
  @media screen and (min-width: 768px) {
    text-align: left;
  }
}

.border-radius-40{
  border-radius: 40px;
}

</style>
