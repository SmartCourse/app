<template>
  <div class="main-content course">
    <AppBreadCrumb/>
    <div class="course-header">
        <div class="course-header-title">
            <h2>{{ courseInfo.code }}</h2>
            <h3>{{ courseInfo.name }}</h3>
            <CourseLinks   :handbookURL="courseInfo.handbookURL" :outlineURL="courseInfo.outlineURL"/>
            <CourseRatings :ratings="courseInfo.ratings || ratings"/>
        </div>

        <router-link :to="{name: 'info'}">
            <TabButton :active="this.$route.name == 'info'">Info</TabButton>
        </router-link>

        <router-link :to="{name: 'questions'}">
            <TabButton :active="this.$route.name == 'questions'">Questions</TabButton>
        </router-link>

        <router-link :to="{name: 'reviews'}">
            <TabButton :active="this.$route.name == 'reviews'">Reviews</TabButton>
        </router-link>
    </div>

    <div class="course-content">
        <router-view/>
    </div>

  </div>
</template>

<script>
// @ is an alias to /src
import TabButton from '@/components/course/TabButton'
import CourseRatings from '@/components/course/Ratings'
import CourseLinks from '@/components/course/Links'

import { mapGetters } from 'vuex'

export default {
  name: 'course',
  props: {
    code: String
  },
  data() {
      // temp data
      return {
          ratings: [
              {
                  text: "Difficulty",
                  value: 10,
              },
              {
                  text: "Workload",
                  value: 40,
              },
              {
                  text: "Enjoyed",
                  value: 98,
              }
          ]
      }
  },
  components: {
    TabButton,
    CourseRatings,
    CourseLinks
  },
  computed: {
    ...mapGetters('course', {
      courseInfo: 'course'
    })
  },
  created () {
    this.$store.dispatch('course/getCourse', this.code)
  },
  beforeRouteUpdate ({ params: { code } }, from, next) {
    // called when the route that renders this component has changed,
    // but this component is reused in the new route.
    // For example, for a route with dynamic params `/foo/:code`, when we
    // navigate between `/foo/1` and `/foo/2`, the same `Foo` component instance
    // will be reused, and this hook will be called when that happens.
    // has access to `this` component instance.
    if (this.code && this.code !== code) {
      this.$store.dispatch('course/getCourse', code)
    }
    next()
  }
}
</script>

<style scoped>
h2 {
    font: var(--header-2); 
}

h3 {
    font: var(--header-3);
}

h2, h3 {
    margin: 0;
    margin-bottom: 10px;
}

.course-header {
    background-color: var(--white);
}

.course-header-title {
    padding: 20px;
}

.course-content {
    background-color: var(--white);
    margin-top: 2px;
    padding: 10px;
    min-height: 50vh;
}
</style>
