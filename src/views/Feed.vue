<template>
    <div data-view>
        <div>
            <h2>Latest {{ feedType }}</h2>
            <FeedCard v-for="card in feed"
                :key="card.id"
                :cardType="feedType === 'questions' ? 'Question' : 'Review'"
                v-bind="card"
            />
        </div>
    </div>
</template>

<script>
import FeedCard from '@/components/Course/FeedCard'

export default {
  props: {
    feedType: String
  },
  components: { FeedCard },
  computed: {
    feed() {
      return this.$store.state.feeds[this.feedType]
    }
  }
}
</script>

<style scoped>
h2 {
    font: var(--header-2);
    text-transform: capitalize;
    padding: 0 10px;
}
</style>
