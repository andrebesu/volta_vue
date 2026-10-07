<script>
export default {
  name: 'CardRelease',
  props: {
    immagine: { type: String, required: true },
    alt: { type: String, default: '' },
    titolo: { type: String, required: true },
    badge: { type: String, default: '' },
  },
}
</script>

<template>
  <div class="card h-100">
    <img :src="immagine" :alt="alt" class="card-img-top" loading="lazy" />
    <div class="card-body">
      <span v-if="badge" class="badge text-bg-danger text-wrap mb-2">{{ badge }}</span>
      <h5 class="card-title">{{ titolo }}</h5>
      <p class="card-text text-body-secondary mb-0"><slot /></p>
    </div>
  </div>
</template>

<style scoped>
.card-img-top {
  height: 250px;
  object-fit: cover;
}
</style>
