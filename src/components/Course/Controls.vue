<template>
    <div class='options'>
        <div class="tabs">
          <slot/>
        </div>

        <AppButtonWithToolTip
          :disabled="buttonDisabled"
          :disabledMessage="buttonDisabledMessage"
          @click.native="$router.push({ name: routeName, params: {code} })"
        >
          {{buttonText}}
        </AppButtonWithToolTip>
    </div>
</template>

<script>
import AppButtonWithToolTip from '@/components/AppButton/WithToolTip'

export default {
  props: {
    code: String,
    routeName: String,
    buttonText: String,
    buttonDisabled: Boolean,
    buttonDisabledMessage: Object
  },
  components: { AppButtonWithToolTip },
  computed: {
    authenticated() {
      return this.$store.getters['auth/isLoggedIn']
    },
    disabledMessage() {
      return {
        content: this.authenticated ? '' : 'You must be logged in to post.',
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
