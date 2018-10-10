<template>
    <div class="auth-page">
        <AuthForm
            :clickHandler="resetPass"
            :buttonText="'Reset Password'">
            <h3><i class="material-icons">warning</i> Warning </h3>
            <p>By clicking continue you will remove your previous password. This action cannot be undone.</p>
            <p>Confirm your email address below and we'll send you a link to create a new password.</p>
            <AuthInput placeholder="Write your email here" />
        </AuthForm>
    </div>
</template>

<script>

import AuthInput from '@/components/Authentication/Input'
import AuthForm from '@/components/Authentication/Form'

export default {
  components: {
    AuthForm,
    AuthInput
  },
  methods: {
    resetPass() {
      /* implement logic eventually */

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
