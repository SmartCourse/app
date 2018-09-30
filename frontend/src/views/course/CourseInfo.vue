<template>
  <div class="course-info">
    <div>
      <p>
        <b>Description</b>
      </p>
      <p class="text-body" v-html="courseInfo.description"></p> <!-- description may contain <p> tags -->
    </div>
    <div v-if="courseInfo.requirements">
      <p>
        <b>Requirements</b>
      </p>
      <p class="text-body" v-html="courseInfo.requirements"></p> <!-- requirements may contain <p> tags -->
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
  }
}
</script>

<style scoped>
.course-info {
    padding: 0 10px;
}

p {
  font: var(--body-copy-1);
}
</style>
