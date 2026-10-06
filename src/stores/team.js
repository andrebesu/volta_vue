import { defineStore } from 'pinia'

export const useTeamStore = defineStore('team', {
  state: () => ({
    fondatori: [
      {
        id: 1,
        sigla: 'IL',
        nome: 'Ilaria',
        ruolo: 'A&R / Direzione artistica',
        descrizione:
          'Cresciuta tra concerti e fanzine, porta in VOLTA uno sguardo editoriale preciso e una passione per la scoperta di nuovi talenti.',
      },
      {
        id: 2,
        sigla: 'AN',
        nome: 'Andrea',
        ruolo: 'Produzione e studio',
        descrizione:
          'Producer e sound engineer con oltre dieci anni di esperienza. Ha costruito lo studio pezzo per pezzo, con ossessione per il suono analogico.',
      },
      {
        id: 3,
        sigla: 'VA',
        nome: 'Valeria',
        ruolo: 'Marketing & comunicazione',
        descrizione:
          'Esperta di comunicazione culturale, crede che ogni disco meriti una storia da raccontare al mondo nel modo giusto.',
      },
    ],
    testimonianze: [
      {
        id: 1,
        nome: 'Marco T.',
        ruolo: 'Artista indipendente',
        testo:
          "Un'etichetta che ti ascolta davvero. Hanno capito la mia musica prima ancora che la spiegassi.",
        colore: 'info',
      },
      {
        id: 2,
        nome: 'Sara V.',
        ruolo: 'Producer',
        testo: 'Professionalità e passione in egual misura. Lo studio è una macchina da guerra.',
        colore: 'danger',
      },
      {
        id: 3,
        nome: 'Luca D.',
        ruolo: 'Cantautore',
        testo:
          "Finalmente un'etichetta che non ti fa sentire un numero. Lavoro con loro da due anni e non tornerei indietro.",
        colore: 'info',
      },
    ],
    numeri: [
      { id: 1, testo: '50+ dischi prodotti' },
      { id: 2, testo: '30+ artisti in Volta' },
      { id: 3, testo: '6 anni di esperienza' },
    ],
  }),
})
