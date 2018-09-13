<template>
    <section class="main-content">
        <QuestionForm @submitQuestionForm="submitQuestion">
          <span class="form-failure"
            v-if="error.code">{{error.message}}
          </span>
        </QuestionForm>
    </section>
</template>

<script>
import QuestionForm from '@/components/questions-answers/QuestionForm'
import { mapGetters } from 'vuex'

export default {
  components: {
    QuestionForm
  },
  props: {
    courseID: String, // This is a query
  },
  data() {
    return {
    }
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
        .then(() => this.$router.push({ name: 'question', params: { id: this.question.id } }))
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
