<template>
    <PostCard
      :published="comment.published"
      :body="comment.body"
      :vote="{ upvote, downvote, likes: comment.likes, userLiked: comment.userLiked, disabled: !authenticated }"
      :user="comment.user"
      :class="comment.accepted ? 'accepted' : ''"
      :menu="menu"
    >
    </PostCard>
</template>

<script>
import PostCard from '@/components/Card/Large'
import { menuInteractionsMapper } from '@/utils/helpers'

export default {
  components: { PostCard },
  props: {
    type: String,
    id: String,
    code: String,
    comment: {
      published: String,
      body: String,
      likes: Number,
      userLiked: Boolean,
      accepted: Boolean,
      user: Object,
      meta: {
        canDelete: Boolean,
        canEdit: Boolean
      }
    },
    authenticated: Boolean
  },
  computed: {
    menu() {
      const thisArg = this
      return menuInteractionsMapper({
        type: 'comment',
        thisArg,
        meta: this.comment.meta
      })
    }
  },
  methods: {
    deleteComment() {
      const { type, code, id, comment } = this
      if (!confirm(`Permanently delete this ${type === 'Answer' ? 'answer' : 'reply'}?`)) {
        return
      }
      this.$store.dispatch(`${type === 'Answer' ? 'questions' : 'reviews'}/delete${type}`, { code, id, commentID: comment.id })
    },
    editComment() {
      console.warn('Not yet implemented')
    },
    report() {
      console.warn('Not yet implemented')
    },
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
<style scoped>
.accepted {
  border: solid 1px var(--theme-light);
}
</style>
