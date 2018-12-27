<template>
    <div class="auth-page">
        <AuthForm
            v-if="!loading"
            :clickHandler="resetPass"
            :buttonText="'Reset Password'"
            :error="error"
            >
            <p>Confirm your email address below and we'll send you a link to reset your password.</p>
            <AuthInput v-model="email" placeholder="Write your email here" />
        </AuthForm>
        <LoadingSpinner v-else/>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import AuthInput from '@/components/Authentication/Input'
import AuthForm from '@/components/Authentication/Form'

export default {
  components: {
    AuthForm,
    AuthInput
  },
  data () {
    return {
      email: ''
    }
  },
  computed: {
    ...mapGetters('auth', [ 'loading', 'error' ])
  },
  methods: {
    resetPass() {
      this.$store.dispatch('auth/sendPasswordResetEmail', { email: this.email })
    }
  }
}
</script>

<style scoped>

h3 {
    font: var(--header-2);
}

p {
    text-align: left;
}

.material-icons {
    font-size: inherit;
    display: inline-block;
    vertical-align: middle;
    transform: translateY(-4px);
}
</style>
