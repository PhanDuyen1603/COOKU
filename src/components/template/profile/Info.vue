<template>
  <div class="profile__wrapepr">
    <div class="profile__top">
      <div class="profile__avatar">
        <CommonAvatar :circle="false" :data="data.avatar" />
      </div>
      <div class="profile__name">
          <h3>{{ data.fullname || data.username }}</h3>
          <p>{{ $t('profile.action.update_info') }}</p>
      </div>
    </div>
    <div class="profile__bottom">
      <ul>
        <li>{{ $t('profile.tab.posts') }}</li>
        <li>{{ $t('profile.tab.collections') }}</li>
        <li>{{ $t('profile.tab.gifts') }}</li>
      </ul>
      <ul>
        <li v-for="interaction in interactions" :key="interaction.id">
          <div>
            <img :src="interaction.logo" :alt="interaction.title">
            <span>{{ $t(interaction.title) }}</span>
          </div>
          <span>{{ interaction.count }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
const interactions = [
  {
    id: 1,
    title: 'profile.follower',
    slug: '',
    count: 20,
    logo: ''
  },
  {
    id: 2,
    title: 'profile.following',
    slug: '',
    count: 5,
    logo: ''
  },
  {
    id: 3,
    title: 'profile.posts',
    slug: '',
    count: 10,
    logo: ''
  },
  {
    id: 4,
    title: 'profile.liked',
    slug: '',
    count: 0,
    logo: ''
  },
]
export default {
  props: {
    data: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    this.interactions = interactions
    return {

    }
  },
}
</script>