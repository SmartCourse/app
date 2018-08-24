<template>
  <div class="home">
    <Feed 
      title="Welcome to SmartCourse!"
      :questions="feed"
    />
  </div>
</template>

<script>
// @ is an alias to /src
import Feed from '@/components/Feed.vue'

export default {
  name: 'home',
  components: {
    Feed
  },
  computed: {
    feed() {
      return this.$store.state.questions
    }
  },
  created() {
    this.$store.dispatch('getFeed')
  }
}
</script>
