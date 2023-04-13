<template>
   <div class="mt-5">
      <div class="container">
         <h2 class="create-title">Tao bai viet</h2>
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
   text-transform: uppercase;
   font-size: var(--fs-xxl);
   font-weight: var(--font-weight-7);
   color: var(--clr-green-primary);
}
</style>