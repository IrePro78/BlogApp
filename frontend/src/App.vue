<template>
<div id="app">
  <Navbar/>
  <router-view/>
</div>
</template>

<script>
import Navbar from './components/Navbar.vue'
import {csrftoken} from "./csrf/csrf_token";

export default {
  name: 'App',
  components: {
    Navbar
  },
  methods: {
    getUser() {
      fetch('api/user/', {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFTOKEN': csrftoken
        }
      })
          .then(resp => resp.json())
          .then((data) => {
            const username = data["username"]
            localStorage.setItem("username", username)

          })
          .catch(error => console.log(error))
    }
  },
  created() {
    this.getUser()
  }
}

</script>

<style>


</style>
