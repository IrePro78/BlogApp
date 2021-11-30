<template>
  <div class="container">
    <router-link
    :to="{name:'articledit', params:{slug:slug}}"
    class="btn btn-success mt-4 mx-2">
    Update
    </router-link>

    <button class="btn btn-danger mt-4"
            @click="deleteUser"
    >Delete
    </button>
  </div>
</template>

<script>
import axios from 'axios'

export default {

  props: {
    slug: {
      type: String,
      required: true,
    }
  },
  methods: {
    async deleteUser() {
      this.$store.commit('setIsLoading', true)
      await axios
      .delete('/api/v1/users/me/')
      .then(() => {
          this.$router.push({name: 'home'})
          })
          .catch(error => {
            console.log(error)
          })
      this.$store.commit('setIsLoading', false)
    }
  },
}

</script>

<style scoped>

</style>