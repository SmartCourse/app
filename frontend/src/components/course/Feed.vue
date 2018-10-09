<template>
  <div class="feed">
    <section class="questions">
      <ol>
        <li :key="item.id" v-for="item in items">
          <component :is="feedType" v-bind="item"/>
        </li>
      </ol>
    </section>
  </div>
</template>

<script>
import QuestionCard from '@/components/questions-answers/QuestionCard'
import ReviewCard from '@/components/reviews-replies/ReviewCard'

export default {
  name: 'Feed',
  components: {
    QuestionCard,
    ReviewCard
  },
  props: {
    feedType: String,
    items: Array
  }
}
</script>

<style scoped>
.feed {
  min-height: 150px;
  background-color: red;
}
</style>
