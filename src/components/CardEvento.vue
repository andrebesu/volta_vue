<script>
export default {
  name: 'CardEvento',
  props: {
    evento: { type: Object, required: true },
    colore: { type: String, default: 'info' },
  },
}
</script>

<template>
  <div
    class="card border-start border-4 mb-3"
    :class="[`border-${colore}`, { 'evento-passato': evento.passato }]"
  >
    <div class="card-body">
      <span class="volta-data" :class="`text-${colore}`">
        {{ evento.data }} - {{ evento.luogo }}
      </span>
      <h5 class="card-title mt-1">{{ evento.titolo }}</h5>
      <p class="card-text text-body-secondary mb-0">{{ evento.descrizione }}</p>
    </div>
  </div>
</template>
