<template>
  <div class="profile__wrapepr">
    <div class="profile__top">
      <div class="profile__avatar">
        <CommonAvatar :circle="false" :data="data.avatar" />
      </div>
      <div class="profile__name">
          <h3>{{ data.fullname || data.username }}</h3>
          <p>Cập nhật thông tin</p>
      </div>
    </div>
    <div class="profile__bottom">
      <ul>
        <li>Bài đã đăng</li>
        <li>Bộ sưu tập</li>
        <li>Quà của tôi</li>
      </ul>
      <ul>
        <li v-for="interaction in interactions" :key="interaction.id">
          <div>
            <img :src="interaction.logo" :alt="interaction.title">
            <span>{{ interaction.title }}</span>
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
    title: 'Người theo dõi',
    slug: '',
    count: 20,
    logo: ''
  },
  {
    id: 2,
    title: 'Đang theo dõi',
    slug: '',
    count: 5,
    logo: ''
  },
  {
    id: 3,
    title: 'Bài đăng',
    slug: '',
    count: 10,
    logo: ''
  },
  {
    id: 4,
    title: 'Đã thích',
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