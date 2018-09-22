<template>
    <div class="course-reviews">

        <div class='button-container'>
            <router-link :to="{ name: 'newReview', params: {code} }">
                <AppButton>Add Review</AppButton>
            </router-link>
        </div>

      <section class="questions">
        <ol>
          <li :key="item.id" v-for="item in reviews">
            <ReviewCard v-bind="item"/>
          </li>
        </ol>
      </section>

  </div>
</template>

<script>
// @ is an alias to /src
import ReviewCard from '@/components/reviews-replies/ReviewCard'
import AppButton from '@/components/AppButton'
import { mapGetters } from 'vuex'

export default {
  name: 'courseReviews',
  props: {
    code: String
  },
  components: {
    AppButton,
    ReviewCard
  },
  computed: {
    ...mapGetters('course', {
      reviews: 'reviews'
    })
  },
  created () {
    this.$store.dispatch('course/getReviews', this.code)
  },
  beforeRouteUpdate ({ params: { code } }, from, next) {
    this.$store.dispatch('course/getReviews', code)
    next()
  }
}
</script>

<style scoped>
.button-container {
    margin-bottom:10px;
    text-align:right;
}
</style>
