<template>
  <div class="container justify-content-end">

    <button class="btn btn-sm btn-outline-dark me-1"  @click="editProfile">Edit profile</button>
    <router-link class="btn btn-sm btn-outline-success me-1" to="/change-password">Change password</router-link>
    <button class="btn btn-sm btn-outline-danger me-1"  @click="confirmDelete">Delete account</button>
  </div>
</template>

<script>
import axios from 'axios'

export default {

  methods: {
  confirmDelete() {
      this.$swal({
        title: 'Are you sure?',
        text: 'You can\'t revert your action',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, Delete!',
        cancelButtonText: 'No, Cancel!',
        reverseButtons: false
      }).then((result) => {
        if (result.value) {
          this.$swal('Deleted', 'You successfully deleted you account', 'success', this.deleteUser())
        }
      })
    },

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
      this.$store.commit('setIsLoading', false)
    }
  },
}

</script>

<style scoped>

</style>