<template>
    <section class="main-content">

        <TransparentCard>

          <div class="profile">

            <transition name="fade-slide">

              <div v-if="!loading">

                <div class="profile-header">
                  <Mini :name="profile.displayName" :id="profile.id" :picture="''"/>
                  <h2 class="name">{{ profile.displayName }}</h2>
                </div>

                <form class="form">
                  <p>Email: </p><p class="email">{{ profile.email }}</p>
                  <p>Degree: </p><AuthSelect  spellcheck="false" type="text" v-model="degree" :items="degrees" placeholder="Select your degree"/>
                  <p>Graduation Year: </p><AuthSelect  spellcheck="false" type="text" v-model="gradYear" :items="years" placeholder="Select your gradutation year"/>
                  <p>Description:</p> <textarea v-model="description"></textarea>
                </form>
                <div class="button-spacing">
                  <AppButton @click.native="updateProfile()" v-if="!loading">
                      Update Profile
                  </AppButton>
                </div>

              </div>
            </transition>

            <div style="text-align:center;height:100vh;margin-top:20vh;" v-if="loading">
              <LoadingSpinner/>
            </div>

          </div>
        </TransparentCard>

    </section>
</template>

<script>
import AppButton from '@/components/AppButton'
import AppInput from '@/components/AppInput'
import TransparentCard from '@/components/Card/Transparent'
import Mini from '@/components/User/Mini'
import Reputation from '@/components/User/Reputation'
import AuthSelect from '@/components/Authentication/Select'
import { mapGetters } from 'vuex'

export default {
  components: { AppInput, AppButton, TransparentCard, Mini, Reputation, AuthSelect },
  data() {
    return {
      degree: '',
      gradYear: '',
      description: ''
    }
  },
  computed: {
    ...mapGetters('auth', [ 'loading', 'error', 'isFirebaseAuthorised', 'isLoggedIn', 'hasProfile', 'profile' ]),
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
          this.$router.push('/create-profile')
        }
      } else {
        this.$router.push('/login')
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
h2 {
    margin:0px;
}
p {
    margin:10px 0px;
}

.profile-header {
    display:flex;
    align-items: center;
    margin-bottom:10px;
}

.profile-header > * {
    margin-right: 10px;
}

.profile {
    margin:15px;
}

.form {
    text-align:left;
    font: var(--body-copy-1);
    display: grid;
    grid-template-columns: 150px auto;
    grid-gap: 15px;
    padding:5px;
}

.form-border {
    border:1px solid var(--color-gray);
}

.button-spacing {
    text-align: right;
    margin: auto;
    margin-top: 20px;
}

@media screen and (max-width: 600px) {
  .form {
    grid-template-columns: 1fr;
  }
}
</style>
