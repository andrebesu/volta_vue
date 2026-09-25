<template>
  <div>
    <h1>{{ titolo }}</h1>
    <p>{{ sottotitolo }}</p>
    <p>Artisti in roster: {{ numeroArtisti }}</p>
  </div>
</template>

<script>
export default {
  name: 'HomeView',
  data() {
    return {
      titolo: 'ELEVATE YOUR SOUND',
      sottotitolo: 'TORINO DAL 2021',
      numeroArtisti: 8,
    }
  },
}
</script>
