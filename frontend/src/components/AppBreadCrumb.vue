<template>
    <ul v-if="routeList" class="breadcrumbs">
        <li class="crumb" :key="item.id" v-for="item in routeList">
            <router-link tag="a" :to="item.route">{{ item.text }}</router-link>
        </li>
    </ul>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters('subject', {
      subjects: 'subjectMap'
    }),
    routeList() {
      // e.g. Subjects > Computer Science > COMP4920 > Ask Question

      let id = 0
      const list = [
        { id: id++, text: 'Home', route: '/' },
        { id: id++, text: 'Subjects', route: '/subject' }
      ]

      const path = this.$route.path.split('/')
      if (path.length) {
        if (this.$route.params.code) {
          // if there's a course or subject code, add the subject name
          const subjCode = this.$route.params.code.slice(0, 4)
          // deal with async population of subjects
          if (!this.subjects[subjCode]) {
            // use the code if name not available yet
            list.push({ id: id++, text: subjCode, route: `/subject/${subjCode}` })
          } else {
            // otherwise use the full subject name from the store
            const subjName = this.subjects[subjCode].name
            list.push({ id: id++, text: subjName, route: `/subject/${subjCode}` })
          }

          if (path[1] === 'course') {
            const courseCode = this.$route.params.code
            list.push({ id: id++, text: courseCode, route: `/course/${courseCode}` })
            const map = {
              'newQuestion': 'Ask Question',
              'newReview': 'Add Review',
              'question': 'View Question',
              'review': 'View Review'
            }
            if (this.$route.name in map) {
              list.push({ id: id++, text: map[this.$route.name], route: this.$route.path })
            }
          }
        }
      }

      return list.slice(Math.max(0, list.length - 4), list.length - 1)
    }
  }
}
</script>

<style scoped lang='less'>

.breadcrumbs {
    max-width: 100%;
    overflow: hidden;
    padding: 10px 20px;
    color: var(--theme);
}

.crumb {
    display:inline;
}

.crumb+.crumb:before {
    padding: 10px;
    color: var(--soft-black);
    content: ">";
}

</style>
