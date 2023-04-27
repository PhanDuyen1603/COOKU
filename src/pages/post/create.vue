<template>
   <div class="mt-5">
      <div class="container">
         <h2 class="create-title">Tạo bài viết</h2>
         <CommonSectionWrapperType1>
            <TemplatePostSectionCreate actionType="create" />
         </CommonSectionWrapperType1>

      </div>
   </div>
</template>

<script setup>
definePageMeta({
  middleware: ["auth"]
})
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