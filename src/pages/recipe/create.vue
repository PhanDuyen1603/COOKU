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
<style scoped>
.wrap-main {
    margin-top: 56px;
    color: #4f4f4f;
}
.wrap-main .title-main {
    font-weight: 700;
    font-size: 30px;
    line-height: 2.5rem;
    display: flex;
    align-items: center;
    text-transform: uppercase;
}

.wrap-main .title-sub {
    font-weight: 300;
    font-size: 20px;
    line-height: 27px;
    margin-top: 10px;
}
</style>

