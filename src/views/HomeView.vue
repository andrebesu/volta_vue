<template>
  <div>
    <h1>{{ titolo }}</h1>
    <p>{{ sottotitolo }}</p>
    <p>Artisti in roster: {{ numeroArtisti }}</p>

    <!-- Concetto 2: attribute binding -->
    <img :src="immagine" :alt="descrizioneImmagine" :title="descrizioneImmagine" width="300" />
    <p><a :href="linkPlaylist" target="_blank">Ascolta la playlist</a></p>
    <img :src="'https://picsum.photos/300/200?random=' + numeroImmagine" alt="Foto casuale" />
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
      immagine: 'https://picsum.photos/300/200?random=1',
      numeroImmagine: 3,
      descrizioneImmagine: 'Foto segnaposto di un concerto',
      linkPlaylist: 'https://open.spotify.com',
    }
  },
}
</script>
