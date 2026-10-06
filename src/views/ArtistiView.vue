<script>
import { mapState, mapActions } from 'pinia'
import { useArtistiStore } from '../stores/artisti'
import CardArtista from '../components/CardArtista.vue'

export default {
  name: 'ArtistiView',
  components: { CardArtista },
  data() {
    return {
      ricerca: '',
      genereScelto: '',
    }
  },
  computed: {
    ...mapState(useArtistiStore, ['artisti', 'preferiti']),
    generi() {
      return [...new Set(this.artisti.map((a) => a.genere))]
    },
    artistiFiltrati() {
      const testo = this.ricerca.trim().toLowerCase()
      return this.artisti.filter((a) => {
        const nomeOk = a.nome.toLowerCase().includes(testo)
        const genereOk = this.genereScelto === '' || a.genere === this.genereScelto
        return nomeOk && genereOk
      })
    },
    numeroRisultati() {
      return this.artistiFiltrati.length
    },
    nessunFiltro() {
      return this.ricerca === '' && this.genereScelto === ''
    },
  },
  watch: {
    // immediate: parte subito alla creazione, non solo al primo cambiamento
    numeroRisultati: {
      handler(n) {
        document.title = `VOLTA RECORDS | Artisti (${n})`
      },
      immediate: true,
    },
    // deep: osserva anche le modifiche interne all'array
    preferiti: {
      handler(nuovi) {
        console.log('Preferiti aggiornati:', nuovi.length)
      },
      deep: true,
    },
  },
  updated() {
    console.log('ArtistiView ri-renderizzata')
  },
  unmounted() {
    document.title = 'VOLTA RECORDS'
  },
  methods: {
    ...mapActions(useArtistiStore, ['togglePreferito']),
    azzeraFiltri() {
      this.ricerca = ''
      this.genereScelto = ''
    },
  },
}
</script>

<template>
  <div class="container my-4">
    <h1>I nostri artisti</h1>

    <div class="row g-3 my-2">
      <div class="col-12 col-md-6">
        <input
          v-model="ricerca"
          type="text"
          class="form-control"
          placeholder="Cerca per nome..."
          aria-label="Cerca un artista per nome"
        />
      </div>
      <div class="col-8 col-md-4">
        <select v-model="genereScelto" class="form-select" aria-label="Filtra per genere">
          <option value="">Tutti i generi</option>
          <option v-for="g in generi" :key="g" :value="g">{{ g }}</option>
        </select>
      </div>
      <div class="col-4 col-md-2">
        <button
          class="btn btn-outline-secondary w-100"
          :disabled="nessunFiltro"
          @click="azzeraFiltri"
        >
          Azzera
        </button>
      </div>
    </div>

    <p class="text-body-secondary">
      {{ numeroRisultati }} risultati
      <span v-show="preferiti.length" class="badge text-bg-danger ms-2">
        ♥ {{ preferiti.length }} preferiti
      </span>
    </p>

    <div v-if="numeroRisultati" class="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
      <div v-for="a in artistiFiltrati" :key="a.id" class="col">
        <CardArtista
          :artista="a"
          :preferito="preferiti.includes(a.id)"
          @toggle-preferito="togglePreferito"
        />
      </div>
    </div>
    <p v-else class="text-center my-5">Nessun artista corrisponde alla ricerca.</p>
  </div>
</template>
