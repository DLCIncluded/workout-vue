import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index.js'
import axios from 'axios'
import BaseCard from './components/ui/BaseCard.vue'
import BaseSpinner from './components/ui/BaseSpinner.vue'

import Errors from './components/Errors.vue'
import SmallLoadingSpinner from './components/ui/SmallLoadingSpinner.vue'
import PageLoadingSpinner from './components/ui/PageLoadingSpinner.vue'

axios.defaults.baseURL = 'https://dlcincluded.com/'
// axios.defaults.baseURL = 'http://192.168.1.6/'


const app = createApp(App);
app.use(store).use(router)


app.component('base-card', BaseCard)
app.component('base-spinner', BaseSpinner)

app.component('small-loading-spinner', SmallLoadingSpinner)
app.component('page-loading-spinner', PageLoadingSpinner)

app.component('errors', Errors)
// app.use(axios)
app.mount('#app')