<template>
  <div :class="`text-${ position }`">
      <div class="center-cirlce">
        <div class="item"></div>
        <div class="item"></div>
        <div class="item"></div>
        <div class="item"></div>
      </div>
    </div>
</template>

<script>
export default {
  props: {
    position: {
      type: String,
      default: 'center'
    }
  },
}
</script>