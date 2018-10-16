<template>
  <div class="auth-page">
    <AppAuthForm v-if="!loading"
      :title="'Sign Up'"
      :buttonText="'Sign Up'"
      :error="error"
      :clickHandler="createAccount"
      :link="{
        text: 'Already have an account?',
        name: 'Login'
      }"
    >
      <AuthInput spellcheck="false" type="email" v-model="email" placeholder="Email"/>
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
    ...mapGetters('auth', [ 'loading', 'error', 'isFirebaseAuthorised', 'isLoggedIn', 'hasProfile' ])
  },
  // reroute whenever auth loading state changes
  watch: {
    loading() { this.reroute() }
  },
  methods: {
    createAccount() {
      const { email, password } = this
      this.$store.dispatch('auth/createAccount', { email, password })
    },
    reroute() {
      if (this.isLoggedIn) this.$router.push('/')
      if (this.isFirebaseAuthorised && !this.hasProfile) this.$router.push('/create-profile')
    }
  },
  created() {
    this.$store.commit('auth/ERROR', '')
  }
}
</script>
