<template>
  <div class="course">
    <div class="course-header">
        <h1>{{ courseInfo.name }}</h1>
        <h2>{{ courseInfo.code }}</h2>
        <button @click="$store.dispatch('course/changeTab', 'info')" class="tab-button tab-button-active">info</button>
        <button @click="$store.dispatch('course/changeTab', 'questions')" class="tab-button">questions</button>
        <button @click="$store.dispatch('course/changeTab', 'reviews')" class="tab-button">reviews</button>
    </div>
    <div class="course-content">
      <div v-if="courseTab=='info'" class="course-tab">
        <p>
          Additional stuff goes here mebe.
        </p>
      </div>

      <div v-if="courseTab=='questions'" class="course-tab">
        <Feed
          title="Latest Questions"
          feedType="QuestionCard"
          :items="questions"
        />
      </div>

      <div v-if="courseTab=='reviews'" class="course-tab">
        <Feed
          title="Latest Reviews"
            feedType="ReviewCard"
            :items="reviews"
          />
      </div>
    </div>
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
    ...mapGetters('course', {
      questions: 'questions',
      reviews: 'reviews',
      courseTab: 'courseTab',
      courseInfo: 'course'
    })
  },
  created () {
    this.$store.dispatch('course/getCourse', this.id)
    this.$store.dispatch('course/getQuestions', this.id)
    this.$store.dispatch('course/getReviews', this.id)
  }
}
</script>
