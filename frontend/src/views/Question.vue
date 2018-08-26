<template>
    <section class="q">
      <div v-if="!loading">
        <QuestionCard :question="question"/>
        <ul v-if="answers.length">
            <li v-for="answer in answers" :key="answer.id">
                <AnswerCard :answer="answer"/>
            </li>
        </ul>
      </div>
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
      loading: 'loading'
    })
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
</style>
