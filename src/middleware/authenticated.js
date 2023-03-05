export default defineNuxtRouteMiddleware(() => {
  const user = useStrapiUser()
    if (!user) {
      navigateTo('/')
    }
})
