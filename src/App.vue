<script>
export default {
  name: 'App',
  data() {
    return {
      menuAperto: false,
      voci: [
        { testo: 'Home', percorso: '/' },
        { testo: 'Chi Siamo', percorso: '/chi-siamo' },
        { testo: 'Artisti', percorso: '/artisti' },
        { testo: 'Servizi', percorso: '/servizi' },
        { testo: 'Booking', percorso: '/booking' },
        { testo: 'News', percorso: '/news' },
        { testo: 'Demo', percorso: '/demo' },
        { testo: 'Contatti', percorso: '/contatti' },
      ],
    }
  },
}
</script>

<template>
  <header>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
      <div class="container">
        <RouterLink class="navbar-brand" to="/" @click="menuAperto = false">
          VOLTA RECORDS
        </RouterLink>

        <button
          class="navbar-toggler"
          type="button"
          aria-label="Apri o chiudi il menu"
          :aria-expanded="menuAperto"
          @click="menuAperto = !menuAperto"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" :class="{ show: menuAperto }">
          <ul class="navbar-nav ms-auto">
            <li v-for="voce in voci" :key="voce.percorso" class="nav-item">
              <RouterLink
                class="nav-link"
                :to="voce.percorso"
                exact-active-class="active"
                @click="menuAperto = false"
              >
                {{ voce.testo }}
              </RouterLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>

  <RouterView />
</template>
