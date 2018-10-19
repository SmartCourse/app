<template>
    <PostCard
        :vote="{ upvote, downvote, likes, disabled: !authenticated }"
        :title="title"
        :body="body"
        :user="user"
        :published="published"
    />
</template>

<script>
import PostCard from '@/components/Card/Large'

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
    authenticated: Boolean
  },
  methods: {
    upvote() {
      const { code, id, userLiked, user } = this
      const value = userLiked === -1 ? 0 : 1
      this.$store.dispatch('questions/putLikes',
        { code, id, data: { creatorID: user.id, value } })
    },
    downvote() {
      const { code, id, userLiked, user } = this
      const value = userLiked === 1 ? 0 : -1
      this.$store.dispatch('questions/putLikes',
        { code, id, data: { creatorID: user.id, value } })
    }
  }
}
</script>
