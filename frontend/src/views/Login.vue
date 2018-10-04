<template>
<div class="auth-page">
    <AppAuthForm v-if="!loading"
      :title="'Login'"
      :buttonText="'Log In'"
      :error="error"
      :clickHandler="clickHandler"
    >
      <AuthInput spellcheck="false" type="email" v-model="email" placeholder="Email"/>
      <AuthInput type="password" v-model="password" placeholder="Password"/>
      <a class="forgot-pass">Forgot your password?</a>
    </AppAuthForm>
    <LoadingSpinner v-else/>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
import AppAuthForm from '@/components/Authentication/Form'
import AuthInput from '@/components/Authentication/Input'

export default {
  name: 'login',
  data() {
    return {
      email: '',
      password: ''
    }
  },
  components: { AppAuthForm, AuthInput },
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

.forgot-pass {
  margin: 20px 0 0;
  font: var(--body-copy-2);
  text-align:right;
}

</style>
