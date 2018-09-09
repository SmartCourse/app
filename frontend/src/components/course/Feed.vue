<template>
  <div class="Feed">
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
h4 {

}
</style>
