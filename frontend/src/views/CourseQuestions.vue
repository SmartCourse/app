<template>
    <div class="course-questions">

        <div class='button-container'>
            <router-link :to="{ name: 'newQuestion', params: {code} }">
                <AppButton>Ask Question</AppButton>
            </router-link>
        </div>

      <section class="questions">
        <ol>
          <li :key="item.id" v-for="item in questions">
            <QuestionCard v-bind="item"/>
          </li>
        </ol>
      </section>

      <PageSelector :update="refreshQuestions"></PageSelector>
  </div>
</template>

<script>
// @ is an alias to /src
import QuestionCard from '@/components/questions-answers/QuestionCard'
import AppButton from '@/components/AppButton'
import PageSelector from '@/components/PageSelector'
import { mapGetters } from 'vuex'

export default {
  name: 'courseQuestions',
  components: {
    AppButton,
    QuestionCard,
    PageSelector
  },
  props: {
    code: String
  },
  computed: {
    ...mapGetters('course', {
      questions: 'questions'
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
    margin-bottom:10px;
    text-align:right;
}
</style>
