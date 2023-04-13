<template>
  <div class="container">
    <TemplateProfileLayout1TopSection
      :data="profile"
    />
  </div>
</template>

<script setup>
import useProfileStore from '~/stores/profile.store'
const {$showLoading} = useNuxtApp()

const route = useRoute()
const profileName = route.params?.slug
const $store = useProfileStore()
$showLoading(true)
await $store.getProfile({ name: profileName })
await $store.getProfileInfo({ name: profileName })
await $store.getCollections()
await $store.getListFollow({})
await $store.getListFollow({ type: 'followers' })
$showLoading(false)
const profile = $store.profileInfo
</script>