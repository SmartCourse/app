<template>
  <div class="sign-up">
    <p>Let's create a new account !</p>
    <form>
        <input type="text" v-model="email" placeholder="Email"><br>
        <input type="password" v-model="password" placeholder="Password"><br>
        <button type="button" @click="$store.dispatch('auth/signUp', {email, password})">
            Sign Up
        </button>
        <p v-if="error">{{ error }}</p>
    </form>
    <span>Or go back to <router-link to="/login">login</router-link>.</span>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    name: 'signup',
    data() {
        return {
            email: '',
            password: ''
        }
    },
    computed: {
        ...mapGetters('auth', [ 'error' ])
    },
}
</script>

<style scoped>
  .sign-up {
     width: 50%;
    margin: 40px auto;
  }
  input {
    margin: 10px auto;
    padding: 15px;
  }
  button {
    margin-top: 10px;
    cursor: pointer;
  }
  span {
    display: block;
    margin-top: 20px;
    font-size: 11px;
  }
</style>