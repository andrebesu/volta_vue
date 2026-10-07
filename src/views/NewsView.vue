<script>
import { mapState, mapActions } from 'pinia'
import { useReleaseStore } from '../stores/release'
import { useEventiStore } from '../stores/eventi'
import { useNewsletterStore } from '../stores/newsletter'
import CardEvento from '../components/CardEvento.vue'
import CardRelease from '../components/CardRelease.vue'

export default {
  name: 'NewsView',
  components: { CardEvento, CardRelease },
  data() {
    return {
      nome: '',
      email: '',
      privacy: false,
      messaggio: '',
      esito: false,
    }
  },
  computed: {
    ...mapState(useReleaseStore, ['uscite']),
    ...mapState(useEventiStore, ['prossimi', 'passati']),
  },
  methods: {
    ...mapActions(useNewsletterStore, ['iscrivi']),
    iscriviti() {
      this.esito = this.iscrivi(this.nome.trim(), this.email.trim())
      if (this.esito) {
        this.messaggio = `Grazie ${this.nome.trim()}, sei iscritto alla newsletter!`
        this.nome = ''
        this.email = ''
        this.privacy = false
      } else {
        this.messaggio = 'Questa email è già iscritta.'
      }
    },
  },
}
</script>

<template>
  <div class="container my-4">
    <div class="row g-4">
      <div class="col-12 col-lg-8">
        <h1>Ultime uscite</h1>
        <h2>Non perdetevene nessuna!</h2>

        <div class="row row-cols-1 row-cols-sm-2 g-4">
          <div v-for="u in uscite" :key="u.id" class="col">
            <CardRelease
              :immagine="u.immagine"
              :alt="`${u.titolo} di ${u.artista}`"
              :titolo="u.titolo"
              badge="FUORI ORA"
            >
              {{ u.artista }} - {{ u.formato }}
            </CardRelease>
          </div>
        </div>

        <h2 class="text-warning mt-5">Prossimi live</h2>
        <CardEvento
          v-for="(e, i) in prossimi"
          :key="e.id"
          :evento="e"
          :colore="i % 2 === 0 ? 'info' : 'danger'"
        />

        <h2 class="text-warning mt-5">Eventi passati</h2>
        <CardEvento v-for="e in passati" :key="e.id" :evento="e" colore="secondary" />
      </div>

      <aside class="col-12 col-lg-4">
        <AsideBox>
          <template #titolo>Playlist</template>
          <p class="text-body-secondary">
            Ascolta la selezione ufficiale dei nostri artisti su Spotify.
          </p>
          <a
            href="https://open.spotify.com/"
            target="_blank"
            rel="noopener"
            class="btn btn-outline-info w-100"
          >
            ASCOLTA ORA
          </a>

          <h3 class="mt-5">Resta aggiornato con la nostra newsletter!</h3>
          <p class="text-body-secondary">
            Ricevi in anteprima le nuove uscite e gli eventi esclusivi di Volta Records.
          </p>

          <form @submit.prevent="iscriviti">
            <input
              v-model="nome"
              type="text"
              class="form-control mb-3"
              placeholder="Il tuo nome"
              aria-label="Il tuo nome"
              required
            />
            <input
              v-model="email"
              type="email"
              class="form-control mb-3"
              placeholder="La tua email"
              aria-label="La tua email"
              required
            />
            <div class="form-check mb-3">
              <input
                id="privacyNews"
                v-model="privacy"
                type="checkbox"
                class="form-check-input"
                required
              />
              <label for="privacyNews" class="form-check-label">Accetto la privacy policy</label>
            </div>
            <button type="submit" class="btn btn-outline-info w-100">ISCRIVITI ORA</button>
          </form>

          <div
            v-if="messaggio"
            class="alert mt-3 mb-0"
            :class="esito ? 'alert-success' : 'alert-warning'"
            role="alert"
          >
            {{ messaggio }}
          </div>
        </AsideBox>
      </aside>
    </div>
  </div>
</template>
