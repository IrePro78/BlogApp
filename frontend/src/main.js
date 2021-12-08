import { createApp } from 'vue'
import App from './App.vue'
import router from "./routers"
import store from "./store"
import axios from 'axios'
import VueSweetalert2 from "vue-sweetalert2"
import  'sweetalert2/dist/sweetalert2.min.css'


axios.defaults.baseUrl = 'http://127.0.0.1:8000'

const options = {
  confirmButtonColor: '#198754',
  cancelButtonColor: '#dc3545',
};

const app = createApp(App)
app.use(store).use(router, axios).use(VueSweetalert2, options)
app.mount('#app')
