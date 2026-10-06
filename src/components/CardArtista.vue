<script>
export default {
  name: 'CardArtista',
  props: {
    artista: { type: Object, required: true },
    preferito: { type: Boolean, default: false },
  },
  emits: ['toggle-preferito'],
}
</script>

<template>
  <div class="card h-100">
    <img :src="artista.immagine" :alt="artista.nome" class="card-img-top" loading="lazy" />
    <div class="card-body">
      <span class="badge text-bg-danger mb-2">{{ artista.genere }}</span>
      <h5 class="card-title">{{ artista.nome }}</h5>
      <p class="card-subtitle text-body-secondary small">{{ artista.ruolo }}</p>
      <p class="card-text mt-2">{{ artista.descrizione }}</p>
    </div>
    <div class="card-footer d-flex justify-content-between align-items-center">
      <small>🎧 {{ artista.stream }} stream</small>
      <span class="d-flex gap-2">
        <button
          type="button"
          class="btn btn-sm btn-outline-secondary"
          :class="{ 'text-danger': preferito }"
          :aria-pressed="preferito"
          aria-label="Aggiungi o togli dai preferiti"
          @click="$emit('toggle-preferito', artista.id)"
        >
          <i class="bi" :class="preferito ? 'bi-heart-fill' : 'bi-heart'" aria-hidden="true"></i>
        </button>
        <RouterLink :to="`/artisti/${artista.id}`" class="btn btn-sm btn-outline-info">
          Scheda
        </RouterLink>
      </span>
    </div>
  </div>
</template>

<style scoped>
.card-img-top {
  height: 250px;
  object-fit: cover;
}
</style>
