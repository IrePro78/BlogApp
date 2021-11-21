<template>
  <div class="container mt-4">
    <form @submit.prevent="updateArticle">
      <input
          type="text"
          class="form-control"
          placeholder="Proszę wpisać tytuł"
          v-model="title"
      />
      <br/>
      <textarea
          rows="8"
          placeholder="Proszę wpisać treść artykułu: "
          class="form-control"
          v-model="body"
      >
    </textarea>
      <button class="btn btn-success mt-4">Edytuj artykuł</button>
    </form>

    <div v-if="error"
         class="alert alert-warning alert-dismissible fade show mt-5"
         role="alert"
    >
      <strong>{{ error }}</strong>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import {toast} from "bulma-toast";

export default {
  props: {
    slug: {
      type: String,
      required: true,
    }
  },

  data() {
    return {
      article: {}
    }
  },
  mounted() {
    this.getArticle()
    this.updateArticle()
  },
  methods: {
    async getArticle() {
      this.$store.commit('setIsLoading', true)
      await axios
          .get(`/api/v1/articles/${this.slug}/`)
          .then(response => {
            this.article = response.data
          })
          .catch(error => {
            console.log(error)
          })
      this.$store.commit('setIsLoading', false)
    },
    async updateArticle() {
      this.$store.commit('setIsLoading', true)
      if (!this.title || !this.body) {
        this.error = "Proszę uzupełnić wszystkie pola"
      } else {
        await axios
            .post(`/api/articles/${this.slug}/`, this.article)
            .then(response => {
              toast({
                message: 'The article was updated',
                type: 'is-success',
                dismissible: true,
                pauseOnHover: true,
                duration: 2000,
                position: 'bottom-right',
              })
              this.$router.push({name: 'home'})
            })
            .catch(error => {
              console.log(error)
            })
        this.$store.commit('setIsLoading', false)
      }
    }
  }
}

</script>

<style scoped>

</style>