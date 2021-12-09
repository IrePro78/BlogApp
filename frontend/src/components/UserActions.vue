<template>
  <form class="container justify-content-end">

    <button class="btn btn-sm btn-outline-dark me-1" @click="deleteUser">Edit profile</button>
    <button class="btn btn-sm btn-outline-dark me-1" @click="changePassword">Change password</button>
    <button class="btn btn-sm btn-outline-danger me-1" @click="deleteUser">Delete account</button>
  </form>
</template>

<script>
import axios from 'axios'

export default {


  methods: {
    async deleteUser() {
      this.$store.commit('setIsLoading', true)
      await axios
          .delete('/api/v1/users/me/', {
            data: {
              current_password: this.$store.state.user.password
            }
          })
          .then(response => {
            console.log(response, 'Deleted')
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
      this.$store.commit('setUser')
      await this.$router.push('/')


    }
  },
}

</script>

<style scoped>

</style>