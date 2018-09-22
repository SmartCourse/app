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

  </div>
</template>

<script>
// @ is an alias to /src
import QuestionCard from '@/components/questions-answers/QuestionCard'
import AppButton from '@/components/AppButton'
import { mapGetters } from 'vuex'

export default {
  name: 'courseQuestions',
  components: {
    AppButton,
    QuestionCard
  },
  props: {
    code: String
  },
  computed: {
    ...mapGetters('course', {
      questions: 'questions'
    })
  },
  created () {
    this.$store.dispatch('course/getQuestions', this.code)
  },
  beforeRouteUpdate ({ params: { code } }, from, next) {
    this.$store.dispatch('course/getQuestions', code)
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
