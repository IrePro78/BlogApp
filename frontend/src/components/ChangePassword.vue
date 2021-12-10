<template>
  <div class="container">
    <div class="columns">
      <div class="column is-4 is-offset-4">
        <h1 class="title">Change password</h1>

        <form @submit.prevent="changePassword">
          <div class="field">
            <label>Current Password</label>
            <div class="control">
              <input type="password" name="current_password" class="input" v-model="current_password">
            </div>
          </div>

          <div class="field">
            <label>New Password</label>
            <div class="control">
              <input type="password" name="new_password" class="input" v-model="new_password">
            </div>
          </div>

          <div class="notification is-danger" v-if="errors.length">
            <p v-for="error in errors" v-bind:key="error">{{ error }}</p>
          </div>

          <div class="field">
            <div class="control">
              <button class="button is-success">Submit</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import {toast} from "bulma-toast";

export default {
  name: "ChangePassword",
  data() {
    return {
      current_password: '',
      new_password: '',
      errors: []
    }
  },
  methods: {
    async changePassword() {
      this.errors = []
      if (this.current_password === '') {
        this.errors.push('The current password is missing')
      }
      if (this.new_password === '') {
        this.errors.push('The new password is missing')
      }
      if (this.current_password !== this.$store.state.user.password) {
        this.errors.push('The current password are not matching')
      }
      if (!this.errors.length) {
        this.$store.commit('setIsLoading', true)
        const formData = {
          current_password: this.current_password,
          new_password: this.new_password
        }
        console.log(formData)
        await axios
            .post('http://localhost:8000/api/v1/users/set_password/', formData)
            .then(response => {
              console.log(response.data)
              this.$store.commit('setUser', {
                'password': this.new_password
              })
              toast({
                message: 'Password was changed, please log in again',
                type: 'is-success',
                dismissible: true,
                pauseOnHover: true,
                duration: 2000,
                position: 'bottom-right',
              })
              this.$router.push('/my-account')
            })
            .catch(error => {
              console.log(JSON.stringify(error))
            })
        this.$store.commit('setIsLoading', false)
      }
    }
  }
}
</script>

<style scoped>

</style>