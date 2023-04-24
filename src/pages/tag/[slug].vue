<template>
  <div>tag</div>
</template>

<script>
export default {
  async mounted() {
   const res = await this.$modal.develop({})
   this.$router.push('/')
  },
}
</script>