import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ArtistiView from '../views/ArtistiView.vue'
import ArtistaDetailView from '../views/ArtistaDetailView.vue'
import NotFoundView from '../views/NotFoundView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomeView },

    // caricata solo quando serve (lazy loading), come faceva già il wizard
    { path: '/about', name: 'about', component: () => import('../views/AboutView.vue') },

    // alias: /roster mostra la stessa pagina, ma l'URL resta /roster
    { path: '/artisti', name: 'artisti', component: ArtistiView, alias: '/roster' },

    // rotta dinamica: :id è un parametro, props: true lo passa al componente come prop
    { path: '/artisti/:id', name: 'artista-detail', component: ArtistaDetailView, props: true },

    // redirect: chi arriva su /band viene mandato su /artisti (e l'URL cambia)
    { path: '/band', redirect: '/artisti' },

    // catch-all: raccoglie tutti i percorsi senza corrispondenza
    { path: '/:catchAll(.*)', name: 'not-found', component: NotFoundView },
  ],
})

export default router
