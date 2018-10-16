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
    author: Number,
    likes: Number,
    title: String,
    body: String,
    published: String
  },
  computed: {
    authenticated: function() {
      return this.$store.getters['auth/isLoggedIn']
    }
  },
  methods: {
    upvote() {
      const { code, id } = this
      this.$store.dispatch('reviews/putLikes',
        { code, id, data: { value: 1 } })
    },
    downvote() {
      const { code, id } = this
      this.$store.dispatch('reviews/putLikes',
        { code, id, data: { value: -1 } })
    }
  }
}
</script>

<style scoped src='../../css/card.less' lang='less'>

</style>
