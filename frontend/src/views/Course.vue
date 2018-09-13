<template>
  <div class="main-content course">
    <div class="course-header">
        <div class="course-header-title">
            <h2>{{ courseInfo.code }} - {{ courseInfo.name }}</h2>
        </div>
        <TabButton @click.native="$store.dispatch('course/changeTab', 'info')" :active="courseTab=='info'">
            info
        </TabButton>
        <TabButton @click.native="$store.dispatch('course/changeTab', 'questions')" :active="courseTab=='questions'">
            questions
        </TabButton>
        <TabButton @click.native="$store.dispatch('course/changeTab', 'reviews')" :active="courseTab=='reviews'">
            reviews
        </TabButton>
    </div>
    <div class="course-content">
      <div v-if="courseTab=='info'" class="course-info">
        <p>
          {{ courseInfo.description }}
        </p>
      </div>

      <div v-if="courseTab=='questions'">
        <div class='button-container'>
            <router-link :to="{ name: 'newQuestion', params: {code} }">
                <AppButton>Ask Question</AppButton>
            </router-link>
        </div>
        <Feed
          feedType="QuestionCard"
          :items="questions"
        />
      </div>

      <div v-if="courseTab=='reviews'">
        <div class='button-container'>
            <router-link :to="{ name: 'newReview', params: {code} }">
                <AppButton>Add Review</AppButton>
            </router-link>
        </div>
        <Feed
            feedType="ReviewCard"
            :items="reviews"
          />
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Feed from '@/components/course/Feed'
import TabButton from '@/components/course/TabButton'
import AppButton from '@/components/AppButton'
import { mapGetters } from 'vuex'

export default {
  name: 'course',
  props: {
    code: String
  },
  components: {
    Feed,
    TabButton,
    AppButton
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
    this.$store.dispatch('course/getCourse', this.code)
    this.$store.dispatch('course/getQuestions', this.code)
    this.$store.dispatch('course/getReviews', this.code)
  },
  beforeRouteUpdate ({ params: { code } }, from, next) {
    // called when the route that renders this component has changed,
    // but this component is reused in the new route.
    // For example, for a route with dynamic params `/foo/:code`, when we
    // navigate between `/foo/1` and `/foo/2`, the same `Foo` component instance
    // will be reused, and this hook will be called when that happens.
    // has access to `this` component instance.
    this.$store.dispatch('course/getCourse', code)
    this.$store.dispatch('course/getQuestions', code)
    this.$store.dispatch('course/getReviews', code)
    next()
  }
}
</script>

<style scoped>
h2 {
    margin:0;
}

.course-header {
    margin-top:20px;
    background-color:white;
}

.course-header-title {
    padding:20px;
    padding-bottom:0px;
}

.course-content {
    background-color:white;
    margin-top:2px;
    padding:10px;
    min-height:50vh;
}

.course-info {
    padding-left:20px;
    padding-right:20px;
}

.button-container {
    text-align:right;
}

</style>
