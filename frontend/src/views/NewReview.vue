<template>
    <section class="main-content">
      <AppBreadCrumb/>
      <ReviewForm :callback="submitReview">
        <span class="form-failure" v-if="error.code">
          {{error.message}}
        </span>
      </ReviewForm>
    </section>
</template>

<script>
import ReviewForm from '@/components/Reviews/ReviewForm'
import { mapGetters } from 'vuex'

export default {
  components: {
    ReviewForm
  },
  props: {
    code: {
      type: String,
      required: true
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
      this.$store.dispatch('reviews/postReview',
        {
          form: reviewForm,
          code: this.code
        })
        .then(() => {
          // only navigate away if no error occurred
          if (error.code === 0) {
            this.$router.push({ name: 'review', params: { code: this.code, id: this.review.id } })
          }
        })
    }
  }
}
</script>
