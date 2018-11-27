<template>
  <div class="feed">
    <section class="questions">
      <ol>
        <li :key="item.id" v-for="item in items">
          <FeedCard v-bind="item" :cardType="feedType"/>
        </li>
      </ol>
    </section>
  </div>
</template>

<script>
import FeedCard from '@/components/Course/FeedCard'

export default {
  name: 'Feed',
  components: {
    FeedCard
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
}
</style>
