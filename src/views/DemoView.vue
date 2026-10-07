<script>
import { mapState, mapActions } from 'pinia'
import { useDemoStore } from '../stores/demo'
import CampoForm from '../components/CampoForm.vue'

const formVuoto = () => ({
  nome: '',
  link: '',
  genere: '',
  bio: '',
  privacy: false,
})

export default {
  name: 'DemoView',
  components: { CampoForm },
  data() {
    return {
      form: formVuoto(),
      tentato: false,
      messaggio: '',
      esito: false,
      maxBio: 300,
    }
  },
  computed: {
    ...mapState(useDemoStore, ['generi', 'demo', 'numeroDemo']),
    caratteriRimasti() {
      return this.maxBio - this.form.bio.length
    },
    percentualeBio() {
      return (this.form.bio.length / this.maxBio) * 100
    },
    errori() {
      const e = {}
      if (this.form.nome.trim().length < 2) {
        e.nome = 'Inserisci il tuo nome (almeno 2 caratteri).'
      }
      if (!this.linkValido(this.form.link)) {
        e.link = 'Inserisci un link valido, che inizi con http:// o https://'
      }
      if (!this.form.genere) {
        e.genere = 'Seleziona un genere.'
      }
      if (!this.form.privacy) {
        e.privacy = 'Devi accettare per poter inviare la demo.'
      }
      return e
    },
  },
  watch: {
    // appena l'utente riscrive il nome, il messaggio precedente sparisce
    'form.nome'(nuovo) {
      if (nuovo) {
        this.messaggio = ''
      }
    },
  },
  methods: {
    ...mapActions(useDemoStore, ['inviaDemo']),
    linkValido(testo) {
      try {
        const url = new URL(testo)
        return url.protocol === 'http:' || url.protocol === 'https:'
      } catch {
        return false
      }
    },
    nomeGenere(valore) {
      const g = this.generi.find((x) => x.valore === valore)
      return g ? g.etichetta : valore
    },
    invia() {
      this.tentato = true
      if (Object.keys(this.errori).length > 0) {
        return
      }
      const nome = this.form.nome.trim()
      this.esito = this.inviaDemo({
        nome,
        link: this.form.link.trim(),
        genere: this.form.genere,
        bio: this.form.bio.trim(),
      })
      if (this.esito) {
        this.form = formVuoto()
        this.tentato = false
        this.messaggio = `Grazie ${nome}, abbiamo ricevuto la tua demo!`
      } else {
        this.messaggio = 'Hai già inviato una demo con questo link.'
      }
    },
  },
}
</script>

<template>
  <div class="container my-4">
    <div class="row g-4">
      <div class="col-12 col-lg-8">
        <h1>Facci sentire il tuo sound</h1>
        <p class="text-body-secondary">
          Siamo sempre alla ricerca di produttori, band e artisti visionari. Non ci interessa il
          genere, ci interessa l'anima.
        </p>

        <form novalidate @submit.prevent="invia">
          <div class="mb-3">
            <CampoForm
              id="nome"
              v-model="form.nome"
              label="Nome reale o artistico"
              placeholder="Es. Volta Band"
              autofocus
              :errore="errori.nome"
              :mostra-errore="tentato"
            />
          </div>

          <div class="mb-3">
            <CampoForm
              id="link"
              v-model="form.link"
              label="Link alla tua musica (cartella Drive o playlist con almeno 2 demo)"
              tipo="url"
              placeholder="https://soundcloud.com/tuonome/sets/demo"
              :errore="errori.link"
              :mostra-errore="tentato"
            />
          </div>

          <div class="mb-3">
            <label for="genere" class="form-label">Genere musicale</label>
            <select
              id="genere"
              v-model="form.genere"
              class="form-select"
              :class="{ 'is-invalid': tentato && errori.genere }"
            >
              <option value="" disabled>Seleziona un genere...</option>
              <option v-for="g in generi" :key="g.valore" :value="g.valore">
                {{ g.etichetta }}
              </option>
            </select>
            <div class="invalid-feedback">{{ errori.genere }}</div>
          </div>

          <div class="mb-3">
            <label for="bio" class="form-label">Perché Volta Records?</label>
            <textarea
              id="bio"
              v-model="form.bio"
              rows="4"
              class="form-control"
              :maxlength="maxBio"
              placeholder="Parlaci brevemente del tuo progetto..."
            ></textarea>
            <div
              class="progress mt-1"
              style="height: 6px"
              role="progressbar"
              aria-label="Lunghezza del testo"
            >
              <div class="progress-bar bg-info" :style="{ width: percentualeBio + '%' }"></div>
            </div>
            <div class="form-text" :class="{ 'text-warning': caratteriRimasti < 30 }">
              <span v-if="caratteriRimasti === 0">Hai raggiunto il limite di caratteri</span>
              <span v-else-if="caratteriRimasti < 30"
                >Attenzione: restano {{ caratteriRimasti }} caratteri</span
              >
              <span v-else>{{ caratteriRimasti }} caratteri rimasti</span>
            </div>
          </div>

          <div class="form-check mb-3">
            <input
              id="privacy"
              v-model="form.privacy"
              type="checkbox"
              class="form-check-input"
              :class="{ 'is-invalid': tentato && errori.privacy }"
            />
            <label for="privacy" class="form-check-label">
              Accetto il trattamento dei dati e dichiaro che i brani sono originali e di mia
              proprietà intellettuale.
            </label>
            <div class="invalid-feedback">{{ errori.privacy }}</div>
          </div>

          <button type="submit" class="btn btn-outline-info w-100">INVIA DEMO</button>
        </form>

        <div
          v-if="messaggio"
          class="alert mt-3"
          :class="esito ? 'alert-success' : 'alert-warning'"
          role="alert"
        >
          {{ messaggio }}
        </div>

        <section v-if="numeroDemo" class="mt-5">
          <h2>Demo inviate ({{ numeroDemo }})</h2>
          <ul class="list-group">
            <li v-for="d in demo" :key="d.id" class="list-group-item">
              <strong>{{ d.nome }}</strong>
              <span class="badge text-bg-danger ms-2">{{ nomeGenere(d.genere) }}</span>
              <br />
              <small class="text-body-secondary">{{ d.link }}</small>
            </li>
          </ul>
        </section>
      </div>

      <aside class="col-12 col-lg-4">
        <AsideBox>
          <template #titolo>Requisiti</template>
          <img
            src="/immagini/studio2.jpg"
            alt="Studio di registrazione"
            class="img-fluid rounded mb-3"
            loading="lazy"
          />
          <p class="text-body-secondary">
            Per collaborare con noi ti richiediamo questi requisiti:
          </p>
          <ul class="mb-0">
            <li>Tracce non masterizzate</li>
            <li>Almeno 2 demo complete</li>
            <li>No cover, solo originali</li>
          </ul>
        </AsideBox>
      </aside>
    </div>
  </div>
</template>
