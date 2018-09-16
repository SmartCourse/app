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
          :prevPage="prevPage"
          :nextPage="nextPage"
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
            :prevPage="prevPage"
            :nextPage="nextPage"
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
data () {
    return {
      questionPage: 1,
      reviewPage: 1
    }
  },
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
  methods: {
    update() {
        this.$store.dispatch('course/getCourse', this.code)
        this.refreshQuestions()
        this.refreshReviews()
    },
    refreshQuestions() {
        this.$store.dispatch('course/getQuestions',
        {
            id: this.code,
            pageNumber: this.questionPage
        })
    }, 
    refreshReviews() {
        this.$store.dispatch('course/getReviews',
        {
            id: this.code,
            pageNumber: this.reviewPage
        })
    },
    nextPage (feedType) {
        if (feedType == 'QuestionCard') {
            this.questionPage += 1
            this.refreshQuestions()
        } else if (feedType == 'ReviewCard') {
            this.reviewPage += 1
            this.refreshReviews()
        }
    },
    prevPage (feedType) {
        if (feedType == 'QuestionCard') {
            if (this.questionPage > 1) {
                this.questionPage -= 1
            }
            this.refreshQuestions()
        } else if (feedType == 'ReviewCard') {
            if (this.reviewPage > 1) {
                this.reviewPage -= 1
            }
            this.refreshReviews()
        }
    }
  },
  created () {
      this.update()
  },
  beforeRouteUpdate ({ params: { code } }, from, next) {
    // called when the route that renders this component has changed,
    // but this component is reused in the new route.
    // For example, for a route with dynamic params `/foo/:code`, when we
    // navigate between `/foo/1` and `/foo/2`, the same `Foo` component instance
    // will be reused, and this hook will be called when that happens.
    // has access to `this` component instance.
    this.update()
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
