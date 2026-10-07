<script>
export default {
  name: 'ContattiView',
  data() {
    return {
      contatti: [
        { etichetta: 'Direzione', valore: 'info@voltarecords.it' },
        { etichetta: 'Stampa', valore: 'press@voltarecords.it' },
        { etichetta: 'Telefono', valore: '+39 011 987 6543' },
      ],
      social: [
        { nome: 'Instagram', icona: 'bi-instagram', profilo: '@voltarecords', link: '#' },
        { nome: 'Facebook', icona: 'bi-facebook', profilo: '@Volta Records Torino', link: '#' },
        { nome: 'SoundCloud', icona: 'bi-cloud', profilo: '@Volta Sound', link: '#' },
      ],
    }
  },
}
</script>

<template>
  <div class="container my-4">
    <div class="row g-4">
      <div class="col-12 col-lg-8">
        <div class="card text-center">
          <div class="card-body p-4">
            <h1>Get in touch</h1>
            <p class="text-body-secondary">
              Per collaborazioni, booking, stampa o richieste generali, trovi qui sotto i nostri
              riferimenti.
            </p>

            <ul class="list-unstyled mx-auto text-start" style="max-width: 600px">
              <li
                v-for="c in contatti"
                :key="c.etichetta"
                class="d-flex justify-content-between border-bottom pb-2 mb-2"
              >
                <strong class="text-info">{{ c.etichetta }}:</strong>
                <span>{{ c.valore }}</span>
              </li>
            </ul>

            <h2 class="mt-4">Venite a trovarci!</h2>
            <p class="text-body-secondary">
              Ci trovate a Torino nella nostra sede di via Roma, 1, 10123
            </p>

            <div class="ratio ratio-16x9">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2817.75821853562!2d7.682115176589813!3d45.070415559626106!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47886d704afb88df%3A0x3446d0ce69af7f1f!2sVia%20Roma%2C%201%2C%2010123%20Torino%20TO!5e0!3m2!1sit!2sit!4v1775730592107!5m2!1sit!2sit"
                title="Posizione di VOLTA RECORDS su Google Maps"
                allowfullscreen
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </div>

      <aside class="col-12 col-lg-4">
        <AsideBox>
          <template #titolo>I nostri social</template>
          <p class="text-body-secondary">
            Seguiteci sui nostri profili Instagram, Facebook e SoundCloud!
          </p>
          <ul class="list-unstyled mb-0">
            <li v-for="s in social" :key="s.nome" class="mb-2">
              <a :href="s.link" class="text-decoration-none" :aria-label="`Seguici su ${s.nome}`">
                <i class="bi me-2" :class="s.icona" aria-hidden="true"></i>
                <span>{{ s.profilo }}</span>
              </a>
            </li>
          </ul>
        </AsideBox>
      </aside>
    </div>
  </div>
</template>
