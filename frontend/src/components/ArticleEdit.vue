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
      <strong>{{error}}</strong>
    </div>
  </div>
</template>

<script>
import {csrftoken} from "../csrf/csrf_token";

export default {
  props: {
    slug: {
      type:String,
      required:true,
    }
  },

  data() {
    return {
      title: null,
      body: null,
      error: null
    }
  },

  methods: {
    updateArticle() {
     if(!this.title || !this.body) {
        this.error = "Proszę uzupełnić wszystkie pola"
      } else {

        fetch(`/api/articles/${this.slug}/`, {
        method:"PUT",
        headers:{
          'Content-Type':'application/json',
          'X-CSRFTOKEN':csrftoken
        },
        body: JSON.stringify({title:this.title, body:this.body})
      })
      .then(resp=>resp.json())
      .then(() => {
        this.$router.push('/')

      })
      .catch(error => console.log(error))
      }
    }
  },

  beforeRouteEnter(to, form, next) {
    if(to.params.slug !== undefined) {
            fetch(`/api/articles/${to.params.slug}/`, {
        method:"GET",
        headers:{
          'Content-Type':'application/json',
          'X-CSRFTOKEN':csrftoken
        }
      })
      .then(resp=>resp.json())
      .then((data) => {
        return next(vm=> (vm.title=data.title, vm.body=data.body))
        // console.log(data)
      })
    }else {
      return next()
    }
  }

}
</script>

<style scoped>

</style>