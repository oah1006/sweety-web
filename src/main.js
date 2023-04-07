import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Unauthorized from "@/components/Unauthorized.vue";

import App from './App.vue'

import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

import VueCookies from 'vue-cookies'

import router from './router'

import './style.css'

const pinia = createPinia()
const app = createApp(App)

app.config.errorHandler = (err, vm, info) => {
    if (err.response.status === 403) {
        router.push({ name: Unauthorized })
    }
}

app.use(VueCookies, {
})

app.use(router)

app.use(pinia)
app.mount('#app')
app.component('VueDatePicker', VueDatePicker);
