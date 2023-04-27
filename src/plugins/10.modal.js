import useModalStore from '~/stores/modal.store'

export default defineNuxtPlugin(( ) => {
  return {
    provide: {
      modal: {
        alert({ html, title, message = '', btnYes = 'OK' }) {
          return new Promise(resolve => {
            const $store = useModalStore()
            $store.addModal({
              id: Math.random().toString(),
              component: 'DefaultMessageModal',
              wrapper: 'DefaultMessageModalWrapper',
              props: {
                html,
                title,
                message,
                btns: [
                  { label: btnYes, value: true }
                ]
              },
              config: {
                maxWidth: '640px'
              },
              resolve
            })
          })
        },
        develop({beforeClose}) {
          return new Promise(resolve => {
            const $store = useModalStore()
            $store.addModal({
              id: Math.random().toString(),
              component: 'ModalCommonDeveloping',
              resolve,
              beforeClose
            })
          })
        },
        confirm({ html, title, message = '', btnYes = 'OK', btnNo = 'NO' }) {
          return new Promise(resolve => {
            const $store = useModalStore()

            $store.addModal({
              id: Math.random().toString(),
              component: 'ModalCommonDefaultMessage',
              // wrapper: 'ModalWrapperMessageWrapper',
              props: {
                html, title, message,
                btns: [
                  { label: btnNo, value: false },
                  { label: btnYes, value: true },
                ]
              },
              config: {
                maxWidth: '640px'
              },
              resolve
            })
          })
        },
        show({
          component, wrapper, wrapperProps, btns, props = {}, btnYes = 'OK', btnNo = 'NO',
          beforeClose, id = Math.random().toString(),
          ...rest
        }) {
          return new Promise(resolve => {
            const $store = useModalStore()
            $store.addModal({
              ...rest,
              id, component, wrapper, wrapperProps,
              props: {
                ...props,
                fromData: props.fromData || {},
              },
              btns: btns || [
                { label: btnNo, value: false },
                { label: btnYes, value: true },
              ],
              resolve,
              beforeClose,
            })
          })
        },
        clear() {
          const $store = useModalStore()
          $store.clearAll()
        },
        close({ id, result }) {
          return new Promise(resolve => {
            const $store = useModalStore();
            const instance = $store.list.find(i => i.id === id)

            if(!instance) return resolve

            instance.resolve(result)
            $store.removeModal(id)
          })
        }
      }
    }
  }
})