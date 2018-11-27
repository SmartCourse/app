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
      <AuthSelect  spellcheck="false" type="text" v-model="gradYear" :items="years" placeholder="Select your gradutation year"/>
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
      gradYear: ''
    }
  },
  components: { AppAuthForm, AuthInput, AuthSelect },
  computed: {
    ...mapGetters('auth', [ 'loading', 'error', 'isFirebaseAuthorised', 'isLoggedIn', 'hasProfile' ]),
    degrees() {
      return this.$store.getters.degrees.map(d => d.name)
    },
    years() {
      const startYear = 1970
      // TODO fix this hack to get us there
      return Array(60).fill(null).map((_, i) => startYear + i).reverse()
    }
  },

  watch: {
    // TODO fix this at route level in future
    loading() { this.reroute() }
  },
  methods: {
    createProfile() {
      const { displayName, degree, gradYear } = this
      if (!(displayName && degree && gradYear)) {
        this.$store.commit('auth/ERROR', 'Please fill in all fields to finish your account creation.')
        return
      }

      this.$store.dispatch('auth/createProfile', { displayName, degree, gradYear })
    },
    reroute() {
      if (this.isLoggedIn) this.$router.push('/subject')
      else if (!this.isFirebaseAuthorised) this.$router.push('/signup')
    }
  },
  created() {
    this.$store.commit('auth/ERROR', '')
  }
}
</script>
