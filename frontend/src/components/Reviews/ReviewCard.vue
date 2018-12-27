<template>
    <PostCard
        :vote="{ upvote, downvote, userLiked, likes, disabled: !authenticated }"
        :title="title"
        :body="body"
        :user="user"
        :published="published"
    >
<<<<<<< HEAD
      <Category :recommend="recommend" class="right-margin">
        {{ recommend ? "Recommended" : "Not Recommended" }}
      </Category>
=======
      <Category :recommend="recommend">{{ recommend ? "Recommended" : "Not Recommended" }}</Category>
>>>>>>> 6067b0b906da55869d3c6fddd9503dce430ca5a7
    </PostCard>
</template>

<script>
import PostCard from '@/components/Card/Large'
<<<<<<< HEAD
import Category from '@/components/Category/Recommend'
=======
import Category from '@/components/Category'
>>>>>>> 6067b0b906da55869d3c6fddd9503dce430ca5a7

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
<<<<<<< HEAD

<style scoped>
.right-margin {
  margin-right: 20px;
}
</style>
=======
>>>>>>> 6067b0b906da55869d3c6fddd9503dce430ca5a7
