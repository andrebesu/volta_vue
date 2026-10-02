<template>
  <div>
    <h1>{{ titolo }}</h1>

    <!-- 11c: il padre mostra lo stato aggiornato dagli eventi -->
    <h2>I tuoi preferiti ({{ preferiti.length }})</h2>
    <ul v-if="artistiPreferiti.length > 0">
      <li v-for="a in artistiPreferiti" :key="a.id">{{ a.nome }}</li>
    </ul>
    <p v-else>Nessun preferito ancora.</p>

    <h2>Roster</h2>
    <!-- 11a: il padre ascolta l'evento del figlio con @ -->
    <CardArtista
      v-for="a in artisti"
      :key="a.id"
      :id="a.id"
      :nome="a.nome"
      :genere="a.genere"
      :stream="a.stream"
      :preferito="preferiti.includes(a.id)"
      @toggle-preferito="gestisciPreferito"
    />
  </div>
</template>

<script>
import CardArtista from '../components/CardArtista.vue'

export default {
  name: 'HomeView',
  components: {
    CardArtista,
  },
  data() {
    return {
      titolo: 'ELEVATE YOUR SOUND',
      preferiti: [],
      artisti: [
        { id: 1, nome: 'Milo T.', genere: 'Elettronica', stream: '2.1M' },
        { id: 2, nome: 'Darkwolf', genere: 'Urban Trap', stream: '900K' },
        { id: 3, nome: 'Bernadette', genere: 'Soul', stream: '2.9M' },
      ],
    }
  },
  computed: {
    artistiPreferiti() {
      return this.artisti.filter((a) => this.preferiti.includes(a.id))
    },
  },
  methods: {
    // 11b: i due valori emessi dal figlio arrivano come parametri
    gestisciPreferito(id, nome) {
      console.log('evento ricevuto dalla card di', nome)
      if (this.preferiti.includes(id)) {
        this.preferiti = this.preferiti.filter((p) => p !== id)
      } else {
        this.preferiti.push(id)
      }
    },
  },
}
</script>
