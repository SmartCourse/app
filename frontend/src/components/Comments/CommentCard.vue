<template>
    <PostCard
      :published="comment.published"
      :body="comment.body"
      :vote="{ upvote, downvote, likes: comment.likes }"
      :user="{ userID: comment.author }"
    >
    </PostCard>
</template>

<script>
import PostCard from '@/components/Card/Large'

export default {
  components: { PostCard },
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
