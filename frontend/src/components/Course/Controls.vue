<template>
    <div class='options'>
        <div class="tabs">
            <slot/>
        </div>
        <router-link :to="{ name: routeName, params: {code} }">
            <AppButtonWithToolTip 
              :disabled="!authenticated" 
              :disabledMessage="disabledMessage"
            >
              {{buttonText}}
            </AppButtonWithToolTip>
        </router-link>
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
    }
  },
  data() {
    return {
      disabledMessage: {
        content: 'You must be logged in to post.',
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
