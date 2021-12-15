<template>
  <div class="container">
    <div class="columns">
      <div class="column is-4 is-offset-4">
        <h1 class="title">Edit profile</h1>

        <form @submit.prevent="changeUsername">
          <div class="field">
            <label>Username</label>
            <div class="control">
              <input type="text" name="username" class="input" v-model="username">
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

        <form>
          <div class="field">
            <label>Email</label>
            <div class="control">
              <input type="email" name="email" class="input" v-model="email">
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

export default {
  name: "ProfileEdit",
  data() {
    return {
      username: '',
      email: '',
      errors: []
    }
  },
  mounted() {
    this.getUserDetails()
  },
  methods: {

    async getUserDetails() {
      this.$store.commit('setIsLoading', true)
      this.username = this.$store.state.user.username
      this.email = this.$store.state.user.email
      this.$store.commit('setIsLoading', false)
    },

    async updateDetails() {

    }

  }

}

</script>

<style scoped>

</style>