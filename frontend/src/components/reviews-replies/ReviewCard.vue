<template>
    <Card>
        <div class="card-content">
            <Vote v-bind:likes="likes" :upvote="upvote" :downvote="downvote" />
            <div class="content">
                <!-- v-if here just stops router error due to async data -->
                <router-link v-if="code" tag="h2" :to="{ name: 'review', params: { code, id }}">
                   {{ title }}
                </router-link>
                <p>{{ body }}</p>
            </div>
            <aside class="user">
                <User :image="'https://travis-ci.com/images/logos/TravisCI-Mascot-1.png'"/>
                <p class="date">Asked: <time>{{ published }}</time></p>
            </aside>
        </div>
    </Card>
</template>

<script>
import Card from '@/components/Card'
import User from '@/components/UserSummary'
import Vote from '@/components/Vote'

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
      const { code, id } = this
      this.$store.dispatch('reviews/putLikes',
        { code, id, data: { value: 1 } })
    },
    downvote() {
      const { code, id } = this
      this.$store.dispatch('reviews/putLikes',
        { code, id, data: { value: -1 } })
    }
  }
}
</script>

<style scoped src='../../css/card.less' lang='less'>
</style>
