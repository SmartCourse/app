<template>
  <div class="course-info">
    <div>
      <p>
        <b class="description">Description</b>
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
    background-color: white;
    padding: 0 10px 10px;
}

.description {
  font: var(--body-copy-1);
  font-weight: bold;
}

p {
  font: var(--body-copy-2);
}

</style>
