<script>
import { mapState } from 'pinia'
import { useTeamStore } from '../stores/team'

export default {
  name: 'ChiSiamoView',
  computed: {
    ...mapState(useTeamStore, ['fondatori', 'testimonianze', 'numeri']),
  },
}
</script>

<template>
  <div class="container my-4">
    <div class="row g-4">
      <div class="col-12 col-lg-9">
        <h1>La nostra storia</h1>
        <p class="text-body-secondary">
          Dal 2021, VOLTA RECORDS non è solo un'etichetta, ma un hub creativo per la musica
          indipendente.
        </p>
        <p class="text-body-secondary">
          Nata da un'idea di <strong>Andrea, Ilaria e Valeria</strong>, tre amici con
          background diversi ma uniti dalla stessa passione per il suono autentico. Ci siamo uniti
          con l'idea di trasformare la nostra passione in un porto sicuro per chi, come noi, crede
          che la musica abbia ancora bisogno di cura, tempo e visione.
        </p>

        <h2 class="mt-4">I fondatori</h2>
        <div class="row row-cols-1 row-cols-md-3 g-4">
          <div v-for="f in fondatori" :key="f.id" class="col">
            <div class="card h-100">
              <div class="card-body">
                <div class="volta-sigla mb-2">{{ f.sigla }}</div>
                <h3>{{ f.nome }}</h3>
                <p class="text-info small mb-2">{{ f.ruolo }}</p>
                <p class="card-text text-body-secondary mb-0">{{ f.descrizione }}</p>
              </div>
            </div>
          </div>
        </div>

        <h2 class="mt-5">Dicono di noi</h2>
        <div
          v-for="t in testimonianze"
          :key="t.id"
          class="card border-start border-4 mb-3"
          :class="`border-${t.colore}`"
        >
          <div class="card-body">
            <h5 class="card-title mb-0">{{ t.nome }}</h5>
            <p class="small text-body-secondary mb-1">{{ t.ruolo }}</p>
            <p class="text-warning mb-2" aria-label="Valutazione: 5 stelle su 5">★★★★★</p>
            <blockquote class="mb-0">“{{ t.testo }}”</blockquote>
          </div>
        </div>
      </div>

      <aside class="col-12 col-lg-3">
        <AsideBox>
          <template #titolo>La nostra filosofia</template>
          <p class="text-body-secondary">
            In VOLTA rallentiamo. Ci prendiamo cura del talento, costruendo progetti che abbiano una
            voce fuori dal coro. La qualità dei legami prima della quantità dei click.
          </p>
          <div
            v-for="n in numeri"
            :key="n.id"
            class="border border-2 border-info rounded text-center p-3 mb-3"
          >
            <h4 class="mb-0">{{ n.testo }}</h4>
          </div>
        </AsideBox>
      </aside>
    </div>
  </div>
</template>
