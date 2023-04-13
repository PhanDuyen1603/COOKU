import useToastStore from '~/stores/toast.store'

const verticals = ['top', 'bottom'];
const horizontals = ['center', 'left', 'right']
const types = ['success', 'error', 'show', 'warning']
export default defineNuxtPlugin(() => ({
  provide: {
    toast: {
      show({
        title, message, type = 'show', timeout = 2000, vertical = 'top', horizonal = 'center', props = {}
      }) {
        return new Promise(resolve => {
          const $store = useToastStore()
          const id = Math.random().toString()
          const position = `${verticals.includes(vertical) ? vertical : 'top' }_${horizontals.includes(horizonal) ? horizonal : 'center' }`
          $store.addToast({
            id,
            vertical,
            horizonal,
            type: types.includes(type) ? type : 'show',
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