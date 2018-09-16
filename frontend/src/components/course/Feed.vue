<template>
  <div class="Feed">
    <section class="questions">
      <ol>
        <li :key="item.id" v-for="item in items">
          <component :is="feedType" v-bind="item"/>
        </li>
      </ol>
    </section>
    <div class='button-container'>
      <AppButton @click.native="prevPage(feedType)">Prev</AppButton>
      <AppButton @click.native="nextPage(feedType)">Next</AppButton>
    </div>
  </div>
</template>

<script>
import QuestionCard from '@/components/questions-answers/QuestionCard'
import ReviewCard from '@/components/reviews-replies/ReviewCard'
import AppButton from '@/components/AppButton'

export default {
  name: 'Feed',
  components: {
    QuestionCard,
    ReviewCard,
    AppButton
  },
  props: {
    feedType: String,
    items: Array,
    prevPage: Function,
    nextPage: Function
  }
}
</script>

<style>

.button-container {
    text-align:center;
}

</style>
