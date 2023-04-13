<template>
  <div>
    <div v-if="comment.author" class="comment__author d-flex">
      <NuxtLink :to="{ name: 'profile-slug', params: { slug: comment.author.username } }">
        <div class="d-flex justify-center symbol symbol-50 me-2">
            <CommonAvatar :data="comment.author"></CommonAvatar>
        </div>
      </NuxtLink>

      <div>
        <NuxtLink :to="{ name: 'profile-slug', params: { slug: comment.author.username } }">
          <h6 class="name-user bold mb-0">
            {{ comment.author.fullname || comment.author.username }}
          </h6>
        </NuxtLink>
        <span class="comment__date text-decoration-underline">
          {{ formatDate(comment) }}
        </span>
      </div>
    </div>
    <div class="comment__content">
      <p>
        {{ comment.content }}
      </p>
      <div v-if="comment.images && comment.images.length" class="d-flex mt-2 mb-2">
        <div v-for="(image, keyImage) in comment.images" :key="keyImage">
          <img
            :src="$$strapi.getStrapiMedia(image.url)"
            class="me-2 image-cook"
            :alt="image.name"
          />
        </div>
      </div>
      <div class="d-flex justify-content-between mb-3">
        <slot name="commentAction"></slot>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs';
export default {
  props: {
    comment: {
      require: true,
    },
  },
  methods: {
    formatDate(value) {
      return dayjs(value.created_at, 'YYYY-MM-DD').format('DD-MM-YYYY hh:mm')
    }
  }
}
</script>
<style lang="scss">
.comment {
  padding-bottom: 30px;
  border-bottom: 1px solid var(--clr-gray);
}
.comment__content {
  p {
    font-size: var(--fs-lg);
  }
}
.comment__date {
  font-size: var(--fs-sm);
  color: var(--clr-gray-dark);
}
.name-user {
  font-weight: 600;
  font-size: var(--fs-lg);
  color: #000000;
  margin-bottom: 0;
}
input[readonly] {
  cursor: auto;
}
</style>