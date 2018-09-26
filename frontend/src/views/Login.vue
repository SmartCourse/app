<template>
<div class="auth-page">
    <AppAuthForm v-if="!loading"
      :title="'Login'"
      :buttonText="'Login'"
      :error="error"
      :clickHandler="clickHandler"
    >
      <input class="auth-input" type="text" v-model="email" placeholder="Email">
      <input class="auth-input" type="password" v-model="password" placeholder="Password">
    </AppAuthForm>
    <LoadingSpinner v-else/>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
import AppAuthForm from '@/components/AppAuthForm'

export default {
  name: 'login',
  data() {
    return {
      email: '',
      password: ''
    }
  },
  components: { AppAuthForm },
  computed: {
    ...mapGetters('auth', [ 'error', 'loading' ])
  },
  methods: {
    clickHandler() {
      const { email, password } = this
      this.$store.dispatch('auth/signIn', {email, password})
        .then(() => this.$router.push('/'))
        .catch(e => {})
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
