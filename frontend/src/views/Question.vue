<template>
    <section class="q">
      <div v-if="!loading">

        <!-- No question to render, show question form-->
        <div v-if="!questionID">
          <QuestionForm @submitQuestionForm="submitQuestion" class="questionForm">
            <span class="form-failure"
              v-if="error.code">{{error.message}}
            </span>
          </QuestionForm>
        </div>

        <!-- Otherwise render the specified question-->
        <div v-else>
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

      </div>
      <!--<LoadingSpinner v-else/>-->
    </section>
</template>

<script>
import QuestionCard from '@/components/questions-answers/QuestionCard'
import QuestionForm from '@/components/questions-answers/QuestionForm'
import AnswerCard from '@/components/questions-answers/AnswerCard'
import AnswerForm from '@/components/questions-answers/AnswerForm'
import { mapGetters } from 'vuex'

export default {
  components: {
    QuestionCard,
    QuestionForm,
    AnswerCard,
    AnswerForm
  },
  props: {
    courseID: String,
    questionID: String
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
    submitQuestion (questionForm) {
      // check that they actually typed something
      if (questionForm.title === '' || questionForm.body === '') {
        return
      }
      this.$store.dispatch('questions/postQuestion',
        {
          form: questionForm,
          id: this.courseID
        })
        .then(() =>
          this.$router.push({name: 'question', query: { qid: String(this.question.id) }}))
    },
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
    if (this.questionID) {
      this.$store.dispatch('questions/getAnswers', this.id)
      this.$store.dispatch('questions/getQuestion', this.id)
    }
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
