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
          Additional stuff goes here mebe.
        </p>
      </div>

      <div v-if="courseTab=='questions'">
        <div class='button-container'>
            <AppButton @click.native="newQuestion">Ask Question</AppButton>
        </div>
        <Feed
          feedType="QuestionCard"
          :items="questions"
        />
      </div>

      <div v-if="courseTab=='reviews'">
        <div class='button-container'>
            <AppButton @click.native="newReview">Ask Question</AppButton>
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
    id: String
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
  methods: {
    newQuestion () {
      // TODO testing only
      this.$router.push({path: "/"})
      // this.$router.push({path: `/course/${courseInfo.id}/question`})
    },
    newReview () {
      // TODO testing only
      this.$router.push({path: "/"})
    }
  },
  created () {
    this.$store.dispatch('course/getCourse', this.id)
    this.$store.dispatch('course/getQuestions', this.id)
    this.$store.dispatch('course/getReviews', this.id)
  }
}
</script>

<style scoped>
h2 {
    margin:0;
}

h2:hover {
    /* TODO fix this in card.less */
    color:black;
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
