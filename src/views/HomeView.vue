<script>
import { mapState } from 'pinia'
import { useReleaseStore } from '../stores/release'
import { useEventiStore } from '../stores/eventi'
import CardRelease from '../components/CardRelease.vue'

export default {
  name: 'HomeView',
  components: { CardRelease },
  computed: {
    ...mapState(useReleaseStore, ['release']),
    ...mapState(useEventiStore, ['prossimi']),
  },
}
</script>

<template>
  <div>
    <section class="text-center py-5">
      <h1 class="display-3 text-danger">ELEVATE YOUR SOUND</h1>
      <p class="fs-5" style="letter-spacing: 0.5rem">TORINO DAL 2021</p>
    </section>

    <div class="container mb-5">
      <div class="row g-4">
        <div class="col-12 col-lg-9">
          <h2>Ultime Release</h2>
          <div class="row row-cols-1 row-cols-md-2 g-4">
            <div v-for="r in release" :key="r.id" class="col">
              <CardRelease
                :immagine="r.immagine"
                :alt="`${r.titolo} - ${r.artista}`"
                :titolo="`“${r.titolo}” - ${r.artista}`"
                :badge="r.tag"
              >
                {{ r.descrizione }}
              </CardRelease>
            </div>
          </div>
        </div>

        <aside class="col-12 col-lg-3">
          <AsideBox>
            <template #titolo>Prossimi Live</template>
            <ul class="list-unstyled mb-0">
              <li v-for="e in prossimi" :key="e.id" class="mb-3">
                <span class="volta-data">{{ e.data }} - {{ e.luogo }}</span>
                <br />
                <strong>{{ e.titolo }}</strong>
                <p class="text-body-secondary small mb-0">{{ e.descrizione }}</p>
              </li>
            </ul>
          </AsideBox>
        </aside>
      </div>
    </div>
  </div>
</template>
