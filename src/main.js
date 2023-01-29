import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import VueCookies from 'vue-cookies'
import router from './router'

import './style.css'


const app = createApp(App)

app.use(VueCookies, {})

app.use(createPinia())
app.use(router)

app.mount('#app')
