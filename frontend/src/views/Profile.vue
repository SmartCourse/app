<template>
    <section class="main-content">
        <div class="flex-container">
          <Card class="profile">
            <transition name="fade-slide">
              <div v-if="!loading">
                <div class="header">
                  <Mini :name="user.displayName" :id="user.id" :picture="user.picture" />
                  <Name :name="user.displayName" :degree="user.degree" :reputation="user.reputation" />
                </div>
                <div>Joined: {{ user.joined }}</div>
                <div>Graduation Year: {{ user.gradYear || 2018 }}</div>
                <div>Description: <br>{{ user.description || 'No description set' }}</div>
              </div>
            </transition>

            <div style="text-align:center" v-if="loading">
              <LoadingSpinner/>
            </div>
        </Card>
        <div>
          <CardHeader>Recent Questions</CardHeader>
          <FeedCard 
            v-for="q in questions" 
            v-bind="q" 
            :key="q.id"
            />
        </div>
        </div>
    </section>
</template>

<script>
import Mini from '@/components/User/Mini'
import Name from '@/components/User/Name'
import Card from '@/components/Card'
import CardHeader from '@/components/Card/Header'
import FeedCard from '@/components/Card/Small'
import { mapGetters } from 'vuex'

export default {
  name: 'Profile',
  components: {
    Card,
    Mini,
    Name,
    FeedCard,
    CardHeader
  },
  props: {
    id: {
      type: String,
      required: true
    }
  },
  computed: {
    ...mapGetters('user', {
      user: 'userObj',
      questions: 'recentQuestions',
      loading: 'loading'
    })
  },
  created () {
    const { id } = this
    this.$store.dispatch('user/getUser', { id })
    this.$store.dispatch('user/getUserQuestions', { id })
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

.profile {
  margin: 0px 40px 40px 0;
}

.flex-container {
  margin: 20px;
  padding: 20px;
  display: flex;
  align-items: flex-start;
  justify-content: space-around;
}

@media screen and (max-width: 700px){
  .flex-container {
    padding: 0;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 10px;
  }

  .profile {
    margin: 10px 0;
  }
}

</style>
