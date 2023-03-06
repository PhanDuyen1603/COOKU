import { defineStore } from 'pinia'

export default defineStore({
  id: 'toast-store',
  state: () => ({
    list: []
  }),
  actions: {
    addToast(data) {
      this.list = [...this.list, data]
    },
    removeToast(id) {
      this.list = this.list.filter(x => x.id != id)
    }
  }
})