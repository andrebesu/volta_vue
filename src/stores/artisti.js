import { defineStore } from 'pinia'

export const useArtistiStore = defineStore('artisti', {
  state: () => ({
    artisti: [
      {
        id: 1,
        nome: 'Nova Ricci',
        genere: 'Indie Pop',
        ruolo: 'Chitarra / Voce',
        descrizione:
          'Cantautrice torinese, scrive testi intimi e cinematografici. Sonorità acustiche e sognanti.',
        stream: '1.4M',
        immagine: '/immagini/artista1.jpg',
      },
      {
        id: 2,
        nome: 'Milo T.',
        genere: 'Elettronica',
        ruolo: 'Beatmaking / Live set',
        descrizione: 'Producer elettronico e DJ live. Unisce techno e ambient in set immersivi.',
        stream: '2.1M',
        immagine: '/immagini/artista2.jpg',
      },
      {
        id: 3,
        nome: 'Darkwolf',
        genere: 'Urban Trap',
        ruolo: 'Prod / Vocals',
        descrizione: 'Rapper e producer urban trap. Flow aggressivo e produzione dark.',
        stream: '900K',
        immagine: '/immagini/artista3.jpg',
      },
      {
        id: 4,
        nome: 'Bernadette',
        genere: 'Soul',
        ruolo: 'Voice / Piano',
        descrizione: 'Voce soul dal timbro caldo e potente. Formazione classica in pianoforte.',
        stream: '2.9M',
        immagine: '/immagini/artista4.jpg',
      },
      {
        id: 5,
        nome: 'Vetro Freddo',
        genere: 'Post-rock / Elettronica',
        ruolo: 'Synth',
        descrizione: 'Collettivo post-rock elettronico. Suoni rarefatti e atmosfere cinematiche.',
        stream: '1.8M',
        immagine: '/immagini/artista5.jpg',
      },
      {
        id: 6,
        nome: 'Atlante Minore',
        genere: 'Elettronica',
        ruolo: 'Synth pop / Ambient',
        descrizione:
          'Paesaggi sonori eterei e ritmiche glitch, dal freddo digitale a un abbraccio analogico.',
        stream: '1.3M',
        immagine: '/immagini/artista6.jpg',
      },
      {
        id: 7,
        nome: 'DiTos',
        genere: 'Indie Rock',
        ruolo: 'Cantautorato / Rock',
        descrizione: 'Testi viscerali e chitarre graffianti. Attitudine punk e poesia urbana.',
        stream: '800K',
        immagine: '/immagini/artista7.jpg',
      },
      {
        id: 8,
        nome: 'Camera 17',
        genere: 'Lo-fi',
        ruolo: 'Sound art / Beats',
        descrizione:
          'Ricerca sonora e atmosfere notturne, tra nastri magnetici e vibrazioni lo-fi.',
        stream: '500K',
        immagine: '/immagini/artista8.jpg',
      },
    ],
    preferiti: [],
  }),
  getters: {
    numeroArtisti: (state) => state.artisti.length,
    artistaPerId: (state) => (id) => state.artisti.find((a) => a.id === Number(id)),
  },
  actions: {
    aggiungiArtista(nuovo) {
      const id = this.artisti.length ? Math.max(...this.artisti.map((a) => a.id)) + 1 : 1
      this.artisti.push({ id, ...nuovo })
    },
    rimuoviArtista(id) {
      this.artisti = this.artisti.filter((a) => a.id !== id)
    },
    togglePreferito(id) {
      if (this.preferiti.includes(id)) {
        this.preferiti = this.preferiti.filter((p) => p !== id)
      } else {
        this.preferiti.push(id)
      }
    },
  },
})
