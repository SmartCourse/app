<template>
  <div class="Feed">
    <h1>{{ title }}</h1>
    <section class="questions">
      <ol>
        <li :key="question.id" v-for="question in questions">{{ question }}</li>
      </ol>
    </section>
  </div>
</template>

<script>
import Question from './Question'

export default {
  name: 'Feed',
  components: {
    Question
  },
  props: {
    title: String,
    questions: Array
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">

</style>
