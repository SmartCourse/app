<template>
    <Card>
        <div class="card-content">
            <Vote v-bind:likes="comment.likes" :upvote="upvote" :downvote="downvote" />
            <div class="content">
                <p>{{ comment.body }}</p>
            </div>
            <aside class="user">
                <User :image="'https://travis-ci.com/images/logos/TravisCI-Mascot-3.png'"/>
                <p class="date">Posted: <time>{{ comment.published }}</time></p>
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
    type: String,
    id: String,
    code: String,
    comment: Object
  },
  methods: {
    upvote() {
      // TODO - REMOVE USER ID FROM HERE
      if (this.type === 'Answer') {
        this.$store.dispatch('questions/putAnswerLikes',
          { code: this.code, id: this.id, commentID: this.comment.id, data: { userID: 1, value: 1 } })
      } else if (this.type === 'Reply') {
        this.$store.dispatch('reviews/putReplyLikes',
          { code: this.code, id: this.id, commentID: this.comment.id, data: { userID: 1, value: 1 } })
      }
    },
    downvote() {
      // TODO - REMOVE USER ID FROM HERE
      if (this.type === 'Answer') {
        this.$store.dispatch('questions/putAnswerLikes',
          { code: this.code, id: this.id, commentID: this.comment.id, data: { userID: 1, value: -1 } })
      } else if (this.type === 'Reply') {
        this.$store.dispatch('reviews/putReplyLikes',
          { code: this.code, id: this.id, commentID: this.comment.id, data: { userID: 1, value: -1 } })
      }
    }
  }
}
</script>

<style scoped src='../../css/card.less' lang='less'>
</style>
