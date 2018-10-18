<template>
    <PostCard
      :published="comment.published"
      :body="comment.body"
      :vote="{ upvote, downvote, likes: comment.likes, disabled: !authenticated }"
      :user="comment.user"
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
    comment: Object,
    authenticated: Boolean
  },
  methods: {
    upvote() {
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
