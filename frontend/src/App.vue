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

<style lang="scss">
//@import '../node_modules/bulma';
.lds-dual-ring {
    display: inline-block;
    width: 80px;
    height: 80px;
}
.lds-dual-ring:after {
    content: " ";
    display: block;
    width: 64px;
    height: 64px;
    margin: 8px;
    border-radius: 50%;
    border: 6px solid #ccc;
    border-color: #ccc transparent #ccc transparent;
    animation: lds-dual-ring 1.2s linear infinite;
}
@keyframes lds-dual-ring {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}
.is-loading-bar {
    height: 0;
    overflow: hidden;
    -webkit-transition: all 0.3s;
    transition: all 0.3s;

    &.is-loading {
        height: 80px;
    }
}
</style>
