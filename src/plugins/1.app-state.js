import useAppStateStore from '~/stores/appState.store'

export default defineNuxtPlugin(() => {
  const $store = useAppStateStore();

  return {
    provide: {
      appState: {
        state: $store.state,
        togglePageBussy(yes) {
          $store.togglePageBusy(yes)
        }
      }
    }
  }
})