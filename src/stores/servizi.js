import { defineStore } from 'pinia'

export const useServiziStore = defineStore('servizi', {
  state: () => ({
    servizi: [
      {
        id: 'rec-voce',
        nome: 'Registrazione Voce',
        descrizione: 'Booth professionale, pre-amp Neve, con ingegnere del suono dedicato.',
        durata: '3h',
        prezzo: 120,
        unita: '',
      },
      {
        id: 'rec-full',
        nome: 'Registrazione Full Band',
        descrizione: 'Sala grande, drum booth, 24 canali live simultanei.',
        durata: '8h',
        prezzo: 350,
        unita: '',
      },
      {
        id: 'mix-master',
        nome: 'Mixing & Mastering',
        descrizione:
          'Trattamento analogico e digitale per dare al tuo brano un suono professionale e pronto per Spotify.',
        durata: '-',
        prezzo: 150,
        unita: '/brano',
      },
      {
        id: 'produzione',
        nome: 'Produzione Artistica',
        descrizione:
          'Affiancamento completo: arrangiamento, scelta dei suoni e direzione musicale del progetto.',
        durata: 'Sessione giornaliera',
        prezzo: 250,
        unita: '',
      },
      {
        id: 'sala',
        nome: 'Sala Prove',
        descrizione: 'Uso della sala grande con backline inclusa (batteria, ampli, PA).',
        durata: '2h',
        prezzo: 40,
        unita: '',
      },
      {
        id: 'podcast',
        nome: 'Podcast / Voice Over',
        descrizione:
          'Registrazione pulita per contenuti parlati, audiolibri o pubblicità radiofoniche.',
        durata: '1h',
        prezzo: 60,
        unita: '',
      },
    ],
  }),
})
