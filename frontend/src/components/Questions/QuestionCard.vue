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
    title: String,
    body: String,
    // TODO fix
    published: String,
    authenticated: Boolean
  },
  methods: {
    upvote() {
      const { code, id } = this
      this.$store.dispatch('questions/putLikes',
        { code, id, data: { value: 1 } })
    },
    downvote() {
      const { code, id } = this
      this.$store.dispatch('questions/putLikes',
        { code, id, data: { value: -1 } })
    }
  }
}
</script>
