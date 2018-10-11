<template>
  <div class="auth-page">
    <AppAuthForm v-if="!loading"
      :title="'Sign Up'"
      :buttonText="'Sign Up'"
      :error="error"
      :clickHandler="clickHandler"
      :link="{
        text: 'Already have an account?',
        name: 'Login'
      }"
    >
      <AuthInput type="text" placeholder="Display Name"/>
      <AuthInput spellcheck="false" type="email" v-model="email" placeholder="Email"/>
      <AuthInput type="password" v-model="password" placeholder="Password"/>

      <span>
        <input type="checkbox" v-model="tos"> By signing up I agree to the
        <router-link :to="{name: 'terms-of-service'}" class="help-link">Terms of Service</router-link>
      </span>

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
    ...mapGetters('auth', [ 'error', 'loading' ])
  },
  methods: {
    clickHandler() {
      if (!this.tos) {
        this.$store.commit('auth/ERROR', 'You must accept the terms of service to proceed.')
      } else {
        const { email, password } = this
        this.$store.dispatch('auth/signUp', { email, password })
          .then(() => this.$router.push('/'))
          .catch(e => {})
      }
    }
  },
  created() {
    this.$store.commit('auth/ERROR', '')
  }
}
</script>

<style>

.help-link {
  margin: 20px 0 0;
  font: var(--body-copy-1);
  text-align:right;
  color: var(--theme);
}

</style>
