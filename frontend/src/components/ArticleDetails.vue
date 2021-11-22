<template>
  <div class="container mt-5">
    <h3>{{ article.title }}</h3>

    <h5 class="mt-3">Autor:
      <span class="badge bg-primary">
       {{ article.author }}
    </span>

    </h5>
    <p class="mt-3"> {{ article.body }}</p>
    <h6>{{ article.created_at }}</h6>
    <ArticleActions v-if="IsAuthor" :slug="article.slug"/>
  </div>
</template>

<script>
import axios from 'axios'
import ArticleActions from "./ArticleActions";

export default {
  components: {
    ArticleActions
  },
  data() {
    return {
      article: {},
      requestUser: '',

    }
  },

  props: {
    slug: {
      type: String,
      required: true,
    }
  },
  mounted() {
    this.getArticleData()
    this.getUser()


  },
  methods: {
    async getArticleData() {
      this.$store.commit('setIsLoading', true)
      await axios
          .get(`/api/v1/articles/${this.slug}/`)
          .then(response => {
            console.log(response.data)
            this.article = response.data
          })
          .catch(error => {
            console.log(error)
          })

    },
      getUser() {
      this.requestUser = localStorage.getItem('username')
      this.$store.commit('setIsLoading', false)
    }
  },
  computed: {
    IsAuthor() {
      return this.article.author === this.requestUser
    }
  },
}

</script>

<style scoped>

</style>
