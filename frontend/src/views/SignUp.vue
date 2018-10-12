<template>
  <div class="auth-page">
    <AppAuthForm v-if="!loading && !isFirebaseAuthorised"
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
    <AppAuthForm v-else-if="!loading && !hasProfile"
      :title="'Create Profile'"
      :buttonText="'Create Profile'"
      :error="error"
      :clickHandler="createProfile"
      :link="{
        text: '',
        name: ''
      }"
    >
      <AuthInput spellcheck="false" type="text" v-model="displayName" placeholder="Choose a display name"/>
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
      password: '',
      displayName: ''
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
    createProfile() {
      const { displayName } = this
      this.$store.dispatch('auth/createProfile', { displayName })
    },
    reroute() {
      if (this.isLoggedIn) this.$router.push('/')
    }
  },
  created() {
    this.$store.commit('auth/ERROR', '')
  }
}
</script>
