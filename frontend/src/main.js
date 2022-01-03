import { createApp } from 'vue'
import App from './App.vue'
import router from "./routers"
import store from "./store"
import axios from 'axios'
import VueSweetalert2 from "vue-sweetalert2"
import  'sweetalert2/dist/sweetalert2.min.css'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"


axios.defaults.baseUrl = 'http://127.0.0.1:8000'

const options = {
  customClass: {
    confirmButton: 'button is-success mx-1',
    cancelButton: 'button is-danger '
  },
  buttonsStyling: false
};

const app = createApp(App)
app.use(store).use(router, axios).use(VueSweetalert2, options)
app.mount('#app')
