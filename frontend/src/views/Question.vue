<template>
    <section class="main-content">
      <AppBreadCrumb/>
      <QuestionCard v-bind="question" :authenticated="authenticated"/>

      <AnswerForm @submitCommentForm="submitAnswer" :type="commentType" :callback="submitAnswer" :authenticated="authenticated">
        <span class="form-failure"
            v-if="error.code">{{error.message}}</span>
      </AnswerForm>

      <transition-group name='fade' tag='ul' v-if="answers.length">
        <li v-for="answer in answers" :key="answer.id">
          <AnswerCard :comment="answer" :type="commentType" :id="id" :code="code" :authenticated="authenticated"/>
        </li>
      </transition-group>
    </section>
</template>

<script>
import QuestionCard from '@/components/Questions/QuestionCard'
import AnswerCard from '@/components/Comments/CommentCard'
import AnswerForm from '@/components/Comments/CommentForm'
import { mapGetters } from 'vuex'

export default {
  components: {
    QuestionCard,
    AnswerCard,
    AnswerForm
  },
  props: {
    code: {
      type: String,
      required: true
    },
    id: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      commentType: 'Answer' // If changed, also modify CommentCards
    }
  },
  computed: {
    ...mapGetters('questions', {
      question: 'question',
      answers: 'answers',
      loading: 'loading',
      error: 'error'
    }),
    authenticated: function() {
      return this.$store.getters['auth/isLoggedIn']
    }
  },
  methods: {
    submitAnswer (answerForm) {
      const authState = this.$store.getters['auth/isLoggedIn']
      if (!authState) {
        this.$router.push('/login')
        return
      }

      // check that they actually typed something
      if (answerForm.body === '') {
        // this.answerFormResponse.text = "Please type an answer!"
        // this.answerFormResponse.style = {'form-success': false, 'form-failure': true}
        return
      }
      this.$store.dispatch('questions/postAnswer', { form: answerForm, code: this.code, id: this.question.id })
    }
  },
  created () {
    this.$store.dispatch('questions/getAnswers', { id: this.id, code: this.code })
    this.$store.dispatch('questions/getQuestion', { id: this.id, code: this.code })
  }
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 1s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
