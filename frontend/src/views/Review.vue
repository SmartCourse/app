<template>
    <section class="q">
      <div v-if="!loading">

        <ReviewCard :review="review"/>

      </div>
      <!--<LoadingSpinner v-else/>-->
    </section>
</template>

<script>
import ReviewCard from '@/components/reviews-replies/ReviewCard'
import { mapGetters } from 'vuex'

export default {
  components: {
    ReviewCard
  },
  props: {
    id: String
  },
  computed: {
    ...mapGetters('reviews', {
      review: 'review',
      loading: 'loading',
      error: 'error'
    })
  },
  created () {
    this.$store.dispatch('reviews/getReview', this.id)
  }
}
</script>