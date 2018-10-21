<template>
  <div class="auth-page">
    <AppAuthForm v-if="!loading"
      :title="'Create Profile'"
      :buttonText="'Create Profile'"
      :error="error"
      :clickHandler="createProfile"
    >
      <AuthInput   spellcheck="false" type="text" v-model="displayName" placeholder="Choose a display name"/>
      <AuthSelect  spellcheck="false" type="text" v-model="degree" :items="degrees" placeholder="Select your degree"/>
      <AuthSelect  spellcheck="false" type="text" v-model="year" placeholder="Select your gradutation year"/>
    </AppAuthForm>
    <LoadingSpinner v-else/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import AppAuthForm from '@/components/Authentication/Form'
import AuthInput from '@/components/Authentication/Input'
import AuthSelect from '@/components/Authentication/Select'

export default {
  name: 'createprofile',
  data() {
    return {
      displayName: '',
      degree: '',
      year: 2018
    }
  },
  components: { AppAuthForm, AuthInput, AuthSelect },
  computed: {
    ...mapGetters('auth', [ 'loading', 'error', 'isFirebaseAuthorised', 'isLoggedIn', 'hasProfile' ]),
    degrees() {
      return this.$store.getters.degrees.map(d => d.name)
    }
  },
  // reroute whenever auth loading state changes
  /*
  watch: {
    loading() { this.reroute() }
  },
  */
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
