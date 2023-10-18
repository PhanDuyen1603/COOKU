import vn from '../locales/vn'

export default defineNuxtPlugin(() => {
  const t = (text) => vn[text] || 'cooku'

  return {
    provide: {
      t
    }
  }
})