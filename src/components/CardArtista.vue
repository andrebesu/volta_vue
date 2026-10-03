<script>
export default {
  name: 'CardArtista',
  props: {
    artista: { type: Object, required: true },
  },
}
</script>

<template>
  <div class="card h-100">
    <img
      :src="artista.immagine"
      :alt="artista.nome"
      class="card-img-top"
      style="height: 250px; object-fit: cover"
      loading="lazy"
    />
    <div class="card-body">
      <span class="badge text-bg-danger mb-2">{{ artista.genere }}</span>
      <h5 class="card-title">{{ artista.nome }}</h5>
      <p class="card-subtitle text-body-secondary small">{{ artista.ruolo }}</p>
      <p class="card-text mt-2">{{ artista.descrizione }}</p>
    </div>
    <div class="card-footer d-flex justify-content-between align-items-center">
      <small>🎧 {{ artista.stream }} stream</small>
      <RouterLink :to="`/artisti/${artista.id}`" class="btn btn-sm btn-outline-info">
        Scheda
      </RouterLink>
    </div>
  </div>
</template>
