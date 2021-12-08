<template>
  <div>
    <hr>
    <nav class="navbar navbar-light bg-light">

        <UserActions/>

    </nav>
    <hr>
  </div>

  <div class="container mt-4 ">
    <div class="row">
      <div class="col-md-7 mt-4">
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
          <h6>{{ article.created_at }}</h6>
          <hr>
        </div>

      </div>

      <div class="col mt-4">
        <h4>User details</h4>
        <hr>

        <p><strong> User id: </strong>{{this.$store.state.user.id}}</p>
        <p><strong>Username: </strong>{{this.$store.state.user.username}}</p>
        <p><strong>Email: </strong>{{this.$store.state.user.email}}</p>
        <p><strong>Date joined: </strong>{{this.$store.state.user.date_joined}}</p>



      </div>
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