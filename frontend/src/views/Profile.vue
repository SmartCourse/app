<template>
    <section class="main-content">
        <div class="flex-container">
          <div class="profile-container">
          <CardHeader>User Profile</CardHeader>
          <Card class="profile">
            <transition name="fade-slide">
              <div v-if="!loading">
                <UserSummary
                  :reputation="user.reputation"
                  :displayName="user.displayName"
                  :id="user.id"/>
                <div class="data-container">
                  <Field :title="'Degree'" :body="user.degree || 'B. Engineering'"/>
                  <Field :title="'Joined'" :body="user.joined"/>
                  <Field :title="'Graduation Year'" :body="user.gradYear || 2018"/>
                  <Field :title="'Description'" :body=" user.description || 'No description set'"/>
                  <!-- <p>Reputation <i class="material-icons star">star</i></p> -->
                </div>
              </div>
            </transition>

            <div style="text-align:center" v-if="loading">
              <LoadingSpinner/>
            </div>
        </Card>
        </div>
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

import UserSummary from '@/components/User/Summary'
import Card from '@/components/Card'
import CardHeader from '@/components/Card/Header'
import FeedCard from '@/components/Card/Small'
import Field from '@/components/Category/Row'

import { mapGetters } from 'vuex'

export default {
  name: 'Profile',
  components: {
    Card,
    FeedCard,
    CardHeader,
    Field,
    UserSummary
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
p {
    margin:5px 0px;
}

.star {
    font-size:15px;
}

.header {
    display: grid;
    grid-template-columns: 45px auto;
    grid-gap: 10px;
}

.name, .description {
    margin: 10px 0px;
}

.profile {
  min-width: 200px;
  margin: 0px 20px 10px 0;
}

.data-container {
    display: block;
    margin: 10px 0;
}

.flex-container {
  margin: 20px;
  display: flex;
  align-items: flex-start;
  justify-content: space-around;
}

@media screen and (max-width: 700px){
  .flex-container {
    padding: 0;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    margin: 10px;
  }

  .profile {
    min-width: auto;
    margin: 10px 0;
  }

  .profile-container {
    width: 100%;
  }
}

</style>
