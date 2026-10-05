import { defineStore } from 'pinia'

export const usePrenotazioniStore = defineStore('prenotazioni', {
  state: () => ({
    prenotazioni: [],
    prossimoId: 1,
  }),
  getters: {
    numeroPrenotazioni: (state) => state.prenotazioni.length,
  },
  actions: {
    aggiungiPrenotazione(dati) {
      this.prenotazioni.push({ id: this.prossimoId, ...dati })
      this.prossimoId++
    },
    rimuoviPrenotazione(id) {
      this.prenotazioni = this.prenotazioni.filter((p) => p.id !== id)
    },
  },
})
