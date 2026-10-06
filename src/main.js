import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'bootstrap-icons/font/bootstrap-icons.css'
import './assets/theme.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import AsideBox from './components/AsideBox.vue'

const app = createApp(App)

app.use(createPinia())
app.use(router)

// registrazione globale: AsideBox si usa in qualsiasi vista senza import
app.component('AsideBox', AsideBox)

app.mount('#app')
