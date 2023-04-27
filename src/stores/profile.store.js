import { defineStore } from 'pinia'
import merge from 'lodash/merge'
import sortBy from 'lodash/sortBy'
import cloneDeep from 'lodash/cloneDeep'

export default defineStore({
  id: 'profile-store',
  state: () => ({
    profile: {},
    totalPosts: 0,
    totalLikes: 0,
    posts: {
      recipes: [],
      tips: [],
      posts: []
    },
    collections: {
      recipes: [],
      tips: [],
      posts: []
    },
    followings: [],
    followers: [],
    listUserFollowing: [],
    isLoggedUser: false
  }),

  getters: {
    profileInfo:(state) => ({
      ...state.profile,
      totalLikes: state.totalLikes,
      totalPosts: state.totalPosts,
      followings: state.followings,
      followers: state.followers,
      followingsCount: state.followings.length,
      followersCount: state.followers.length
    }),
    recipeCollections:(state) => state.collections.recipes,
    postCollections:(state) => state.collections.posts,
  },

  actions: {
    async getProfile({ name }) {
      const { find } = useStrapi()
      const { $$user } = useNuxtApp()

      const data = await find("users", {
        username: name
      });
      const profile = data && data.length ? data[0] : {}
      this.profile = {...profile}
      this.isLoggedUser = $$user?.username === profile.username
    },

    async getProfileInfo({ name }) {
      const { find, count } = useStrapi()

      const filter = {
        'author.username': name
      }
      if(!name) return Promise.reject()
      try {
        const [ recipes, tips, posts, likes ] = await Promise.all([
          find('recipes', filter),
          find('tips', filter),
          find('posts', filter),
          count('likes', filter)
        ])
        this.posts.posts = [...posts]
        this.posts.recipes = [...recipes]
        this.posts.tips = [...tips]
        this.totalPosts = tips.length + recipes.length + posts.length
        this.totalLikes = likes
      } catch (error) {
        console.log(error)
        return Promise.reject
      }
    },

    async getCollections() {
      try {
        const { find } = useStrapi()
        const filters = {
          'author.username': this.profile?.username || '',
          'is_public': !this.isLoggedUser
        }
        const collections = await find('collections', filters)
        this.collections.recipes = collections.filter(x => x.type === 'recipe') || []
        this.collections.posts = collections.filter(x => x.type === 'post') || []
      } catch (error) {
        console.log(error)
      }
    },

    // following
    async fetchUserFollowers() {
      const { $$user } = useNuxtApp()
      const { find } = useStrapi()
      try {
        const response = await find('followings', {user_id : unref($$user).id })
        this.listUserFollowing = response
      } catch (error) {
        console.log(error);
      }
    },

    async getListFollow({ id , type = 'followings' }) {
      try {
        const { find } = useStrapi()
        const self = this
        const curId = this.profile?.id || id || 0

        let filters = { }
        if (type === 'followings') {
          filters.user_id = curId
        } else {
          filters.follower_id = curId
        }

        const response = await find('followings', filters )

        const listFollows = response.map(item => {
          const target = type === 'followings' ? item.follower_id : item.user_id
          return merge(target, {
            isFollowed: false,
            accept_notification: self.isLoggedUser ? item.accept_notification : false,
            followId: self.isLoggedUser ? item.id : null
          })
        })

        if (type === 'followings') {
          this.followings = listFollows
        } else {
          this.followers = listFollows
        }
      } catch (error) {
        console.log('follow', error)
      }
    },

    async toggleFollowStatus({ username, isFollowed, id, actionType = 'following' }) {
      const { $$user , $toast} = useNuxtApp()
      const { delete: _delete, create, find } = useStrapi()
      if(!$$user) return false
      try {
        if(isFollowed) {
          $toast.show({ message: 'Đang huỷ theo dõi...' })
          await _delete('followings', id)
          $toast.show({
            message: 'Bạn đã hủy theo dõi người dùng này',
            type: 'success'
          })

          const list = actionType === 'following' ? this.followings : this.followers
          const target = list.findIndex(x => x.username === username)
          list[target].isFollowed = false
          list[target].accept_notification = false
        } else {
          $toast.show({ message: 'Đang theo dõi...' })
          const followerDetail = await find('users', { username })
          const res = await create('followings', { user_id: id , follower_id: followerDetail[0].id })
          $toast.show({
            message: 'Bạn đã theo dõi người dùng này',
            type: 'success'
          })

          const list = actionType === 'following' ? this.followings : this.followers
          const target = list.findIndex(x => x.username === username)
          list[target].isFollowed = true
          list[target].accept_notification = res.id
        }

      } catch (error) {
        console.log('toggle follow', error)
      }
    },

    transformList(type = 'following') {
      const { $$user } = useNuxtApp()
      if(type === 'following') {
        this.followings = transformFollowing({
          followings: this.followings,
          userFollowers: this.listUserFollowing,
          user: unref($$user)
        })
      } else {
        this.followers = transformFollowers(this.followers, this.listUserFollowing)
      }
    },

    // remove
    removeItem(type, id) {
      if(type === 'collection') {
        this.collections.posts = [...this.collections.posts].filter(x => x.id != id)
        this.collections.recipes = [...this.collections.recipes].filter(x => x.id != id)
      }
    }
  }
})

const transformFollowing = ({followings, userFollowers, user}) => {
  let list = []
  for (const key in userFollowers) {
    if(x.follower_id?.username === user.username) list.push(key)
  }
  // console.log(list)
  const listUserFollowing = userFollowers.filter(x => x.follower_id?.username === user.username)
  // for (const index in followings) {
  //   for (const i in userFollowers) {
  //     if (followings[index]?.username === userFollowers[i]?.follower_id?.username) {
  //       const obj = {
  //         ...followings[index],
  //         isFollowed: true,
  //         accept_notification: userFollowers[i].accept_notification,
  //         followId: userFollowers[i].id
  //       }
  //       res.push(obj)
  //     }
  //   }
  // }
  return sortBy(cloneDeep(res), [function(o) { return !o.isFollowed }])
  // commit('SET_FOLLOW_ENTITY', { type: 'followings', value: softingListFlowings, entity: 'data' })
}

const transformFollowers = (followers, userFollowers) => {
  let res = []
  for (const index in followers) {
    for (const i in userFollowers) {
      if (followers[index]?.username === userFollowers[i]?.follower_id?.username) {
        const obj = {
          ...followers[index],
          isFollowed: true,
          accept_notification: userFollowers[i].accept_notification,
          followId: userFollowers[i].id
        }
        res.push(obj)
      }
    }
  }
  return res
}