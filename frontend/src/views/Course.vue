<template>
  <div class="course">
    <Feed
      title="Latest Questions"
      :questions="feed"
    />
  </div>
</template>

<script>
// @ is an alias to /src
import Feed from '@/components/Feed'
import { mapGetters } from 'vuex'

export default {
  name: 'course',
  props: {
    id: String
  },
  components: {
    Feed
  },
  computed: {
    ...mapGetters('questions', {
      feed: 'questions'
    })
  },
  created () {
    this.$store.dispatch('questions/getQuestions', this.id)
  }
}
</script>
