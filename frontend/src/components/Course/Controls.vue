<template>
    <div class='options'>
        <div class="tabs">
            <slot/>
        </div>
        <router-link :to="{ name: routeName, params: {code} }">
            <AppButton :disabled="!(authenticated)" :disabledMsg="disabledMsg">
              {{buttonText}}
            </AppButton>
        </router-link>
    </div>
</template>

<script>
import AppButton from '@/components/AppButton'

export default {
  props: {
    code: String,
    routeName: String,
    buttonText: String
  },
  components: { AppButton },
  computed: {
    authenticated: function() {
      return this.$store.getters['auth/isLoggedIn']
    },
    disabledMsg: function() {
      return {
        content: 'You Must Be Logged In To ' + this.buttonText,
        placement: 'left'
      }
    }
  }
}
</script>

<style scoped>
.options {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
}
</style>
