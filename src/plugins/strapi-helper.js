export default defineNuxtPlugin((nuxt) => {
  const user = useStrapiUser()

  // nuxt.hook('strapi:error', (e) => {
  //   let description
  //   if (Array.isArray(e.message)) {
  //     description = e.message[0].messages[0].message
  //   } else if (typeof e.message === 'object' && e.message !== null) {
  //     description = e.message.message
  //   } else {
  //     description = e.message
  //   }
  //   nuxt.$toast.error({ title: e.error, description })
  // })

  return {
    provide: {
      $isSigned: !!user?.value
    }
  }
})

