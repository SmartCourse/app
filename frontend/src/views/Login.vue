<template>
<div class="auth-page">
    <AppAuthForm v-if="!loading"
      :title="'Login'"
      :buttonText="'Log In'"
      :flavour="'Welcome back.'"
      :error="error"
      :clickHandler="clickHandler"
      :link="{
        text: 'Forgot your password?',
        name: 'Forgot Password'
      }">
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
  name: 'login',
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
    clickHandler() {
      const { email, password } = this
      this.$store.dispatch('auth/signIn', { email, password })
    },
    reroute() {
      // we need to check the store to determine state
      if (this.isFirebaseAuthorised) {
        if (this.hasProfile) {
          this.$router.push('/')
        } else {
          this.$router.push('/create-profile')
        }
      }
    }
  },
  created() {
    this.$store.commit('auth/ERROR', '')
  }
}
</script>
