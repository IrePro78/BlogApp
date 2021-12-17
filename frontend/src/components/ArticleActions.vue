<template>
  <div class="container">
    <router-link
        :to="{name:'articledit', params:{slug:slug}}"
        class="btn btn-success mt-4 mx-2">
      Update
    </router-link>

    <button class="btn btn-danger mt-4"
            @click="confirmDelete"
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
    async confirmDelete() {
      this.$swal({
        title: 'Are you sure?',
        text: 'You can\'t revert your action',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, Delete!',
        cancelButtonText: 'No, Cancel!',
        reverseButtons: false
      }).then((result) => {
        if (result.isConfirmed) {
          this.$swal('Deleted', 'You successfully deleted this article', 'success')
          this.$store.commit('setIsLoading', true)

          axios
              .delete(`/api/v1/articles/${this.slug}/`)
          this.$router.push({name: 'home'})

              .catch(error => {
                console.log(error)
              })
          this.$store.commit('setIsLoading', false)
        }

      })
    }
  }
}
</script>

<style scoped>

</style>