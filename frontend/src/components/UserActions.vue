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
      const password = {
        current_password: this.$store.state.user.password

      }
      console.log(password)

      await axios
      .delete('/api/v1/users/me/', password)
      .then(response => {
        console.log(response,'Deleted')
      })
          .catch(error => {
            console.log(error)
          })
      axios.defaults.headers.common['Authorization'] = ''
      localStorage.removeItem('token')
      this.$store.commit('removeToken')
      await this.$router.push('/')
      this.$store.commit('setIsLoading', false)
    }
  },
}

</script>

<style scoped>

</style>