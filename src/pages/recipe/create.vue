<template>
  <div class="container">
    <div class="wrap-main">
      <div class="title-main">TẠO CÔNG THỨC</div>
      <div class="title-sub">Tạo công thức nấu ăn của riêng bạn</div>
    </div>
    <CommonSectionWrapperType1>
      <TemplateRecipeSectionCreate actionType="create" />
    </CommonSectionWrapperType1>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: ["auth"]
})
</script>

