import { defineStore } from 'pinia'

export const useDemoStore = defineStore('demo', {
  state: () => ({
    generi: [
      { valore: 'indie-pop', etichetta: 'Indie / Pop' },
      { valore: 'elettronica', etichetta: 'Elettronica / Ambient' },
      { valore: 'urban-trap', etichetta: 'Urban / Trap / Hip-Hop' },
      { valore: 'post-rock', etichetta: 'Rock / Post-Rock' },
      { valore: 'lo-fi', etichetta: 'Lo-fi / Sound Art' },
      { valore: 'sperimentale', etichetta: 'Sperimentale / Altro' },
    ],
    demo: [],
    prossimoId: 1,
  }),
  getters: {
    numeroDemo: (state) => state.demo.length,
  },
  actions: {
    inviaDemo(dati) {
      if (this.demo.some((d) => d.link === dati.link)) {
        return false
      }
      this.demo.push({ id: this.prossimoId, ...dati })
      this.prossimoId++
      return true
    },
  },
})
