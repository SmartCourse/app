<template>
  <div class="course-info">
    <div>
      <p>
        <b>Description:</b>
      </p>
      <p v-html="courseInfo.description"></p> <!-- description may contain <p> tags -->
    </div>
    <div v-if="courseInfo.requirements">
      <p>
        <b>Requirements:</b>
      </p>
      <p v-html="courseInfo.requirements"></p> <!-- requirements may contain <p> tags -->
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'courseInfo',
  props: {
    code: String
  },
  computed: {
    ...mapGetters('course', {
      courseInfo: 'course'
    })
  },
  created () {
    if (!this.courseInfo) { this.$store.dispatch('course/getCourse', this.code) }
  },
  beforeRouteUpdate ({ params: { code } }, from, next) {
    if (this.code && this.code !== code) { this.$store.dispatch('course/getCourse', code) }
    next()
  }
}
</script>

<style scoped>
.course-info {
    padding-left:20px;
    padding-right:20px;
}
</style>
