<template>
  <div class="Feed">
    <section class="questions">
      <ol>
        <li :key="item.id" v-for="item in items">
          <component :is="feedType" v-bind="item"/>
        </li>
      </ol>
    </section>
    <PageSelector :update="update"></PageSelector>
  </div>
</template>

<script>
import QuestionCard from '@/components/questions-answers/QuestionCard'
import ReviewCard from '@/components/reviews-replies/ReviewCard'
import PageSelector from '@/components/PageSelector'

export default {
  name: 'Feed',
  components: {
    QuestionCard,
    ReviewCard,
    PageSelector
  },
  props: {
    feedType: String,
    items: Array,
    update: Function,
  },
}
</script>