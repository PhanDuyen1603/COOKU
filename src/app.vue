<template>
  <NuxtLayout>
    <NuxtLoadingIndicator />
    <NuxtPage />
  </NuxtLayout>
  <GlobalModalContainer />
  <GlobalToastContainer />
</template>

<script setup>
import useAppStateStore from '~/stores/appState.store'

const appState = useAppStateStore()

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
    { rel: 'icon', type: 'image/x-icon', href: 'logo.png' },
  ]
})
</script>