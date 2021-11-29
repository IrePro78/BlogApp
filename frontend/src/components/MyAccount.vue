<template>
<div class = "container mt-4">
  <div v-for="article in articles" :key="article.pk">
    <p class="mb-0">Autor:
    <span class="badge bg-primary">
       {{article.author}}
    </span>

    </p>

    <h3>
      <router-link
       class="link-style"
       :to="{name:'details', params:{slug:article.slug}}"
      >{{article.title }}</router-link>
    </h3>
    <hr>
  </div>

</div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Articles',
  data() {
    return {
      articles:[]
    }
  },
  mounted() {
    this.getAllArticles()
  },
  methods: {

    async getAllArticles() {
      this.$store.commit('setIsLoading', true)
      const author = 'admin'
      await axios

          .get(`/api/v1/articles/${author}/`)
          .then(response => {
            console.log(response.data)
            this.articles = response.data
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