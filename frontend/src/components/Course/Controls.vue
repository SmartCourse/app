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
<<<<<<< HEAD
=======
import AppButton from '@/components/AppButton'
>>>>>>> 6067b0b906da55869d3c6fddd9503dce430ca5a7
import AppButtonWithToolTip from '@/components/AppButton/WithToolTip'

export default {
  props: {
    code: String,
    routeName: String,
    buttonText: String
  },
<<<<<<< HEAD
  components: { AppButtonWithToolTip },
=======
  components: { AppButton, AppButtonWithToolTip },
>>>>>>> 6067b0b906da55869d3c6fddd9503dce430ca5a7
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
