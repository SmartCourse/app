<template>
    <section class="q">
      <div v-if="!loading">

          <QuestionForm @submitQuestionForm="submitQuestion" class="questionForm">
            <span class="form-failure"
              v-if="error.code">{{error.message}}
            </span>
          </QuestionForm>

      </div>
      <!--<LoadingSpinner v-else/>-->
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
    id: String
  },
  computed: {
    ...mapGetters('questions', {
      question: 'question',
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
          id: this.id
        })
        .then(() =>
          this.$router.push({name: 'question', params: { id: String(this.question.id) }}))
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
