export default defineNuxtPlugin(() => {
  const { $device } = useNuxtApp()

  const isMobile = $device.isMobile || (process.client && window.innerWidth < 768)

  return {
    provide: {
      $isMobile: isMobile,
      $isTablet: $device.istablet,
      $isDesktop: $device.isDesktop
    }
  }
})