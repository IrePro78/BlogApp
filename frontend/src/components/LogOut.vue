<template>

</template>

<script>
import axios from "axios"

export default {
  name: "LogOut",

  mounted() {
    this.logout()
  },

  methods: {
    async logout() {
      await axios
      .post('/api/v1/auth/token/logout/')
      .then(response => {
        console.log(response, 'Logged out')
      })
      .catch(error => {
        console.log(JSON.stringify(error))
      })
      axios.defaults.headers.common['Authorization'] = ''
      localStorage.removeItem('token')
      localStorage.removeItem('userid')
      localStorage.removeItem('username')
      localStorage.removeItem('password')
      localStorage.removeItem('email')
      localStorage.removeItem('date_joined')
      this.$store.commit('removeToken')
      await this.$router.push('/')

    }
  }
}
</script>

<style scoped>

</style>