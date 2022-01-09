<template>
  <div class="container mt-5">
    <div class="columns">
      <div class="column is-4 is-offset-4">
        <h1 class="title">Edit profile</h1>
        <form @submit.prevent="changeUsername">
          <div class="field">
            <label>Username</label>
            <div class="control ">
              <input type="text" name="username" class="input" v-model="username">
            </div>
          </div>
          <div class="notification is-danger" v-if="errors1.length">
            <p v-for="error_username in errors1" v-bind:key="error_username">{{ error_username }}</p>
          </div>
          <div class="field">
            <div class="control">
              <button class="button is-success">Submit</button>
            </div>
          </div>
        </form>

        <form @submit.prevent="changeEmail">
          <div class="field mt-4">
            <label>Email</label>
            <div class="control">
              <input type="email" name="email" class="input" v-model="email">
            </div>
          </div>
          <div class="notification is-danger" v-if="errors2.length">
            <p v-for="error_email in errors2" v-bind:key="error_email">{{ error_email }}</p>
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
  name: "ProfileEdit",
  data() {
    return {
      username: '',
      email: '',
      errors1: [],
      errors2: [],
    }
  },
  mounted() {
    this.getUserDetails()
  },

  methods: {
    async changeEmail() {
      this.errors2 = []
      if (this.email === '') {
        this.errors2.push('The email address is missing')
      }
      if (this.email === this.$store.state.user.email) {
        this.errors2.push('The new email is the same')
      }
      if (!this.errors2.length) {
        this.$store.commit('setIsLoading', true)
        const email = {
          email: this.email
        }
        await axios
            .patch('/api/v1/users/me/', email)
            .then(response => {
              console.log(response)
              toast({
                message: 'The address email was updated',
                type: 'is-success',
                dismissible: true,
                pauseOnHover: true,
                duration: 2000,
                position: 'bottom-right',
              })
              this.$store.commit('setUser', {
                'userid': response.data.id,
                'username': response.data.username,
                'email': response.data.email,
                'date_joined': response.data.date_joined,
              })
              localStorage.setItem('email', this.email)
            })
            .catch(error => {
              console.log(error)
            })
        this.$store.commit('setIsLoading', false)
      }
    },

    async changeUsername() {
      this.errors1 = []
      if (this.username === '') {
        this.errors1.push('The username is missing')
      }
      if (!this.errors1.length) {
        const {value: password} = await this.$swal({
          title: 'Do you change your name?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Submit',
          cancelButtonText: 'Cancel',
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
          const username = {
            new_username: this.username,
            current_password: password
          }
          await axios
              .post('/api/v1/users/set_username/', username)
              .then(response => {
                console.log(response)
                this.$store.commit('setUser', {
                  'userid': localStorage.getItem('userid'),
                  'username': this.username,
                  'email': localStorage.getItem('email'),
                  'date_joined': localStorage.getItem('date_joined'),
                })
                localStorage.setItem('username', this.username)
              })
              .catch(error => {
                if (error.response.status === 400) {
                  this.$swal('Wrong password', 'Please enter the correct password', 'error')
                }
                console.log(error)
              })
          this.$store.commit('setIsLoading', false)
        } else if (password === '') {
          this.$swal('Wrong password', 'Password cannot be empty', 'error')
        }
      }
    },

    async getUserDetails() {
      this.$store.commit('setIsLoading', true)
      this.username = this.$store.state.user.username
      this.email = this.$store.state.user.email
      this.$store.commit('setIsLoading', false)
    }

  }
}
</script>

<style scoped>

</style>