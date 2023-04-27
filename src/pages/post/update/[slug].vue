<template>
  <div class="mt-5">
     <div class="container">
        <h2 class="create-title">Cập Nhật bài viết</h2>
        <CommonSectionWrapperType1>
           <TemplatePostSectionCreate actionType="update" :modelValue="post" />
        </CommonSectionWrapperType1>
     </div>
  </div>
</template>

<script setup>
definePageMeta({
 middleware: ["auth"]
})

const { $showLoading } = useNuxtApp()
const { find }  = useStrapi()
const route = useRoute()
$showLoading(true)
const [post] = await find('posts', { slug: route.params.slug }) || [{}]
$showLoading(false)
</script>

<style scoped>
.create-title {
  margin: 1rem 0;
  text-align: center;
  text-transform: uppercase;
  font-size: var(--fs-subtitle);
  font-weight: var(--font-weight-7);
  color: var(--clr-orange-primary);
}
</style>