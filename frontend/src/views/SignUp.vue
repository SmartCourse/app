<template>
  <div class="auth-page">
    <AppAuthForm v-if="!loading"
      :title="'Sign Up'"
      :buttonText="'Sign Up'"
      :error="error"
      :clickHandler="clickHandler"
    >
      <AuthInput type="text" placeholder="Display Name"/>
      <AuthInput type="text" v-model="email" placeholder="Email"/>
      <AuthInput type="password" v-model="password" placeholder="Password"/>
    </AppAuthForm>
    <LoadingSpinner v-else/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import AppAuthForm from '@/components/Authentication/Form'
import AuthInput from '@/components/Authentication/Input'

export default {
  name: 'signup',
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
      this.$store.dispatch('auth/signUp', { email, password })
        .then(() => this.$router.push('/'))
        .catch(e => {})
    }
  },
  created() {
    this.$store.commit('auth/ERROR', '')
  }
}
</script>
