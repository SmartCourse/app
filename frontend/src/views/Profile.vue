<template>
    <section class="main-content">
        <Card>

            <transition name="fade-slide">

              <div v-if="!loading">
                <div class="header">
                  <Mini :name="user.displayName" :id="user.id" :picture="user.picture" />
                  <Name :name="user.displayName" :degree="user.degree" :reputation="user.reputation" />
                </div>
                <div>Joined: {{ user.joined }}</div>
                <div>Graduation Year: {{ user.gradYear }}</div>
                <div>Description: <br>{{ user.description }}</div>
              </div>
            </transition>

            <div style="text-align:center" v-if="loading">
              <LoadingSpinner/>
            </div>

        </Card>
    </section>
</template>

<script>
import Mini from '@/components/User/Mini'
import Name from '@/components/User/Name'
import Card from '@/components/Card'
import { mapGetters } from 'vuex'

export default {
  name: 'Profile',
  components: {
    Card,
    Mini,
    Name
  },
  props: {
    id: String
  },
  computed: {
    ...mapGetters('user', {
      user: 'userObj',
      loading: 'loading'
    })
  },
  created () {
    this.$store.dispatch('user/getUser', { id: this.id })
  }
}
</script>

<style scoped>

.header {
    display: grid;
    grid-template-columns: 45px auto;
    grid-gap: 10px;
}

.name, .description {
    margin: 10px 0px;
}

</style>
