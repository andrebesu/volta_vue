<script>
import { mapState, mapActions } from 'pinia'
import { useServiziStore } from '../stores/servizi'
import { usePrenotazioniStore } from '../stores/prenotazioni'

const formVuoto = () => ({
  artista: '',
  email: '',
  servizio: '',
  data: '',
  durata: '4h',
  note: '',
})

export default {
  name: 'BookingView',
  data() {
    return {
      form: formVuoto(),
      tentato: false,
      confermato: '',
      bozza: false,
    }
  },
  computed: {
    ...mapState(useServiziStore, ['servizi']),
    ...mapState(usePrenotazioniStore, ['prenotazioni', 'numeroPrenotazioni']),
    dataMinima() {
      const adesso = new Date()
      adesso.setMinutes(adesso.getMinutes() - adesso.getTimezoneOffset())
      return adesso.toISOString().slice(0, 16)
    },
    watch: {
      form: {
        handler(f) {
          this.bozza = Boolean(f.artista || f.email || f.note)
        },
        deep: true,
      },
    },
    errori() {
      const e = {}
      if (this.form.artista.trim().length < 2) {
        e.artista = "Inserisci il nome dell'artista o della band (almeno 2 caratteri)."
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.form.email)) {
        e.email = 'Inserisci un indirizzo email valido.'
      }
      if (!this.form.servizio) {
        e.servizio = 'Scegli un servizio.'
      }
      if (!this.form.data) {
        e.data = 'Scegli data e ora.'
      } else if (this.form.data < this.dataMinima) {
        e.data = 'La data non può essere nel passato.'
      }
      return e
    },
  },
  created() {
    const richiesto = this.$route.query.servizio
    if (richiesto && this.servizi.some((s) => s.id === richiesto)) {
      this.form.servizio = richiesto
    }
  },
  methods: {
    ...mapActions(usePrenotazioniStore, ['aggiungiPrenotazione', 'rimuoviPrenotazione']),
    invia() {
      this.tentato = true
      this.confermato = ''
      if (Object.keys(this.errori).length > 0) {
        return
      }
      const nome = this.form.artista.trim()
      this.aggiungiPrenotazione({ ...this.form, artista: nome })
      this.confermato = `Richiesta inviata per ${nome}. Ti risponderemo via email!`
      this.form = formVuoto()
      this.tentato = false
    },
    nomeServizio(id) {
      const s = this.servizi.find((x) => x.id === id)
      return s ? s.nome : id
    },
    formattaData(data) {
      return new Date(data).toLocaleString('it-IT', { dateStyle: 'short', timeStyle: 'short' })
    },
  },
}
</script>

<template>
  <div class="container my-4">
    <div class="row g-4">
      <div class="col-12 col-lg-8">
        <h1>Booking studio</h1>
        <p class="text-body-secondary">
          Compila il modulo per riservare una sessione nel nostro studio di registrazione
          professionale a Torino.
        </p>

        <form novalidate @submit.prevent="invia">
          <div class="row g-3">
            <div class="col-12 col-md-6">
              <label for="artista" class="form-label">Nome artista / band</label>
              <input
                id="artista"
                v-model="form.artista"
                type="text"
                class="form-control"
                :class="{ 'is-invalid': tentato && errori.artista }"
                placeholder="Es. The Voltaics"
                autocomplete="on"
              />
              <div class="invalid-feedback">{{ errori.artista }}</div>
            </div>

            <div class="col-12 col-md-6">
              <label for="email" class="form-label">Email di contatto</label>
              <input
                id="email"
                v-model="form.email"
                type="email"
                class="form-control"
                :class="{ 'is-invalid': tentato && errori.email }"
                placeholder="tua@email.com"
                autocomplete="on"
              />
              <div class="invalid-feedback">{{ errori.email }}</div>
            </div>

            <div class="col-12">
              <label for="servizio" class="form-label">Servizio richiesto</label>
              <select
                id="servizio"
                v-model="form.servizio"
                class="form-select"
                :class="{ 'is-invalid': tentato && errori.servizio }"
              >
                <option value="" disabled>Seleziona un servizio...</option>
                <option v-for="s in servizi" :key="s.id" :value="s.id">{{ s.nome }}</option>
              </select>
              <div class="invalid-feedback">{{ errori.servizio }}</div>
            </div>

            <div class="col-12 col-md-6">
              <label for="data" class="form-label">Data preferita</label>
              <input
                id="data"
                v-model="form.data"
                type="datetime-local"
                class="form-control"
                :min="dataMinima"
                :class="{ 'is-invalid': tentato && errori.data }"
              />
              <div class="invalid-feedback">{{ errori.data }}</div>
            </div>

            <div class="col-12 col-md-6">
              <label for="durata" class="form-label">Durata stimata</label>
              <select id="durata" v-model="form.durata" class="form-select">
                <option value="4h">Mezza giornata (4h)</option>
                <option value="8h">Giornata intera (8h)</option>
                <option value="multi">Più giorni</option>
              </select>
            </div>

            <div class="col-12">
              <label for="note" class="form-label">Note aggiuntive</label>
              <textarea
                id="note"
                v-model="form.note"
                rows="4"
                class="form-control"
                placeholder="Scrivi qui le tue esigenze..."
              ></textarea>
            </div>

            <div class="col-12">
              <button type="submit" class="btn btn-outline-info w-100">
                RICHIEDI PRENOTAZIONE
              </button>
            </div>
          </div>
        </form>

        <p v-if="bozza" class="small text-warning mt-2 mb-0">Hai una bozza non ancora inviata.</p>

        <div v-if="confermato" class="alert alert-success mt-3" role="alert">
          {{ confermato }}
        </div>

        <section v-if="numeroPrenotazioni" class="mt-5">
          <h2>Le tue richieste ({{ numeroPrenotazioni }})</h2>
          <ul class="list-group">
            <li
              v-for="p in prenotazioni"
              :key="p.id"
              class="list-group-item d-flex justify-content-between align-items-center"
            >
              <span>
                <strong>{{ p.artista }}</strong> - {{ nomeServizio(p.servizio) }}
                <br />
                <small class="text-body-secondary">{{ formattaData(p.data) }}</small>
              </span>
              <button class="btn btn-sm btn-outline-danger" @click="rimuoviPrenotazione(p.id)">
                Annulla
              </button>
            </li>
          </ul>
        </section>
      </div>

      <aside class="col-12 col-lg-4">
        <div class="volta-aside">
          <h3>Lo studio</h3>
          <img
            src="/immagini/interno_studio.jpg"
            alt="Interno dello studio di registrazione"
            class="img-fluid rounded mb-3"
          />
          <p class="text-body-secondary">
            Dotato di outboard analogico Neve/Universal Audio e monitoraggio Genelec.
          </p>
          <ul class="list-unstyled text-info small mb-0">
            <li>✓ Climatizzazione</li>
            <li>✓ Area Relax / Bar</li>
            <li>✓ Parcheggio Privato</li>
          </ul>
        </div>
      </aside>
    </div>
  </div>
</template>
