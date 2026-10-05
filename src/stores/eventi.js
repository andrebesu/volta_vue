import { defineStore } from 'pinia'

export const useEventiStore = defineStore('eventi', {
  state: () => ({
    eventi: [
      {
        id: 1,
        data: '12/05',
        luogo: 'Spazio211',
        titolo: 'Vetro Freddo + ospiti',
        descrizione:
          'Un live intenso tra elettronica e post-rock. Apertura affidata a giovani progetti locali.',
        passato: false,
      },
      {
        id: 2,
        data: '18/05',
        luogo: 'Blah Blah',
        titolo: 'Milo T (Release Party)',
        descrizione:
          'Una serata cruda e ravvicinata, senza filtri. Nuovi brani e qualche sorpresa.',
        passato: false,
      },
      {
        id: 3,
        data: '25/05',
        luogo: 'Hiroshima Mon Amour',
        titolo: 'Atlante Minore',
        descrizione: 'Un set immersivo con visual e nuove produzioni in anteprima.',
        passato: false,
      },
      {
        id: 4,
        data: '02/06',
        luogo: 'Capodoglio Murazzi',
        titolo: 'Camera 17 + DJ set',
        descrizione:
          'Suoni lo-fi e vibrazioni notturne lungo il Po. Dopo il live si continua a ballare.',
        passato: false,
      },
      {
        id: 5,
        data: '15.10.2025',
        luogo: 'Hiroshima Mon Amour',
        titolo: 'VOLTA NIGHT',
        descrizione: 'Special Guest: Milo T. + Darkwolf',
        passato: true,
      },
    ],
  }),
  getters: {
    prossimi: (state) => state.eventi.filter((e) => !e.passato),
    passati: (state) => state.eventi.filter((e) => e.passato),
  },
})
