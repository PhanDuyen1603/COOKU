<template>
  <div class="wrap__body">
    <!-- <WelcomeScreen></WelcomeScreen> -->
    <GlobalHeaderMain v-if="!$$isMobile" />
    <GlobalHeaderMobileMain v-else />
    <main class="main">
      <slot />
    </main>
    <GlobalFooterMain />
  </div>
</template>

<script setup>
const { $$isMobile } = useNuxtApp()
</script>