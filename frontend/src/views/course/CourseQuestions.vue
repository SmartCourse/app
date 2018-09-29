<template>
    <div class="course-questions">

      <div class='button-container'>
          <router-link :to="{ name: 'newQuestion', params: {code} }">
              <AppButton>Ask Question</AppButton>
          </router-link>
      </div>

      <Feed
        feedType="QuestionCard"
        :items="questions"
      />

      <AppPageSelector v-if="meta.last != 1" 
        :currPage="meta.curr" 
        :lastPage="meta.last" 
        :update="refreshQuestions"
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
  name: 'courseQuestions',
  components: {
    Feed,
    AppButton,
    AppPageSelector
  },
  props: {
    code: String
  },
  computed: {
    ...mapGetters('course', {
      questions: 'questions',
      meta: 'questionsMeta'
    })
  },
  methods: {
    refreshQuestions(pageNumber) {
      this.$store.dispatch('course/getQuestions',
        {
          id: this.code,
          pageNumber: pageNumber
        })
    }
  },
  created () {
    this.refreshQuestions(1)
  },
  beforeRouteUpdate ({ params: { code } }, from, next) {
    this.refreshQuestions(1)
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
