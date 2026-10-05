import { defineStore } from 'pinia'

export const useReleaseStore = defineStore('release', {
  state: () => ({
    release: [
      {
        id: 1,
        titolo: 'Neon nei Polmoni',
        artista: 'Vetro Freddo',
        tag: 'Post-rock / Elettronica analogica',
        descrizione:
          'Un viaggio tra synth analogici e chitarre sporche, nato nelle notti insonni di periferia. Malinconia urbana e ritmi pulsanti, con testi che sembrano appunti rubati da un diario mai finito.',
        immagine: '/immagini/card1.jpeg',
      },
      {
        id: 2,
        titolo: 'Cani Senza Nome',
        artista: 'Milo T.',
        tag: 'Spoken word / Experimental hip-hop',
        descrizione:
          'Un EP ruvido e diretto, tra spoken word e beat minimali. Milo T. scava nelle crepe delle relazioni contemporanee con una voce che non cerca compromessi.',
        immagine: '/immagini/card2.jpg',
      },
      {
        id: 3,
        titolo: 'Cartoline da Nessun Luogo',
        artista: 'Atlante Minore',
        tag: 'Ambient / Elettronica cinematica',
        descrizione:
          'Atmosfere sospese e suoni cinematici per un disco che parla di fughe, ritorni e identità liquide. Perfetto per chi ama perdersi senza una destinazione precisa.',
        immagine: '/immagini/card3.jpg',
      },
      {
        id: 4,
        titolo: 'Rumore Bianco Domestico',
        artista: 'Camera 17',
        tag: 'Lo-fi / Sound art',
        descrizione:
          'Registrato quasi interamente in casa, tra elettrodomestici e microfoni improvvisati. Un progetto lo-fi che trasforma il quotidiano in paesaggio sonoro.',
        immagine: '/immagini/card4.jpg',
      },
    ],
    uscite: [
      {
        id: 1,
        titolo: 'Argentea',
        artista: 'Nova Ricci',
        formato: 'Single',
        immagine: '/immagini/album1.jpg',
      },
      {
        id: 2,
        titolo: 'Acid Rain',
        artista: 'Darkwolf',
        formato: 'LP',
        immagine: '/immagini/album2.jpg',
      },
    ],
  }),
})
