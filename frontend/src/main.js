import { createApp } from 'vue'
import App from './App.vue'
import router from "./routers";
import axios from 'axios'
import store from "@/store";


axios.defaults.baseUrl = 'http://127.0.0.1:8000'

const app = createApp(App)
app.use(store)
app.use(router, axios)
app.mount('#app')
