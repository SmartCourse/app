<template>
  <div class="course">
    <Feed
      title="Latest Questions"
      feedType="QuestionCard"
      :items="questionFeed"
    />
    <Feed
      title="Latest Reviews"
      feedType="ReviewCard"
      :items="reviewFeed"
      />
    </div>
</template>

<script>
// @ is an alias to /src
import Feed from '@/components/Feed'
import { mapGetters } from 'vuex'

export default {
  name: 'course',
  props: {
    id: String
  },
  components: {
    Feed
  },
  computed: {
    ...mapGetters('questions', {
      questionFeed: 'questions'
    }),
    ...mapGetters('reviews', {
      reviewFeed: 'reviews'
    })
  },
  created () {
    this.$store.dispatch('questions/getQuestions', this.id)
    this.$store.dispatch('reviews/getReviews', this.id)
  }
}
</script>
