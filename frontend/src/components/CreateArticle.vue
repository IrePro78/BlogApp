<template>
  <div class="container mt-4">
    <form @submit.prevent="insertArticle">
    <input
        type="text"
        class="form-control"
        placeholder="Please enter a title"
        v-model="title"
    />
    <br/>
    <textarea
      rows="8"
      placeholder="Please enter the text of the article: "
      class="form-control"
      v-model="body"
    >
    </textarea>
    <button class="btn btn-success mt-4">Publish</button>
    </form>

    <div v-if="error"
      class="alert alert-warning alert-dismissible fade show mt-5"
         role="alert"
      >
      <strong>{{error}}</strong>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { toast } from 'bulma-toast'

export default {
    name: 'CreateArticle',
    data() {
      return {
        title: '',
        body: '',
        error: ''
      }
    },
  methods: {
    async insertArticle() {
      this.$store.commit('setIsLoading', true)
      if(!this.title || !this.body) {
        this.error = "Please complete all fields"
      } else {
        const article = {
          title: this.title,
          body: this.body
        }
        await axios
            .post('/api/v1/articles/', article)
            .then(response => {
              toast({
                message: 'The article was added',
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