import { defineStore } from 'pinia'
export const useCommonStore = defineStore('common', {
  state: () => ({
    pageSize: 0,
    mobile: false,
    loading: false,
  }),
  actions: {
    updatePageSize() {
      this.pageSize = document.documentElement.offsetWidth
      this.mobile = this.pageSize <= 830
    },
    switchLoading() {
      this.loading = !this.loading
    }
  }
})