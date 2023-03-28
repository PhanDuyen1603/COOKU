<template>
  <div>
    <CommonListColorCircle />
    <div class="bg-gray d-flex justify-content-center p-4 my-4">
      <div
        class="tab-tile px-3 cursor-pointer uppercase"
        :class="{ active : activeType === 'following' }"
        @click="setActiveType('following')"
      >
        Đang theo dõi
      </div>
      <div
        class="tab-tile px-3 cursor-pointer uppercase"
        :class="{ active : activeType === 'follower' }"
        @click="setActiveType('follower')"
      >
        Người theo dõi
      </div>
    </div>
    <div class="container-600 mx-auto p-3 search-bar-custom">
      <div class="search-bar-custom__search">
        <div class="" @keyup.enter="search">
          <input
            v-model="keywordsearch"
            type="text"
            class="w-full"
            placeholder="Tìm kiếm"
          />
          <a class="btn-search justify-content-center d-flex position-absolute rounded--10" @click="search">
            <img src="/icons/search.svg" alt="">
          </a>
        </div>
      </div>
      <LazyCommonAnimationsFade>
        <!-- ĐANG THEO DÕI -->
        <div
          v-if="activeType === 'following'"
          class="single-col-list__content scrollbar-none mt-3"
        >
          <div
            v-for="following in data.followings"
            :key="following.username"
            class="single-col-list__item row align-items-center p-1"
          >
            <div class="col-7">
              <div class="d-flex align-items-center cursor-pointer" @click="changeProfile(following.username)">
                <CommonAvatar :data="following" />
                <div class="single-col-list__item--title">{{ following.fullname ? following.fullname : following.username }}</div>
              </div>
            </div>
            <div v-if="$$user && following.username === $$user.username" class="col-5"></div>
            <div v-else class="col-5">
              <div class="d-flex align-items-center justify-content-end">
                <button class="btn btn-outline-follow-action" :class="{ 'active' : following.isFollowed }" @click="toggleFollow(following, 'following')">
                  {{ following.isFollowed ? 'Đang theo dõi ' : 'Theo dõi' }}
                </button>
                <div class="ms-3 icon-ring cursor-pointer" @click="handleAcceptNoti(following, 'following')">
                  <img v-if="following.accept_notification" src="/icons/ring.svg" alt="">
                  <img v-else src="/icons/disable-ring.svg" alt="">
                </div>
              </div>
            </div>
          </div>
        </div>
        <!--  -->

        <!-- NGƯỜI THEO DÕI -->
        <div v-else class="single-col-list__content scrollbar-none mt-3">
          <div
            v-for="follower in data.followers"
            :key="follower.username"
            class="single-col-list__item  row align-items-center p-1"
          >
            <div class="col-7">
              <div
                class="d-flex align-items-center cursor-pointer"
                @click="changeProfile(follower.username)"
              >
                <CommonAvatar :data="follower" />
                <div class="single-col-list__item--title">
                  {{ follower.fullname ? follower.fullname : follower.username }}
                </div>
              </div>
            </div>
            <div v-if="$$user && follower.username === $$user.username" class="col-5"></div>
            <div v-else-if="isLoggedUser" class="col-5">
              <div class="d-flex align-items-center justify-content-end">
                <button class="btn btn-outline-follow-action active" @click="removeFollow(follower)">
                  Gỡ
                </button>
              </div>
            </div>
            <div v-else class="col-5">
              <div class="d-flex align-items-center justify-content-end">
                <button
                  class="btn btn-outline-follow-action"
                  :class="{ 'active' : follower.isFollowed }"
                  @click="toggleFollow(follower, 'follower')"
                >
                  {{ follower.isFollowed ? 'Đang theo dõi ' : 'Theo dõi' }}
                </button>
                <div class="ms-3 icon-ring cursor-pointer" @click="handleAcceptNoti(follower, 'follower')">
                  <img v-if="follower.accept_notification" src="/icons/ring.svg" alt="">
                  <img v-else src="/icons/disable-ring.svg" alt="">
                </div>
              </div>
            </div>
          </div>
        </div>
      </LazyCommonAnimationsFade>
    </div>
  </div>
</template>

<script>
import useProfileStore from '~/stores/profile.store'
export default {
  props: {
    data: {
      type: Object,
      default:() => ({
        followings: [],
        followers: [],
      })
    },
    type: {
      type: String,
      default: 'following'
    }
  },
  data() {
    return {
      activeType: this.type,
      keywordsearch: '',
      followings: [],
      followers: [],
    }
  },
  setup(props) {
    const $store = useProfileStore()

    return {
      $store
    }
  },
  methods: {
    async changeProfile(username) {
      this.$emit('close')
      this.$router.push({ name: 'profile-slug', params: { slug: username } })
    },
    async toggleFollow(following, actionType) {
      await this.$store.toggleFollowStatus({
        username: following.username,
        isFollowed: following.isFollowed,
        id: following.followId,
        actionType,
        // isCurrentUser: this.isLoggedUser,
      })

      // await this.$store.dispatch('modules/follow/toggleFollowInModal', {
      //   username: following.username,
      //   isFollowed: following.isFollowed,
      //   followId: following.followId,
      //   actionType,
      //   isCurrentUser: this.isLoggedUser,
      // })
    },
    setActiveType(type) {
      this.activeType = type
    }
  }
}
</script>

<style lang="scss" scoped>
.tab-tile.active {
  font-weight: 700;
  color: #333;
  border-bottom: 2px solid #000;
}
</style>