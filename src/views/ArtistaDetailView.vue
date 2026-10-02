<template>
  <div>
    <div v-if="artista">
      <h1>{{ artista.nome }}</h1>
      <p>{{ artista.genere }}</p>
      <p>{{ artista.bio }}</p>
    </div>
    <p v-else>Artista non trovato.</p>

    <RouterLink :to="{ name: 'artisti' }">← Torna alla lista</RouterLink>
    <button @click="vaiAlSuccessivo">Artista successivo</button>
  </div>
</template>

<script>
import artisti from '../data/artisti.js'

export default {
  name: 'ArtistaDetailView',
  // grazie a "props: true" nella route, il parametro :id arriva come prop
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      artisti,
    }
  },
  computed: {
    artista() {
      // il parametro dell'URL è sempre una stringa: lo convertiamo in numero
      return this.artisti.find((a) => a.id === Number(this.id))
    },
  },
  methods: {
    vaiAlSuccessivo() {
      const prossimo = (Number(this.id) % this.artisti.length) + 1
      this.$router.push({ name: 'artista-detail', params: { id: prossimo } })
    },
  },
  created() {
    console.log('created: dettaglio aperto, id =', this.id)
  },
  watch: {
    id(nuovo) {
      console.log("watch: l'id è cambiato in", nuovo)
    },
  },
}
</script>
