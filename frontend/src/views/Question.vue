<template>
    <section class="main-content">
      <div v-if="!loading">

        <!-- No question to render, show question form-->
        <div v-if="courseID">
          <QuestionForm @submitQuestionForm="submitQuestion" class="questionForm">
            <span class="form-failure"
              v-if="error.code">{{error.message}}
            </span>
          </QuestionForm>
        </div>

        <!-- Otherwise render the specified question-->
        <div v-else>
          <QuestionCard v-bind="question"/>

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
    courseID: String,   // This is a query
    questionID: String  // This is a param
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
          this.$router.push({ name: 'question', params: { id: String(this.question.id) } }))
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
      this.$store.dispatch('questions/getAnswers', this.questionID)
      this.$store.dispatch('questions/getQuestion', this.questionID)
    } else {
      // stop old answers showing up after creating a new question
      this.$store.dispatch('questions/resetState')
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
