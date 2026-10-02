<template>
  <div>
    <h1>Artisti</h1>
    <ul>
      <li v-for="a in artisti" :key="a.id">
        <RouterLink :to="{ name: 'artista-detail', params: { id: a.id } }">{{ a.nome }}</RouterLink>
        ({{ a.genere }})
      </li>
    </ul>
  </div>
</template>

<script>
import artisti from '../data/artisti.js'

export default {
  name: 'ArtistiView',
  data() {
    return {
      artisti,
    }
  },
}
</script>
