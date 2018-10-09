<template>
  <div class="auth-page">
    <AppAuthForm v-if="!loading && !isLoggedIn"
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
    <AppAuthForm v-else-if="!loading && isLoggedIn && !hasProfile"
      :title="'Complete Sign up'"
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
    <div v-else-if="!loading">
        You are already signed in.
    </div>
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
    ...mapGetters('auth', [ 'error', 'loading' ]),
    ...mapGetters([ 'isLoggedIn', 'hasProfile', 'authObject' ])
  },
  methods: {
    createAccount() {
      const { email, password } = this
      this.$store.dispatch('auth/createAccount', { email, password })
        .catch(e => {})
    },
    createProfile() {
      const { displayName } = this
      this.$store.dispatch('auth/createProfile', { user: this.authObject, displayName })
        .then(this.$router.push('/'))
        .catch(e => {})
    }
  },
  created() {
    this.$store.commit('auth/ERROR', '')
  }
}
</script>
