<template>
    <section class="main-content">
      <QuestionCard v-bind="question"/>

      <AnswerForm @submitCommentForm="submitAnswer" :type="commentType">
        <span class="form-failure"
            v-if="error.code">{{error.message}}</span>
      </AnswerForm>

      <transition-group name='fade' tag='ul' v-if="answers.length">
        <li v-for="answer in answers" :key="answer.id">
          <AnswerCard :comment="answer"/>
        </li>
      </transition-group>
    </section>
</template>

<script>
import QuestionCard from '@/components/questions-answers/QuestionCard'
import AnswerCard from '@/components/comments/CommentCard'
import AnswerForm from '@/components/comments/CommentForm'
import { mapGetters } from 'vuex'

export default {
  components: {
    QuestionCard,
    AnswerCard,
    AnswerForm
  },
  props: {
    id: String // This is a param
  },
  data() {
    return {
      commentType: 'Answer'
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
  created() {
    this.$store.dispatch('questions/getAnswers', this.id)
    this.$store.dispatch('questions/getQuestion', this.id)
  }
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 1s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
