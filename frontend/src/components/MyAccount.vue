<template>
  <div>
    <hr>
    <nav class="navbar navbar-light bg-light">
      <form class="container justify-content-end">
        <button @click="" class="btn btn-sm btn-outline-primary me-1">Edit profile</button>
        <button @click="" class="btn btn-sm btn-outline-primary me-1">Change password</button>
        <router-link class="btn btn-sm btn-outline-danger me-1" to="/delete">Delete account</router-link>
      </form>
    </nav>
    <hr>
  </div>

  <div class="container mt-4">
    <h4>Articles</h4>
    <hr>
    <div v-for="article in articles" :key="article.pk">
      <p class="mb-0">Autor:
        <span class="badge bg-primary">
       {{ article.author }}
    </span>
      </p>
      <h4>
        <router-link
            class="link-style"
            :to="{name:'details', params:{slug:article.slug}}"
        >{{ article.title }}
        </router-link>
      </h4>
      <hr>
    </div>


  </div>
</template>

<script>
import axios from 'axios'
import UserActions from "./UserActions";

export default {
  components: {
    UserActions
  },
  data() {
    return {
      articles: []
    }
  },
  mounted() {
    this.getMyArticles()
  },
  methods: {

    async getMyArticles() {
      this.$store.commit('setIsLoading', true)
      await axios

          .get('/api/v1/articles/')
          .then(response => {
            const myarticles = response.data
            this.articles = myarticles.filter(article =>
                article.author.includes(this.$store.state.user.username))
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

.link-style {
  font-weight: bold;
  color: black;
  text-decoration: none;
}

.link-style:hover {
  text-decoration: none;
  color: black;
}

</style>