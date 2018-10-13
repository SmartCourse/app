<template>
    <div class="course-questions">
      <!-- Controls inserted here -->
      <Options
        buttonText="Ask a Question"
        routeName="newQuestion"
        :code="code"
      >
        <slot/>
      </Options>

      <Feed
        feedType="Question"
        :items="questions"
      />

      <AppPageSelector v-if="meta.last != 1"
        :currPage="meta.curr"
        :lastPage="meta.last"
        :update="refreshQuestions"
      />

  </div>
</template>

<script>
// @ is an alias to /src
import Feed from '@/components/course/Feed'
import AppPageSelector from '@/components/AppPageSelector'
import Options from '@/components/course/Controls'
import { mapGetters } from 'vuex'

export default {
  name: 'courseQuestions',
  components: {
    Options,
    Feed,
    AppPageSelector
  },
  props: {
    code: String
  },
  computed: {
    ...mapGetters('course', {
      questions: 'questions',
      meta: 'questionsMeta'
    })
  },
  methods: {
    refreshQuestions(pageNumber) {
      this.$store.dispatch('course/getQuestions',
        {
          id: this.code,
          pageNumber: pageNumber
        })
    }
  },
  created () {
    this.refreshQuestions(1)
  },
  beforeRouteUpdate ({ params: { code } }, from, next) {
    this.refreshQuestions(1)
    next()
  }
}
</script>
