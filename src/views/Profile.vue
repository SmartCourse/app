<template>
  <section class="main-content">
      <div class="flex-container">
        <div class="profile-container">
        <CardHeader>User Profile</CardHeader>
        <Card class="profile">
          <transition name="fade-slide">
            <div v-if="!loading && user">
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
      <div v-if="user" class="posts">
        <CardHeader>Recent Questions</CardHeader>
        <ol>
          <li v-for="q in questions" :key="q.id">
<FeedCard

          v-bind="q"
          :user="user"
          cardType="Question"

          />
          </li>
        </ol>

      </div>
      </div>
  </section>
</template>

<script>

import UserSummary from '@/components/User/Summary'
import Card from '@/components/Card/Transparent'
import CardHeader from '@/components/Card/Header'
import FeedCard from '@/components/Course/FeedCard'
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
      loading: 'loading',
      error: 'error'
    })
  },
  created () {
    const { id } = this
    this.$store.dispatch('user/getUser', { id })
      .then(() => {
        if (this.error.code === 7001) {
          this.$router.push('/404')
        } else {
          this.$store.dispatch('user/getUserQuestions', { id })
        }
      })
  }
}
</script>

<style scoped>
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
  min-width: 180px;
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

.posts {
  flex: 1 auto;
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

  .profile-container, .posts {
    width: 100%;
  }
}

</style>
