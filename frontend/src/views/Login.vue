<template>
<div class="auth-page">
    <AppAuthForm v-if="!loading"
      :title="'Login'"
      :buttonText="'Login'"
      :error="error"
      :clickHandler="clickHandler"
    >
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