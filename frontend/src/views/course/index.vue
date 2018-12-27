<template>
  <div class="main-content">
    <AppBreadCrumb/>
      <div class="course">
          <div class="course-header">
              <div class="course-header-title">
                  <div class="key-data">
                      <div class="left">
                          <h2>{{ courseInfo.code }}</h2>
                          <h3>{{ courseInfo.name }}</h3>
                      </div>
                      <div class="right">
                          <OverallRating :rating="courseRatings[0]"/>
                      </div>
                  </div>
                  <CourseLinks :handbookURL="courseInfo.handbookURL" :outlineURL="courseInfo.outlineURL"/>
                  <div class="ratings-big" v-if="ratingsExist">
                      <CourseRatings :ratings="courseRatings.slice(1)"/>
                  </div>
                  <div class="ratings-small">
                      <CourseRatings v-if="ratingsExist" :ratings="courseRatings"/>
                  </div>
              </div>
          </div>
          <div class="course-info">
              <CourseInfo :code="code"/>
          </div>
      </div>
    <div class="course-content">
        <router-view>
            <router-link :to="{name: 'info'}">
                <TabButton :active="this.$route.name === 'info'">Reviews</TabButton>
            </router-link>

            <router-link :to="{name: 'questions'}">
                <TabButton :active="this.$route.name === 'questions'">Questions</TabButton>
            </router-link>
        </router-view>
    </div>

  </div>
</template>

<script>
// @ is an alias to /src
import TabButton from '@/components/Course/TabButton'
import CourseRatings from '@/components/Course/Ratings'
import OverallRating from '@/components/AppRating/CircleWithText'
import CourseLinks from '@/components/Course/Links'
import CourseInfo from './CourseInfo'

import { mapGetters } from 'vuex'

export default {
  name: 'course',
  props: {
    code: String
  },
  components: {
    TabButton,
    CourseRatings,
    CourseLinks,
    CourseInfo,
    OverallRating
  },
  computed: {
    ...mapGetters('course', {
      courseInfo: 'course',
      courseRatings: 'ratings',
      loading: 'loadingCourse'
    }),
    ratingsExist() {
      return this.courseRatings && this.courseRatings[0].value >= 0
    }
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

.course {
    display: grid;
    grid-auto-columns: 2fr 1fr;
    grid-gap: 10px;
    overflow-y: hidden;
}

.key-data {
    display: grid;
    grid-auto-columns: 2fr 1fr;
}

.left, .right {
    grid-row: 1;
}

.right {
    margin: auto;
}

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
    grid-row: 1;
    background-color: var(--white);
}

.course-header-title {
    padding: 20px 20px 0px;
}

.course-info {
    max-height: inherit;
    overflow: hidden;
    grid-row: 1;
}

.course-content {
    grid-row: 2;
    /*background-color: var(--white);*/
    margin-top: 10px;
    min-height: 150px;
}

.ratings-small {
    display: none;
}

@media screen and (max-width: 600px) {
    .course-info, .right, .ratings-big {
        display: none;
    }

    .ratings-small {
        display: block;
    }
}
</style>
