<template>
  <div class="auth-page" data-view>
    <AppAuthForm v-if="!loading"
      :title="'Sign Up'"
      :buttonText="'Sign Up'"
      :error="error"
      :withGoogle="{
        callback: googleCallback,
        text: 'Or Sign Up with Google'
      }"
      :clickHandler="createAccount"
      :link="{
        text: 'Already have an account?',
        name: 'Login'
      }"
    >
      <AuthInput spellcheck="false" type="email" v-model="email" placeholder="Email"/>
      <AuthInput type="password" v-model="password" placeholder="Password"/>

      <p class="tos">
        <input type="checkbox" v-model="tos"> By clicking 'Sign Up' you are also agreeing to the SmartCourse
        <router-link :to="{name: 'terms-of-service'}" target="_blank" class="tos-link">Terms of Service</router-link> and
        <router-link :to="{name: 'privacy-policy'}" target="_blank" class="tos-link">Privacy Policy</router-link>.
      </p>

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
      tos: false
    }
  },
  components: { AppAuthForm, AuthInput },
  computed: {
    ...mapGetters('auth', [ 'loading', 'error', 'isFirebaseAuthorised', 'isLoggedIn', 'hasProfile', 'emailVerified' ])
  },
  // reroute whenever auth loading state changes
  watch: {
    loading() { this.reroute() }
  },
  methods: {
    createAccount() {
      if (!this.tos) {
        this.$store.commit('auth/ERROR', 'You must accept the terms of service to proceed.')
        return
      }
      const { email, password } = this
      this.$store.dispatch('auth/createAccount', { email, password })
    },
    reroute() {
      if (this.isLoggedIn) this.$router.push('/')
      if (this.isFirebaseAuthorised) {
        if (!this.emailVerified) this.$router.push('/verify-email')
        else if (!this.profile) this.$router.push('/create-profile')
      }
    },
    googleCallback() {
      if (!this.tos) {
        this.$store.commit('auth/ERROR', 'You must accept the terms of service to proceed.')
        return
      }

      this.$store.dispatch('auth/signInWithGoogle')
    }
  },
  beforeMount() {
    this.reroute()
  },
  created() {
    this.$store.commit('auth/ERROR', '')
  }
}
</script>

<style scoped>

.tos-link {
  text-align:right;
  color: var(--theme);
}

.tos {
  font: var(--body-copy-2);
}
</style>
