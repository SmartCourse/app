<template>
    <div>
      <div>PARAM: {{id}}</div>
      <div>{{ question }}</div>
      <div v-for="answer in answers" :key="answer.id">
          {{ answer }}
      </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
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
