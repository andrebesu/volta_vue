<template>
  <div class="card-artista" :class="{ preferita: preferito }">
    <h3>{{ nome }}</h3>
    <p class="genere">{{ genere }}</p>
    <p>🎧 {{ stream }} stream</p>
    <button @click="cliccaPreferito">
      {{ preferito ? '★ Nei preferiti' : '☆ Aggiungi ai preferiti' }}
    </button>
  </div>
</template>

<script>
export default {
  name: 'CardArtista',
  props: {
    id: {
      type: Number,
      required: true,
    },
    nome: {
      type: String,
      required: true,
    },
    genere: {
      type: String,
      default: 'Genere non indicato',
    },
    stream: {
      type: String,
      default: '0',
    },
    preferito: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['toggle-preferito'],
  methods: {
    cliccaPreferito() {
      // il figlio NON modifica la prop: avvisa il padre e gli passa due valori
      this.$emit('toggle-preferito', this.id, this.nome)
    },
  },
}
</script>

<style scoped>
.card-artista {
  border: 1px solid #444;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1rem;
}
.genere {
  color: mediumaquamarine;
}
.preferita {
  border-color: deeppink;
}
</style>
