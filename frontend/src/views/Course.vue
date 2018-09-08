<template>
  <div class="course">
    <Feed
      title="Latest Questions"
      :questions="feed"
    />
    <QuestionForm @submitQuestionForm="submitQuestion" class="questionForm">
      <span class="form-failure"
        v-if="error.code">{{error.message}}
      </span>
    </QuestionForm>
  </div>
</template>

<script>
// @ is an alias to /src
import Feed from '@/components/Feed'
import QuestionForm from '@/components/questions-answers/QuestionForm'
import { mapGetters } from 'vuex'

export default {
  name: 'course',
  props: {
    id: String
  },
  components: {
    Feed,
    QuestionForm
  },
  computed: {
    ...mapGetters('questions', {
      feed: 'questions',
      error: 'error'
    })
  },
  methods: {
    submitQuestion (questionForm) {
      // check that they actually typed something
      if (questionForm.body === '') {
        return
      }
      // this.$store.dispatch('questions/postQuestion', {form: questionForm, id: this.course.id})
      this.$store.dispatch('questions/postQuestion',
        {
          id: this.id,
          form: questionForm
        })
    }
  },
  created () {
    this.$store.dispatch('questions/getQuestions', this.id)
  }
}
</script>
