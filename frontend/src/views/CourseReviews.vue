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

    <PageSelector :update="refreshReviews"></PageSelector>

  </div>
</template>

<script>
// @ is an alias to /src
import ReviewCard from '@/components/reviews-replies/ReviewCard'
import AppButton from '@/components/AppButton'
import PageSelector from '@/components/PageSelector'
import { mapGetters } from 'vuex'

export default {
  name: 'courseReviews',
  props: {
    code: String
  },
  components: {
    AppButton,
    ReviewCard,
    PageSelector
  },
  computed: {
    ...mapGetters('course', {
      reviews: 'reviews'
    })
  },
  methods: {
    refreshReviews(pageNumber) {
      this.$store.dispatch('course/getReviews',
      {
        id: this.code,
        pageNumber: pageNumber
      })    
    }
  },
  created () {
    this.refreshReviews(1)
  },
  beforeRouteUpdate ({ params: { code } }, from, next) {
    this.refreshReviews(1)
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
