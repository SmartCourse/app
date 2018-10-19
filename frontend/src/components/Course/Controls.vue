<template>
    <div class='options'>
        <div class="tabs">
          <slot/>
        </div>

        <AppButtonWithToolTip
          :disabled="!authenticated"
          :disabledMessage="disabledMessage"
          @click.native="$router.push({ name: routeName, params: {code} })"
        >
          {{buttonText}}
        </AppButtonWithToolTip>
    </div>
</template>

<script>
import AppButton from '@/components/AppButton'
import AppButtonWithToolTip from '@/components/AppButton/WithToolTip'

export default {
  props: {
    code: String,
    routeName: String,
    buttonText: String
  },
  components: { AppButton, AppButtonWithToolTip },
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
