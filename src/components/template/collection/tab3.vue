<template>
  <div>
    <CommonListColorCircle />
    <div class="padding-tab content-body ">
      <div>
        <div
          class="text-center fw-light text-gray text-decoration-underline text-mid mt-20"
        >
          Đã thêm {{item ? item.title : null}} vào bộ sưu tập
          <span class="fw-bold text-gray">{{collection ? collection.name : null}}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  props: {
    collection: {
      type: Object,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    item: {
      type: Object,
      required: true,
    },
  },
}
</script>
