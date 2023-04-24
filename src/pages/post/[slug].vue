<template>
  <div class="section-6 container">
    <TemplateRecipeDetailMainInfo
      :model-value="post"
      :isShowProcess="false"
      type="post"
      :isShowContent="false"
    />
    <CommonSectionWrapperType1>
      <div v-html="markedContent"></div>
    </CommonSectionWrapperType1>

    <CommonComment
      v-if="post.id"
      entity="post"
      :is-login="$$isSigned"
      :entity-i-d="post.id"
    />
  </div>
</template>

<script setup>
import { marked } from 'marked'
const { $showLoading } = useNuxtApp()
const { find }  = useStrapi()
const route = useRoute()
$showLoading(true)
const [post] = await find('posts', { slug: route.params.slug }) || [{}]
// const relativePosts = await find('posts', { 'author.id': post.author?.id })
// const postsByCategory = await find('posts', { 'post_categories.id': post.post_categories?.[0]?.id })
$showLoading(false)
const markedContent = marked.parse(post.content)
</script>