import { createApp } from 'vue'
import App from './App.vue'
import router from "./routers";
import axios from 'axios'


axios.default.baseUrl = 'http://127.0.0.1:8000'

const app = createApp(App)
app.use(router, axios)
app.mount('#app')
