<template>
    <PostCard
        :vote="{ upvote, downvote, userLiked, likes, disabled: !authenticated }"
        :title="title"
        :body="body"
        :user="user"
        :published="published"
    >
      <Category :recommend="recommend" class="right-margin">
        {{ recommend ? "Recommended" : "Not Recommended" }}
      </Category>
    </PostCard>
</template>

<script>
import PostCard from '@/components/Card/Large'
import Category from '@/components/Category/Recommend'

export default {
  components: { PostCard, Category },
  props: {
    code: String,
    id: String,
    user: Object,
    likes: Number,
    userLiked: Number,
    title: String,
    body: String,
    published: String,
    authenticated: Boolean,
    recommend: Boolean
  },
  methods: {
    upvote() {
      const { code, id, userLiked } = this
      const value = userLiked === 1 ? 0 : 1
      this.$store.dispatch('reviews/putLikes',
        { code, id, data: { value } })
    },
    downvote() {
      const { code, id, userLiked } = this
      const value = userLiked === -1 ? 0 : -1
      this.$store.dispatch('reviews/putLikes',
        { code, id, data: { value } })
    }
  }
}
</script>

<style scoped>
.right-margin {
  margin-right: 20px;
}
</style>
