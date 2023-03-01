import { defineStore } from 'pinia';

export default defineStore({
  id: 'app-state-store',

  state: () => ({
    pageBusy: false,
  }),

  getters: {
    state: (state) => state.pageBusy
  },

  actions: {
    togglePageBusy(yes = !this.pageBusy) {
      this.pageBusy = yes;
    },
  },
});
