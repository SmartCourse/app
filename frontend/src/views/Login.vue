<template>
  <div class="login">
    <h3>Sign In</h3>
    <input type="text" v-model="email" placeholder="Email"><br>
    <input type="password" v-model="password" placeholder="Password"><br>
    <button type="button" @click="$store.dispatch('auth/login', {email, password})">
        Login
    </button>
    <p v-if="error">{{ error }}</p>
    <p>You don't have an account ? You can <router-link to="/signup">create one</router-link></p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'login',
  data: function() {
    return {
      email: '',
      password: ''
    }
  },
  computed: {
    ...mapGetters('auth', ['error'])
  }
}
</script>


<style scoped>
/* "scoped" attribute limit the CSS to this component only */
.login {
  width: 50%;
  margin: 40px auto;
}
input {
  margin: 10px 0;
  padding: 15px;
}
button {
  margin-top: 20px;
  cursor: pointer;
}
p {
  margin-top: 40px;
  font-size: 13px;
}
p a {
  text-decoration: underline;
  cursor: pointer;
}
</style>