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
import Feed from '@/components/Feed'
import { mapGetters } from 'vuex'

export default {
  name: 'home',
  components: {
    Feed
  },
  computed: {
    ...mapGetters('questions', {
      feed: 'feed'
    })
  },
  created() {
    this.$store.dispatch('questions/getFeed')
  }
}
</script>
