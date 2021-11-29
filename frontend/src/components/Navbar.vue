<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container">
      <router-link class="navbar-brand" to="/">BlogApp</router-link>
      <div class="collapse navbar-collapse" id="navbarNav">

        <ul class="navbar-nav ms-auto">
          <!--            <li class="nav-item">-->
          <li class="navbar-text me-5" v-if="this.$store.state.isAuthenticated">
            Logged in {{ this.$store.state.user.username }}
          </li>

          <li class="nav-item">
            <router-link class="btn btn-primary me-1" to="/">Home</router-link>
          </li>

          <li class="nav-item ">
            <template v-if="!this.$store.state.isAuthenticated">
              <router-link class="btn btn-primary me-1" to="/log-in">Login</router-link>
              <router-link class="btn btn-success me-1" to="/sign-up">Create Account</router-link>
            </template>
            <template v-else>
              <router-link class="btn btn-success me-1" to="/create">Create Article</router-link>
              <router-link class="btn btn-success me-1" to="/my-account">MyAccount</router-link>
              <router-link class="btn btn-outline-danger" to="/log-out">Logout</router-link>
            </template>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Navbar"
}
</script>

<style scoped>

</style>