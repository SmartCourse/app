<template>
  <div class="auth-page" data-view>
    <AppAuthForm v-if="!loading"
      :title="'Email Verification'"
      :buttonText="''"
      :error="error"
      :clickHandler="resendEmail"
    >
      <div v-if="!emailVerified">
        <p class="center">
          A verification email has been sent to your email address.<br>
          Please click the link in the email to verify your email, then reload this page.
        </p>
        <p class="resend-text">
          If you need to send the verification email again, click <a @click="resendEmail" class="resend-button">here</a>.
        </p>
      </div>

      <div v-else>
        <p>
          Congratulations! Your email address has been successfully verified.
        </p>
      </div>
    </AppAuthForm>

    <LoadingSpinner v-else/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import AppAuthForm from '@/components/Authentication/Form'

export default {
  name: 'verify-email',
  components: { AppAuthForm },
  data() {
    return {
      sentAgain: false
    }
  },
  computed: {
    ...mapGetters('auth', [
      'loading',
      'error',
      'isFirebaseAuthorised',
      'isLoggedIn',
      'hasProfile',
      'userAuthObject',
      'emailVerified'
    ])
  },
  // reroute whenever auth loading state changes
  watch: {
    loading() { this.reroute() }
  },
  methods: {
    resendEmail() {
      this.$store.dispatch('auth/sendEmailVerification')
    },
    reroute() {
      if (this.isLoggedIn) this.$router.push('/')
      else if (!this.isFirebaseAuthorised) this.$router.push('/login')
      else if (this.emailVerified && !this.hasProfile) this.$router.push('/create-profile')
    }
  },
  created() {
    this.$store.commit('auth/ERROR', '')
    this.reroute()
  }
}
</script>

<style scoped>
.center {
  text-align:center;
}

.resend-text {
  font:var(--body-copy-3)
}

.resend-button {
  color:var(--soft-black)
}

</style>
