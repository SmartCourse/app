<template>
    <section class="main-content">
      <AppBreadCrumb/>
      <QuestionForm :callback="submitQuestion">
        <span class="form-failure" v-if="error.code">
          {{error.message}}
        </span>
      </QuestionForm>
    </section>
</template>

<script>
import QuestionForm from '@/components/Questions/QuestionForm'
import { mapGetters } from 'vuex'

export default {
  components: {
    QuestionForm
  },
  props: {
    code: {
      type: String,
      required: true
    }
  },
  computed: {
    ...mapGetters('questions', {
      question: 'question',
      answers: 'answers',
      loading: 'loading',
      error: 'error'
    }),
    user() {
      return this.$store.getters.user
    }
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
          code: this.code
        })
        .then(() => this.$router.push({ name: 'question', params: { code: this.code, id: this.question.id } }))
    }
  }
}
</script>
