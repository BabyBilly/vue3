import './assets/main.css'
import httpInstance from '@/util/http.js'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

httpInstance({
  url: '/category',
  method: 'GET'
})

app.use(createPinia())
app.use(router)



app.mount('#app')
