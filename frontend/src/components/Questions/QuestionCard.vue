<template>
    <PostCard
        :vote="{ upvote, downvote, userLiked, likes, disabled: !authenticated }"
        :title="title"
        :body="body"
        :user="user"
        :published="published"
        :menu="menu"
    />
</template>

<script>
import PostCard from '@/components/Card/Large'
import { menuInteractionsMapper } from '@/utils/helpers'

export default {
  components: { PostCard },
  props: {
    code: String,
    id: String,
    user: Object,
    likes: Number,
    userLiked: Number,
    title: String,
    body: String,
    // TODO fix
    published: String,
    authenticated: Boolean,
    meta: {
      canDelete: Boolean,
      canEdit: Boolean
    }
  },
  computed: {
    menu() {
      const thisArg = this
      return menuInteractionsMapper({
        type: 'question',
        thisArg,
        meta: this.meta
      })
    }
  },
  // TODO worried this should live at view level
  methods: {
    deleteQuestion() {
      if (!confirm('Permanently delete this question and its answers?')) {
        return
      }
      this.$store.dispatch('questions/deleteQuestion', { code: this.code, id: this.id })
        .then(() => this.$router.push({ name: 'questions', params: { code: this.code } }))
    },
    editQuestion() {
      console.warn('Edit not implemented')
    },
    report() {
      console.warn('Report not implemented')
    },
    upvote() {
      const { code, id, userLiked } = this
      const value = userLiked === 1 ? 0 : 1
      this.$store.dispatch('questions/putLikes',
        { code, id, data: { value } })
    },
    downvote() {
      const { code, id, userLiked } = this
      const value = userLiked === -1 ? 0 : -1
      this.$store.dispatch('questions/putLikes',
        { code, id, data: { value } })
    }
  }
}
</script>
