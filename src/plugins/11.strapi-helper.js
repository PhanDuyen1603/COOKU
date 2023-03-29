export default defineNuxtPlugin((nuxt) => {
  const { find, update, delete: _delete, create } = useStrapi()
  const user = useStrapiUser()
  const { logout } = useStrapiAuth()
  const { $config } = useNuxtApp()
  const publicConfig = $config.public
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
  function getStrapiMedia(url) {
    if (url.startsWith('/')) {
      return `${ publicConfig.strapi.url }${url}`
    }
    return url
  }
  function getMediaLink(objectImage, size = 'small') {
    if (objectImage) {
      if (objectImage.formats?.[size]) {
        return (
          `${ publicConfig.strapi.url }/uploads/${size}_` +
          objectImage.hash +
          objectImage.ext
        )
      } else {
        return getStrapiMedia(objectImage.url)
      }
    } else {
      return '/images/image_loading.svg'
    }
  }

  return {
    provide: {
      $isSigned: !!user?.value,
      $user: user || {},
      $strapi: {
        getMediaLink,
        getStrapiMedia,
        logout,
        //
        find,
        update,
        _delete,
        create
      }
    }
  }
})



