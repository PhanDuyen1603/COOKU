<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <p>
    this is app.vue
  </p>
</template>

<script setup>
useHead({
  title: 'Cooku',
  htmlAttrs: {
    lang: 'vi'
  },
  meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { hid: 'description', name: 'description', content: '' },
    { name: 'format-detection', content: 'telephone=no' }
  ],
  link: [
    { rel: 'icon', type: 'image/x-icon', href: 'favicon.png' },
    { rel: 'stylesheet', href: 'bt/bootstrap.min.css'}
  ]
})
</script>