<template>
    <section class="main-content">

        <div class="profile">
        <Card>
            <div v-if="!loading && hasProfile">

                <figure>
                  <img class="avatar" :src="picture || '/defaultpicture.png'"/>
                </figure>
                <h2 class="name">{{ profile.displayName }}</h2>
                <h3 class="email">{{ profile.email }}</h3>
                <form class="form">
                  Degree: <AppInput spellcheck="false" type="text" v-model="degree" placeholder=""/>
                  Graduation Year: <AppInput spellcheck="false" type="text" v-model="gradYear" placeholder=""/>
                  Description: <AppInput spellcheck="false" type="textarea" v-model="description" placeholder=""/>
                  <AppButton class="button-spacing" @click.native="updateProfile()">
                      Update Profile
                  </AppButton>
                </form>

            </div>
            <div v-else-if="!loading && !hasProfile">
                <router-link :to='"/signup"'>Click here</router-link> to create a profile.
            </div>
            <LoadingSpinner v-else/>
        </Card>
        </div>

    </section>
</template>

<script>
import Card from '@/components/Card'
import AppInput from '@/components/AppInput'
import AppButton from '@/components/AppButton'
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
    ...mapGetters([ 'isLoggedIn', 'hasProfile', 'profile' ]),
    ...mapGetters('auth', [ 'loading', 'error' ])
  },
  methods: {
    updateProfile() {
    }
  },
  mounted() {
    // TODO this doesn't work if page reloaded because auth gets checked after mounting
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
    background-color: var(--theme-light);
}

.avatar {
    margin: 0;
    width: inherit;
    height: auto;
    border-radius: 100%;
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
