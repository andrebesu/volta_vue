<script>
import { mapState } from 'pinia'
import { useArtistiStore } from '../stores/artisti'

export default {
  name: 'ArtistaDetailView',
  props: {
    id: { type: String, required: true },
  },
  computed: {
    ...mapState(useArtistiStore, ['artisti', 'artistaPerId']),
    artista() {
      return this.artistaPerId(this.id)
    },
  },
  methods: {
    vaiAlSuccessivo() {
      const posizione = this.artisti.findIndex((a) => a.id === Number(this.id))
      const successivo = this.artisti[(posizione + 1) % this.artisti.length]
      this.$router.push(`/artisti/${successivo.id}`)
    },
  },
}
</script>

<template>
  <div v-if="artista">
    <h1>{{ artista.nome }}</h1>
    <p>{{ artista.genere }} - {{ artista.ruolo }}</p>
    <p>{{ artista.descrizione }}</p>
    <p>{{ artista.stream }} stream</p>
    <button @click="vaiAlSuccessivo">Successivo</button>
  </div>
  <p v-else>Artista non trovato.</p>
</template>
