export default defineNuxtRouteMiddleware((to, from) => {
  const { $$user, $$isSigned } = useNuxtApp()
  const user = unref($$user)
  const isSigned = unref($$isSigned)
  if(!isSigned) {
    return navigateTo('/')
  }
})
