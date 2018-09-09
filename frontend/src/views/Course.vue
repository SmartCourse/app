<template>
  <div class="course">
    <router-link :to="{ name: 'question', query: { cid: id } }">
      <AppButton>Ask A Question</AppButton>
    </router-link>
    <Feed
      title="Latest Questions"
      :questions="feed"
    />
  </div>
</template>

<script>
// @ is an alias to /src
import Feed from '@/components/Feed'
import AppButton from '@/components/AppButton'
import { mapGetters } from 'vuex'

export default {
  name: 'course',
  props: {
    id: String
  },
  components: {
    Feed,
    AppButton
  },
  computed: {
    ...mapGetters('questions', {
      feed: 'questions',
      error: 'error'
    })
  },
  created () {
    this.$store.dispatch('questions/getQuestions', this.id)
  }
}
</script>
