<template>
    <section class="q">
      <div v-if="!loading">

        <QuestionCard :question="question"/>

        <AnswerForm @submitAnswerForm="submitAnswer" class="answerForm">
          <!--span :class="answerFormResponse.style"
              v-if="answerFormResponse">{{answerFormResponse.text}}</span-->
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
import {postAnswer} from '@/utils/api.js'
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
      loading: 'loading'
    })
  },
  methods: {
    submitAnswer(answerForm) {
        // check that they actually typed something
        if (answerForm.body == "") {
            //this.answerFormResponse.text = "Please type an answer!"
            //this.answerFormResponse.style = {'form-success': false, 'form-failure': true}
            return
        }
        this.$store.dispatch('questions/postAnswer', {form:answerForm, id:this.question.id})
    }
  },
  created() {
    this.$store.dispatch('questions/getQuestion', this.id || 1)
  }
};
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
