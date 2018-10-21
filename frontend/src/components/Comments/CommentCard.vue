<template>
    <PostCard
      :published="comment.published"
      :body="comment.body"
      :vote="{ upvote, downvote, likes: comment.likes, userLiked: comment.userLiked, disabled: !authenticated }"
      :user="comment.user"
      :class="comment.accepted ? 'accepted' : ''"
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
      const value = comment.userLiked === 1 ? 0 : 1
      if (type === 'Answer') {
        this.$store.dispatch('questions/putAnswerLikes',
          { code, id, commentID: comment.id, data: { value } })
      } else if (type === 'Reply') {
        this.$store.dispatch('reviews/putReplyLikes',
          { code, id, commentID: comment.id, data: { value } })
      }
    },
    downvote() {
      const { type, code, id, comment } = this
      const value = comment.userLiked === -1 ? 0 : -1
      if (type === 'Answer') {
        this.$store.dispatch('questions/putAnswerLikes',
          { code, id, commentID: comment.id, data: { value } })
      } else if (type === 'Reply') {
        this.$store.dispatch('reviews/putReplyLikes',
          { code, id, commentID: comment.id, data: { value } })
      }
    }
  }
}
</script>
<style>
.accepted {
  border: solid 1px var(--theme-light);
}
</style>
