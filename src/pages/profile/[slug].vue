<template>
  <div class="container">
    <TemplateProfileLayout1TopSection
      :data="profile"
    />
  </div>
</template>

<script setup>
import useProfileStore from '~/stores/profile.store'
const route = useRoute()
const profileName = route.params?.slug
const $store = useProfileStore()

await $store.getProfile({ name: profileName })
await $store.getProfileInfo({ name: profileName })
await $store.getCollections()
await $store.getListFollow({})
await $store.getListFollow({ type: 'followers' })
const profile = $store.profileInfo
</script>