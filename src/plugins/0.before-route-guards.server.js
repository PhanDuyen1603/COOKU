export default defineNuxtPlugin(({ $config }) => {
  const $route = useRoute()

  const url = $route.fullPath

  if (url.startsWith('/css')) {
    throw createError({ statusCode: 404 })
  }

  if (url.indexOf('/__resource') !== -1 || /([a-f0-9]{8})-([a-f0-9]{4})-([a-f0-9]{4})-([a-f0-9]{4})-([a-f0-9]{12})/g.test(url)) {
    const imageUrl = $config.apiUrl + url.replace('/__resource', '')

    return navigateTo(imageUrl, { external: true })
  }
})
