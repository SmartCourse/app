<template>
    <section class="q">
      <div v-if="!loading">

        <QuestionCard :question="question"/>

        <AnswerForm @submitAnswerForm="submitAnswer" class="answerForm">
          <span class="form-failure"
              v-if="error.code">{{error.message}}</span>
        </AnswerForm>

        <ul v-if="answers.length">
          <li v-for="answer in answers" :key="answer.id">
            <AnswerCard :answer="answer"/>
          </li>
        </ul>

      </div>
      <!--<LoadingSpinner v-else/>-->
    </section>
</template>

<script>
import QuestionCard from '@/components/QuestionCard'
import AnswerCard from '@/components/AnswerCard'
import AnswerForm from '@/components/AnswerForm'
import { mapGetters } from 'vuex'

export default {
  components: {
    QuestionCard,
    AnswerCard,
    AnswerForm
  },
  props: {
    id: String
  },
  computed: {
    ...mapGetters('questions', {
      question: 'question',
      answers: 'answers',
      loading: 'loading',
      error: 'error'
    })
  },
  methods: {
    submitAnswer (answerForm) {
      // check that they actually typed something
      if (answerForm.body === '') {
        // this.answerFormResponse.text = "Please type an answer!"
        // this.answerFormResponse.style = {'form-success': false, 'form-failure': true}
        return
      }
      this.$store.dispatch('questions/postAnswer', {form: answerForm, id: this.question.id})
    }
  },
  created () {
    this.$store.dispatch('questions/getAnswers', this.id)
    this.$store.dispatch('questions/getQuestion', this.id)
  }
}
</script>

<style scoped>
  li {
    list-style: none;
  }
  .form-success {
    color: green;
  }
  .form-failure {
    color: red;
  }
</style>
