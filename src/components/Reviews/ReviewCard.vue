<template>
    <PostCard
        :vote="{ upvote, downvote, userLiked, likes, disabled: !authenticated }"
        :title="title"
        :body="body"
        :user="user"
        :published="published"
        :menu="menu"
    >
    <div class="right-margin">
      <Category :recommend="recommend">
        {{ recommend ? "Recommended" : "Not Recommended" }}
      </Category>
      <Semester>{{ sessionShortName }}</Semester>
    </div>
    </PostCard>
</template>

<script>
import PostCard from '@/components/Card/Large'
import Category from '@/components/Category/Recommend'
import Semester from '@/components/Category/Semester'
import { menuInteractionsMapper } from '@/utils/helpers'
import { reportReview } from '@/utils/api/reviews'

export default {
  components: { PostCard, Category, Semester },
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
    recommend: Boolean,
    session: {
      default: 1,
      type: Number
    },
    meta: {
      canDelete: Boolean,
      canEdit: Boolean
    }
  },
  computed: {
    sessionShortName() {
      return this.$store.getters.sessions.length &&
        this.$store.getters.sessions[this.session - 1] &&
        this.$store.getters.sessions[this.session - 1].shortName
    },
    menu() {
      const thisArg = this
      return menuInteractionsMapper({
        type: 'review',
        thisArg,
        meta: this.meta
      })
    }
  },
  methods: {
    deleteReview() {
      if (!confirm('Permanently delete this review and its replies?')) {
        return
      }
      this.$store.dispatch('reviews/deleteReview', { code: this.code, id: this.id })
        .then(() => this.$router.push({ name: 'info', params: { code: this.code } }))
    },
    editReview() {
      console.warn('Edit not yet implemented')
      alert('Edit is coming soon, sorry!')
    },
    report() {
      const reason = prompt('Why should this review be removed?')
      reportReview(this.code, this.id, { reason })
        .then(() => alert('Thank you. Your report has been submitted.'))
        .catch((err) => alert(err.message))
    },
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

.right-margin > * {
  margin: 0 2.5px;
}
</style>
