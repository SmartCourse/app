<template>
    <section class="main-content">
      <div v-if="!loading">

        <!-- No review to render, show review form-->
        <div v-if="courseID">
          <ReviewForm @submitReviewForm="submitReview">
            <span class="form-failure"
              v-if="error.code">{{error.message}}
            </span>
          </ReviewForm>
        </div>

        <!-- Otherwise render the specified review-->
        <div v-else>
          <ReviewCard v-bind="review"/>

          <ReplyForm @submitCommentForm="submitReply" :type="commentType">
            <span class="form-failure"
                v-if="error.code">{{error.message}}</span>
          </ReplyForm>

          <ul v-if="replies.length">
            <li v-for="answer in replies" :key="answer.id">
              <ReplyCard :comment="answer"/>
            </li>
          </ul>
        </div>

      </div>
      <!--<LoadingSpinner v-else/>-->
    </section>
</template>

<script>
import ReviewCard from '@/components/reviews-replies/ReviewCard'
import ReviewForm from '@/components/reviews-replies/ReviewForm'
import ReplyCard from '@/components/comments/CommentCard'
import ReplyForm from '@/components/comments/CommentForm'
import { mapGetters } from 'vuex'

export default {
  components: {
    ReviewCard,
    ReviewForm,
    ReplyCard,
    ReplyForm
  },
  props: {
    courseID: String, // This is a query
    reviewID: String // This is a param
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
    submitReview (reviewForm) {
      // check that they actually typed something
      if (reviewForm.title === '' || reviewForm.body === '') {
        return
      }
      this.$store.dispatch('reviews/postReview',
        {
          form: reviewForm,
          id: this.courseID
        })
        .then(() => this.$router.push({ name: 'review', params: { id: String(this.review.id) } }))
        .then(() => this.$store.dispatch('reviews/getReplies', this.reviewID))
    },
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
    if (this.reviewID) {
      this.$store.dispatch('reviews/getReview', this.reviewID)
      this.$store.dispatch('reviews/getReplies', this.reviewID)
    }
  }
}
</script>
