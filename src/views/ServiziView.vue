<script>
import { mapState } from 'pinia'
import { Modal } from 'bootstrap'
import { useServiziStore } from '../stores/servizi'

export default {
  name: 'ServiziView',
  data() {
    return {
      ordine: '',
      servizioScelto: null,
    }
  },
  computed: {
    ...mapState(useServiziStore, ['servizi']),
    serviziOrdinati() {
      const lista = [...this.servizi]
      if (this.ordine === 'prezzo-asc') {
        lista.sort((a, b) => a.prezzo - b.prezzo)
      } else if (this.ordine === 'prezzo-desc') {
        lista.sort((a, b) => b.prezzo - a.prezzo)
      } else if (this.ordine === 'nome') {
        lista.sort((a, b) => a.nome.localeCompare(b.nome))
      }
      return lista
    },
  },
  mounted() {
    // volutamente fuori da data(): non deve essere reattivo
    this.modale = new Modal(this.$refs.modale)
  },
  unmounted() {
    this.modale.dispose()
  },
  methods: {
    formattaPrezzo(servizio) {
      return `€${servizio.prezzo}${servizio.unita}`
    },
    apriDettaglio(servizio) {
      this.servizioScelto = servizio
      this.modale.show()
    },

    vaiAlBooking() {
      const id = this.servizioScelto.id
      this.$refs.modale.addEventListener(
        'hidden.bs.modal',
        () => this.$router.push({ path: '/booking', query: { servizio: id } }),
        { once: true },
      )
      this.modale.hide()
    },
  },
}
</script>

<template>
  <div class="container my-4">
    <h1>Cosa offriamo</h1>
    <p class="text-body-secondary">
      Soluzioni complete per artisti emergenti e professionisti. Dalla pre-produzione al master
      finale, il tuo suono è in buone mani.
    </p>

    <div class="row mb-3">
      <div class="col-12 col-md-4">
        <label for="ordine" class="form-label">Ordina per</label>
        <select id="ordine" v-model="ordine" class="form-select">
          <option value="">Come da listino</option>
          <option value="prezzo-asc">Prezzo crescente</option>
          <option value="prezzo-desc">Prezzo decrescente</option>
          <option value="nome">Nome (A-Z)</option>
        </select>
      </div>
    </div>

    <div class="table-responsive">
      <table class="table table-hover align-middle">
        <caption class="visually-hidden">
          Listino dei servizi dello studio: nome, descrizione, durata minima e prezzo
        </caption>
        <thead>
          <tr class="text-info text-uppercase small">
            <th scope="col">Servizio</th>
            <th scope="col" class="d-none d-md-table-cell">Descrizione</th>
            <th scope="col" class="text-center">Durata min.</th>
            <th scope="col" class="text-end">Prezzo (da)</th>
            <th scope="col"><span class="visually-hidden">Azioni</span></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="s in serviziOrdinati" :key="s.id">
            <td class="fw-bold">{{ s.nome }}</td>
            <td class="d-none d-md-table-cell text-body-secondary">{{ s.descrizione }}</td>
            <td class="text-center">{{ s.durata }}</td>
            <td class="text-end text-danger fw-bold">{{ formattaPrezzo(s) }}</td>
            <td class="text-end">
              <button class="btn btn-sm btn-outline-info" @click="apriDettaglio(s)">
                Dettagli
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div
      ref="modale"
      class="modal fade"
      tabindex="-1"
      aria-labelledby="titoloModale"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 id="titoloModale" class="modal-title">
              {{ servizioScelto ? servizioScelto.nome : '' }}
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Chiudi"
            ></button>
          </div>
          <div v-if="servizioScelto" class="modal-body">
            <p>{{ servizioScelto.descrizione }}</p>
            <p v-if="servizioScelto.durata !== '-'" class="mb-1">
              <strong>Durata minima:</strong> {{ servizioScelto.durata }}
            </p>
            <p class="mb-0"><strong>Prezzo da:</strong> {{ formattaPrezzo(servizioScelto) }}</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
              Chiudi
            </button>
            <button type="button" class="btn btn-outline-info" @click="vaiAlBooking">
              Prenota questo servizio
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
