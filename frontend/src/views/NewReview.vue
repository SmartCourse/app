<template>
    <section class="main-content">
      <ReviewForm :callback="submitReview">
        <span class="form-failure" v-if="error.code">
          {{error.message}}
        </span>
      </ReviewForm>
    </section>
</template>

<script>
import ReviewForm from '@/components/reviews-replies/ReviewForm'
import { mapGetters } from 'vuex'

export default {
  components: {
    ReviewForm
  },
  props: {
    courseID: String // This is a query
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
    }
  }
}
</script>
