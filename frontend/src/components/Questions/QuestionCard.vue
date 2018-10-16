<template>
    <PostCard
        :vote="{ upvote, downvote, likes }"
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
    // TODO fix author, should be a prepopulated user object
    author: Number,
    likes: Number,
    title: String,
    body: String,
    // TODO fix
    published: String
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
