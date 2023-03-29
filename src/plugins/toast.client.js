import useToastStore from '~/stores/toast.store'

const verticals = ['top', 'bottom'];
const horizontals = ['center', 'left', 'right']
export default defineNuxtPlugin(() => ({
  provide: {
    toast: {
      show({
        title, message, timeout = 2000, vertical = 'top', horizonal = 'center', type = 'default', props = {}
      }) {
        return new Promise(resolve => {
          const $store = useToastStore()
          const id = Math.random().toString()
          const position = `${verticals.includes(vertical) ? vertical : 'top' }_${horizontals.includes(horizonal) ? horizonal : 'center' }`
          $store.addToast({
            id,
            vertical,
            horizonal,
            props: {
              title,
              message,
              type,
              position,
              ...props
            },
            resolve,
          }),
          setTimeout(() => {
            $store.removeToast(id)
          }, timeout);
        });

      }
    }
  }
}))