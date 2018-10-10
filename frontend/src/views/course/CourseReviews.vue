<template>
    <div class="course-reviews">

      <div class='button-container'>
          <router-link :to="{ name: 'newReview', params: {code} }">
              <AppButton>Write Review</AppButton>
          </router-link>
      </div>

      <Feed
        feedType="ReviewCard"
        :items="reviews"
      />

      <AppPageSelector v-if="meta.last != 1"
        :currPage="meta.curr"
        :lastPage="meta.last"
        :update="refreshReviews"
      />

  </div>
</template>

<script>
// @ is an alias to /src
import Feed from '@/components/course/Feed'
import AppButton from '@/components/AppButton'
import AppPageSelector from '@/components/AppPageSelector'
import { mapGetters } from 'vuex'

export default {
  name: 'courseReviews',
  props: {
    code: String
  },
  components: {
    Feed,
    AppButton,
    AppPageSelector
  },
  computed: {
    ...mapGetters('course', {
      reviews: 'reviews',
      meta: 'reviewsMeta'
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
  margin-bottom: 10px;
  text-align: right;
}
</style>
