<template>
  <div class="container justify-content-end">


    <router-link class="btn btn-sm btn-outline-dark me-1" to="/profile-edit">Edit profile</router-link>
    <router-link class="btn btn-sm btn-outline-success me-1" to="/change-password">Change password</router-link>
    <button class="btn btn-sm btn-outline-danger me-1" @click="deleteUser">Delete account</button>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  methods: {
    async deleteUser() {

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
        this.$store.commit('setIsLoading', true)
        await axios
            .delete('/api/v1/users/me/', {
              data: {
                current_password: password
              }
            })
            .then(response => {
              this.$swal('Deleted', 'Your account has been deleted', 'success')
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
                this.$swal('Wrong password', 'Please enter the correct password', 'error')
              }
              console.log(error)
            })

        this.$store.commit('setIsLoading', false)
      } else if(password === '') {
        this.$swal('Wrong password', 'Please enter the correct password', 'error')
      }
    }
  }
}
</script>

<style scoped>

</style>