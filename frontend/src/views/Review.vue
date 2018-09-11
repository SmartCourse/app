<template>
    <section class="main-content">
      <div v-if="!loading">

        <!-- No question to render, show review form-->
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
        </div>

      </div>
      <!--<LoadingSpinner v-else/>-->
    </section>
</template>

<script>
import ReviewCard from '@/components/reviews-replies/ReviewCard'
import ReviewForm from '@/components/reviews-replies/ReviewForm'
import { mapGetters } from 'vuex'

export default {
  components: {
    ReviewCard,
    ReviewForm
  },
  props: {
    courseID: String, // This is a query
    reviewID: String // This is a param
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
        .then(() =>
          this.$router.push({ name: 'review', params: { id: String(this.review.id) } }))
    }
  },
  computed: {
    ...mapGetters('reviews', {
      review: 'review',
      loading: 'loading',
      error: 'error'
    })
  },
  created () {
    if (this.reviewID) {
      this.$store.dispatch('reviews/getReview', this.reviewID)
    } else {
      // future proof (see Question.vue)
      this.$store.dispatch('reviews/resetState')
    }
  }
}
</script>
