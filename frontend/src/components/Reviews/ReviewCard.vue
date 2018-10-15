<template>
    <Card>
        <div class="card-content">
            <Vote :likes="likes" :upvote="upvote" :downvote="downvote" />
            <div class="content">
                <!-- v-if here just stops router error due to async data -->
                <router-link v-if="code" :to="{ name: 'review', params: { code, id }}">
                    <CardHeader>{{ title }}</CardHeader>
                </router-link>
                <p>{{ body }}</p>
            </div>
            <aside class="user">
                <User :image="'https://travis-ci.com/images/logos/TravisCI-Mascot-1.png'"/>
                <!-- Fix me later -->
                <p  class="date">Posted: <time>{{ published }}</time></p>
            </aside>
        </div>
    </Card>
</template>

<script>
import Card from '@/components/Card'
import User from '@/components/User'
import Vote from '@/components/Vote'
import CardHeader from '@/components/Card/Header'

export default {
  components: { Card, User, Vote, CardHeader },
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
