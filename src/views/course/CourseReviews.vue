<template>
    <div class="course-reviews">
      <!-- Controls inserted here -->
      <Options
        buttonText="Write Review"
        routeName="newReview"
        :buttonDisabled="!isLoggedIn || hasReviewed"
        :buttonDisabledMessage="disabledMessage"
        :code="code"
      >
        <slot/>
      </Options>

      <Feed
        feedType="Review"
        :items="reviews"
        v-if="!loading && reviews.length"
      />

      <WarningContainer v-if="!loading && !reviews.length">
        <WarningHeader>This course currently has no reviews!</WarningHeader>
        <p>Have you done this course? Maybe you can help by writing its first review.</p>
      </WarningContainer>

      <AppPageSelector v-if="meta.last != 1"
        :currPage="meta.curr"
        :lastPage="meta.last"
        :update="refreshReviews"
      />

  </div>
</template>

<script>
// @ is an alias to /src
import Feed from '@/components/Course/Feed'
import WarningContainer from '@/components/Warnings/Container'
import WarningHeader from '@/components/Warnings/Header'
import AppPageSelector from '@/components/AppPageSelector'
import Options from '@/components/Course/Controls'
import { mapGetters } from 'vuex'

export default {
  name: 'courseReviews',
  props: {
    code: String
  },
  components: {
    Feed,
    AppPageSelector,
    Options,
    WarningHeader,
    WarningContainer
  },
  computed: {
    ...mapGetters('course', {
      reviews: 'reviews',
      hasReviewed: 'hasReviewed',
      meta: 'reviewsMeta',
      loading: 'loadingFeed'
    }),
    ...mapGetters('auth', { isLoggedIn: 'isLoggedIn' }),
    disabledMessage() {
      return {
        content: this.hasReviewed ? 'You\'ve already reviewed this course'
          : !this.isLoggedIn ? 'You must be logged in to post.' : '',
        placement: 'left'
      }
    }
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
