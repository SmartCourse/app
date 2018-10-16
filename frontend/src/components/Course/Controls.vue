<template>
    <div class='options'>
        <div class="tabs">
            <slot/>
        </div>
        <router-link :to="{ name: routeName, params: {code} }">
            <AppButton :disabled="!(authenticated)" :hover="hover">{{buttonText}}</AppButton>
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
    hover: function() {
      return 'TROLOLOL'
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
