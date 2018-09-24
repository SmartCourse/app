<template>
<div class="main-content">
    <AppAuthForm
      :title="'Login'"
      :buttonText="'Login'"
      :error="error"
      :clickHandler="clickHandler"
    >
      <input class="auth-input" type="text" v-model="email" placeholder="Email">
      <input class="auth-input" type="password" v-model="password" placeholder="Password">
    </AppAuthForm>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
import AppAuthForm from '@/components/AppAuthForm'

export default {
  name: 'login',
  data: function() {
    return {
      email: '',
      password: ''
    }
  },
  components: { AppAuthForm },
  computed: {
    ...mapGetters('auth', ['error'])
  },
  methods: {
    clickHandler() {
      const { email, password } = this
      this.$store.dispatch('auth/signIn', {email, password})
        .then(() => this.$router.push('/'))
    }
  },
  created() {
    this.$store.commit('auth/ERROR', '')
  }
}
</script>

<style scoped>
.auth-input {
  font: inherit;
  display: block;
  margin: 10px 0;
  padding: 10px 0;
  border-style: none;
  border-bottom: 1px solid var(--color-light-gray);
}
</style>
