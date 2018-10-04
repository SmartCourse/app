<template>
    <Card>
        <div class="card-content">
            <Vote v-bind:likes="likes" :upvote="upvote" :downvote="downvote" />
            <div class="content">
                <!-- v-if here just stops router error due to async data -->
                <router-link v-if="code" tag="h2" :to="{ name: 'question', params: { code, id }}">
                    {{ title }}
                </router-link>
                <p>{{ body }}</p>
            </div>
            <aside class="user">
                <User :author="author" :image="'https://travis-ci.com/images/logos/TravisCI-Mascot-1.png'"/>
                <p class="date">Asked: <time>{{ published }}</time></p>
            </aside>
        </div>
    </Card>
</template>

<script>
import Card from '@/components/Card'
import User from '@/components/UserSummary'
import Vote from '@/components/Vote'
import { mapGetters } from 'vuex'

export default {
  components: { Card, User, Vote },
  props: {
    code: String,
    id: String,
    author: Number,
    likes: Number,
    title: String,
    body: String,
    published: String
  },
  methods: {
    upvote() {
      this.$store.dispatch('questions/putLikes',
      // TODO - REMOVE USER ID FROM HERE
        { code: this.code, id: this.id, data: { userID: 1, value: 1 } })
    },
    downvote() {
      const newLikes = this.likes - 1
      // TODO - REMOVE USER ID FROM HERE
      this.$store.dispatch('questions/putLikes', 
        { code: this.code, id: this.id, data: { userID: 1, value: -1 } })
    }
  }
}
</script>

<style scoped src='../../css/card.less' lang='less'>
</style>
