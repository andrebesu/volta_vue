<script>
import { mapState } from 'pinia'
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
    ...mapState(useArtistiStore, ['artisti']),
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
  },
  methods: {
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
        <button class="btn btn-outline-secondary w-100" @click="azzeraFiltri">Azzera</button>
      </div>
    </div>

    <p class="text-body-secondary">{{ artistiFiltrati.length }} risultati</p>

    <div v-if="artistiFiltrati.length" class="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
      <div v-for="a in artistiFiltrati" :key="a.id" class="col">
        <CardArtista :artista="a" />
      </div>
    </div>
    <p v-else class="text-center my-5">Nessun artista corrisponde alla ricerca.</p>
  </div>
</template>
