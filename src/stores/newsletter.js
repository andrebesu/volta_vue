import { defineStore } from 'pinia'

export const useNewsletterStore = defineStore('newsletter', {
  state: () => ({
    iscritti: [],
  }),
  getters: {
    numeroIscritti: (state) => state.iscritti.length,
  },
  actions: {
    iscrivi(nome, email) {
      const mail = email.toLowerCase()
      if (this.iscritti.some((i) => i.email === mail)) {
        return false
      }
      this.iscritti.push({ nome, email: mail })
      return true
    },
  },
})
