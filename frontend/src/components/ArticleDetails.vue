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
import {csrftoken} from "../csrf/csrf_token";
import ArticleActions from "./ArticleActions";

export default {
  components: {
    ArticleActions
  },
  data() {
    return {
      article: {},
      requestUser: null

    }
  },

  props: {
    slug: {
      type: String,
      required: true,
    }
  },
  methods: {
    getArticleData() {
      fetch(`/api/articles/${this.slug}/`, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFTOKEN': csrftoken
        }
      })
          .then(resp => resp.json())
          .then((data) => {
            this.article = data
          })
          .catch(error => console.log(error))
    },

    getUserRequest() {
      this.requestUser = localStorage.getItem("username")
    }
  },
  computed: {
    IsAuthor() {
      return this.article.author === this.requestUser
    }
  },
  created() {
    this.getArticleData()
    this.getUserRequest()
  }
}


</script>

<style scoped>

</style>
