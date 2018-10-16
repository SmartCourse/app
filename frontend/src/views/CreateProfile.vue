<template>
  <div class="auth-page">
    <AppAuthForm v-if="!loading"
      :title="'Create Profile'"
      :buttonText="'Create Profile'"
      :error="error"
      :clickHandler="createProfile"
      :link="{
        text: '',
        name: ''
      }"
    >
      <AuthInput spellcheck="false" type="text" v-model="displayName" placeholder="Choose a display name"/>
    </AppAuthForm>
    <LoadingSpinner v-else/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import AppAuthForm from '@/components/Authentication/Form'
import AuthInput from '@/components/Authentication/Input'

export default {
  name: 'createprofile',
  data() {
    return {
      displayName: ''
    }
  },
  components: { AppAuthForm, AuthInput },
  computed: {
    ...mapGetters('auth', [ 'loading', 'error', 'isFirebaseAuthorised', 'isLoggedIn', 'hasProfile' ])
  },
  // reroute whenever auth loading state changes
  watch: {
    loading() { this.reroute() }
  },
  methods: {
    createProfile() {
      const { displayName } = this
      this.$store.dispatch('auth/createProfile', { displayName })
    },
    reroute() {
      if (this.isLoggedIn) this.$router.push('/')
      else if (!this.isFirebaseAuthorised) this.$router.push('/signup')
    }
  },
  created() {
    this.$store.commit('auth/ERROR', '')
  }
}
</script>
