<template>
<div class="main-content">
    <AppAuthForm
      :title="'Login'"
      :buttonText="'Login'"
      :error="error"
      :clickHandler="() => $store.dispatch('auth/signIn', {email, password})"
    >
      <input class="auth-input" type="text" v-model="email" placeholder="Email">
      <input class="auth-input" type="password" v-model="password" placeholder="Password">
    </AppAuthForm>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
import AppAuthForm from '@/components/AppAuthForm'

export default {
  name: 'login',
  data: function() {
    return {
      email: '',
      password: ''
    }
  },
  components: { AppAuthForm },
  computed: {
    ...mapGetters('auth', ['error'])
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
  border-bottom: var(--border);
}
</style>