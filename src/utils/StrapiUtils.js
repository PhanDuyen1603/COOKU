function getStrapiMedia(url) {
  if (url.startsWith('/')) {
    return `${process.env.STRAPI_URL}${url}`
  }
  return url
}

export function getMediaLink(objectImage, size = 'small') {
  if (process.env) {
    if (objectImage) {
      if (objectImage.formats && objectImage.formats[size]) {
        return (
          `${process.env.STRAPI_URL}/uploads/${size}_` +
          objectImage.hash +
          objectImage.ext
        )
      } else {
        return getStrapiMedia(objectImage.url)
      }
    } else {
      return 'images/image_loading.svg'
    }
  }
  return 'images/image_loading.svg'
}
