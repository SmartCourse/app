<template>
    <section class="main-content">
      <ReviewCard v-bind="review"/>

      <ReplyForm @submitCommentForm="submitReply" :type="commentType" :callback="submitReply">
        <span class="form-failure"
            v-if="error.code">{{error.message}}</span>
      </ReplyForm>

      <transition-group name='fade' tag='ul' v-if="replies.length">
        <li v-for="answer in replies" :key="answer.id">
          <ReplyCard :comment="answer" />
        </li>
      </transition-group>
    </section>
</template>

<script>
import ReviewCard from '@/components/reviews-replies/ReviewCard'
import ReplyCard from '@/components/comments/CommentCard'
import ReplyForm from '@/components/comments/CommentForm'
import { mapGetters } from 'vuex'

export default {
  components: {
    ReviewCard,
    ReplyCard,
    ReplyForm
  },
  props: {
    id: String // This is a param
  },
  data() {
    return {
      commentType: 'Reply'
    }
  },
  computed: {
    ...mapGetters('reviews', {
      review: 'review',
      replies: 'replies',
      loading: 'loading',
      error: 'error'
    })
  },
  methods: {
    submitReply (replyForm) {
      // check that they actually typed something
      if (replyForm.body === '') {
        // this.answerFormResponse.text = "Please type an answer!"
        // this.answerFormResponse.style = {'form-success': false, 'form-failure': true}
        return
      }
      this.$store.dispatch('reviews/postReply', {form: replyForm, id: this.review.id})
    }
  },
  created () {
    this.$store.dispatch('reviews/getReview', this.id)
    this.$store.dispatch('reviews/getReplies', this.id)
  }
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 1s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
