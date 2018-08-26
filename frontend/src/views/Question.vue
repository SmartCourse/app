<template>
    <div class="q">
      <QuestionCard :question="question"/>
      <ul>
          <li v-for="answer in answers" :key="answer.id">
              <AnswerCard :answer="answer"/>
          </li>
      </ul>
    </div>
</template>

<script>
import QuestionCard from '@/components/QuestionCard.vue'
import AnswerCard from '@/components/AnswerCard.vue'
import { mapGetters } from 'vuex'

export default {
  components: {
    QuestionCard,
    AnswerCard
  },
  props: {
      id: String
  },
  computed: {
    ...mapGetters('questions', {
      question: 'question',
      answers: 'answers'
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
