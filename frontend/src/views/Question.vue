<template>
    <div class="q">
      <QuestionCard :question="question"/>
      <div v-for="answer in answers" :key="answer.id">
          {{ answer }}
      </div>
    </div>
</template>

<script>
import QuestionCard from '@/components/QuestionCard.vue'
import { mapGetters } from 'vuex'

export default {
  components: {
    QuestionCard
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
