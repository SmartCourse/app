<template>
    <Card>
        <div class="card-content">
            <Vote v-bind:likes="comment.likes" :upvote="upvote" :downvote="downvote" />
            <div class="content">
                <p>{{ comment.body }}</p>
            </div>
            <aside class="user">
                <User :image="'https://travis-ci.com/images/logos/TravisCI-Mascot-3.png'"/>
                <!-- Fix me later -->
                <p class="date">Posted: <time>{{ comment.published }}</time></p>
            </aside>
        </div>
    </Card>
</template>

<script>
import Card from '@/components/Card'
import User from '@/components/User'
import Vote from '@/components/Vote'

export default {
  components: { Card, User, Vote },
  props: {
    type: String,
    id: String,
    code: String,
    comment: Object
  },
  methods: {
    upvote() {
      const authState = this.$store.getters['auth/isLoggedIn']
      if (!authState) {
        this.$router.push('/login')
        return
      }

      const { type, code, id, comment } = this
      if (type === 'Answer') {
        this.$store.dispatch('questions/putAnswerLikes',
          { code, id, commentID: comment.id, data: { value: 1 } })
      } else if (type === 'Reply') {
        this.$store.dispatch('reviews/putReplyLikes',
          { code, id, commentID: comment.id, data: { value: 1 } })
      }
    },
    downvote() {
      const authState = this.$store.getters['auth/isLoggedIn']
      if (!authState) {
        this.$router.push('/login')
        return
      }
      const { type, code, id, comment } = this
      if (type === 'Answer') {
        this.$store.dispatch('questions/putAnswerLikes',
          { code, id, commentID: comment.id, data: { value: -1 } })
      } else if (type === 'Reply') {
        this.$store.dispatch('reviews/putReplyLikes',
          { code, id, commentID: comment.id, data: { value: -1 } })
      }
    }
  }
}
</script>

<style scoped src='../../css/card.less' lang='less'>
</style>
