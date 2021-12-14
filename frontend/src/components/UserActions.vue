<template>
  <div class="container justify-content-end">

    <button class="btn btn-sm btn-outline-dark me-1" @click="editProfile">Edit profile</button>
    <router-link class="btn btn-sm btn-outline-success me-1" to="/change-password">Change password</router-link>
    <button class="btn btn-sm btn-outline-danger me-1" @click="confirmDelete">Delete account</button>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  methods: {
    async confirmDelete() {

      const {value: password} = await this.$swal({
        title: 'Are you sure?',
        text: 'You can\'t revert your action',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, Delete!',
        cancelButtonText: 'No, Cancel!',
        input: 'password',
        inputPlaceholder: 'Enter your password',
        inputAttributes: {
          maxlength: 10,
          autocapitalize: 'off',
          autocorrect: 'off'
        }
      })
      if (password) {
        await this.deleteUser(password)
      }
    },

    async deleteUser(password) {
      this.$store.commit('setIsLoading', true)
      await axios
          .delete('/api/v1/users/me/', {
            data: {
              current_password: password
            }
          })
          .then(response => {
            this.$swal(`Your account has been deleted`)
            console.log(response, 'Deleted')

            axios.defaults.headers.common['Authorization'] = ''
            localStorage.removeItem('token')
            localStorage.removeItem('userid')
            localStorage.removeItem('username')
            localStorage.removeItem('email')
            localStorage.removeItem('date_joined')
            this.$store.commit('removeToken')
            this.$store.commit('setUser')
            this.$router.push('/')

          })
          .catch(error => {
            if (error.response.status === 400) {
              this.$swal(`The current password is incorrect`, {icon: 'warning'})
            }
            console.log(error)
          })

      this.$store.commit('setIsLoading', false)
    }
  },
}

</script>

<style scoped>

</style>