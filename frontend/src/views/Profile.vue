<template>
    <section class="main-content">

        <div class="profile">
        <Card>
            <div v-if="!loading">

                <figure>
                  <img class="avatar" :src="picture || '/defaultpicture.png'"/>
                </figure>
                <h2 class="name">{{ profile.displayName }}</h2>
                <h3 class="email">{{ profile.email }}</h3>
                <form class="form">
                  Picture URL: <AppInput spellcheck="false" type="text" v-model="picture"/>
                  Degree: <AppInput spellcheck="false" type="text" v-model="degree"/>
                  Graduation Year: <AppInput spellcheck="false" type="text" v-model="gradYear"/>
                  Description: <textarea v-model="description"></textarea>
                  <AppButton class="button-spacing" @click.native="updateProfile()">
                      Update Profile
                  </AppButton>
                </form>

            </div>
            <LoadingSpinner v-else/>
        </Card>
        </div>

    </section>
</template>

<script>
import AppButton from '@/components/AppButton'
import AppInput from '@/components/AppInput'
import Card from '@/components/Card'
import { mapGetters } from 'vuex'

export default {
  components: { AppInput, AppButton, Card },
  data() {
    return {
      picture: '',
      degree: '',
      gradYear: '',
      description: ''
    }
  },
  computed: {
    ...mapGetters('auth', [ 'loading', 'error', 'isFirebaseAuthorised', 'isLoggedIn', 'hasProfile', 'profile' ])
  },
  watch: {
    hasProfile (oldState, newState) {
      if (this.hasProfile) {
        this.picture = this.profile.picture
        this.degree = this.profile.degree
        this.gradYear = this.profile.gradYear
        this.description = this.profile.description
      }
    },
    loading() { this.reroute() }
  },
  methods: {
    updateProfile() {
      const data = { picture: this.picture, degree: this.degree, gradYear: this.gradYear, description: this.description }
      this.$store.dispatch('auth/updateProfile', { data })
    },
    reroute() {
      if (this.isFirebaseAuthorised) {
        if (!this.hasProfile) {
          this.$router.push('/signup')
        }
      }
    }
  },
  mounted() {
    if (this.hasProfile) {
      this.picture = this.profile.picture
      this.degree = this.profile.degree
      this.gradYear = this.profile.gradYear
      this.description = this.profile.description
    }
  }
}
</script>

<style scoped>

.profile {
    text-align: center;
}

.name, .description {
    margin: 10px 0px;
}

p {
    text-align: left;
    font: inherit;
}

figure {
    border-radius: 100%;
    margin: auto;
    width: 120px;
    height: 120px;
    overflow: hidden;
    background-color: var(--theme-light);
}

.avatar {
    /* TODO make this work properly... */
    max-height:100%;
    min-width:100%;
    min-height:100%;
    /*margin-left: -50%;
    margin-top: -50%;*/
}

.form {
  text-align:left;
  font: var(--body-copy-1);
  display: grid;
  grid-auto-flow: row;
  grid-gap: 20px;
}

.button-spacing {
  width: 80%;
  margin: auto;
  margin-top: 30px;
}
</style>
