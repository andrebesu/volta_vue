<script>
import { mapState, mapActions } from 'pinia'
import { useArtistiStore } from '../stores/artisti'

export default {
  name: 'ArtistaDetailView',
  props: {
    id: { type: String, required: true },
  },
  computed: {
    ...mapState(useArtistiStore, ['artisti', 'preferiti', 'artistaPerId']),
    artista() {
      return this.artistaPerId(this.id)
    },
    preferito() {
      return this.artista ? this.preferiti.includes(this.artista.id) : false
    },
  },
  methods: {
    ...mapActions(useArtistiStore, ['togglePreferito']),
    vaiA(passo) {
      const totale = this.artisti.length
      const posizione = this.artisti.findIndex((a) => a.id === Number(this.id))
      const destinazione = this.artisti[(posizione + passo + totale) % totale]
      this.$router.push(`/artisti/${destinazione.id}`)
    },
  },
}
</script>

<template>
  <div class="container my-4">
    <RouterLink to="/artisti" class="btn btn-sm btn-outline-secondary mb-3">
      ← Tutti gli artisti
    </RouterLink>

    <div v-if="artista" class="row g-4">
      <div class="col-12 col-md-5">
        <img
          :src="artista.immagine"
          :alt="artista.nome"
          class="img-fluid rounded w-100 foto-artista"
        />
      </div>

      <div class="col-12 col-md-7">
        <span class="badge text-bg-danger mb-2">{{ artista.genere }}</span>
        <h1>{{ artista.nome }}</h1>
        <p class="text-info text-uppercase small">{{ artista.ruolo }}</p>
        <p class="lead">{{ artista.descrizione }}</p>
        <p class="mb-4">🎧 {{ artista.stream }} stream</p>

        <div class="d-flex flex-wrap gap-2">
          <button
            type="button"
            class="btn btn-outline-secondary"
            :class="{ 'text-danger': preferito }"
            :aria-pressed="preferito"
            @click="togglePreferito(artista.id)"
          >
            <i class="bi" :class="preferito ? 'bi-heart-fill' : 'bi-heart'" aria-hidden="true"></i>
            {{ preferito ? 'Nei preferiti' : 'Aggiungi ai preferiti' }}
          </button>
          <button type="button" class="btn btn-outline-info" @click="vaiA(-1)">← Precedente</button>
          <button type="button" class="btn btn-outline-info" @click="vaiA(1)">Successivo →</button>
        </div>
      </div>
    </div>

    <div v-else class="alert alert-warning" role="alert">
      Artista non trovato.
      <RouterLink to="/artisti" class="alert-link">Torna alla lista</RouterLink>
    </div>
  </div>
</template>

<style scoped>
.foto-artista {
  max-height: 480px;
  object-fit: cover;
}
</style>
