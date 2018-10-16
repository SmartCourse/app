<template>
  <div class="main-content subject-course">
    <AppBreadCrumb/>
    <TilesContainer v-if="courses.length">
      <Tile :key="item.code" v-for="item in courses">
        <router-link v-if="item.code" class="tile-header" tag="div" :to="{ name: 'info', params: { code:item.code }}">
          <h4>
            {{ item.code }}
          </h4>
          <h5>
            {{ item.name }}
          </h5>
        </router-link>
        <a class="handbook-link" target=_blank :href="item.handbookURL">Handbook Link</a>
      </Tile>
    </TilesContainer>
    <div class="sorry" v-else>
        Sorry, it looks like there are no courses for this subject area
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Tile from '@/components/Tile'
import TilesContainer from '@/components/Tile/Container'

export default {
  name: 'subjectCourses',
  computed: {
    ...mapGetters('subject', {
      courses: 'courses'
    })
  },
  components: {
    Tile,
    TilesContainer
  },
  props: {
    code: String
  },
  created() {
    this.$store.dispatch('subject/getCourses', this.code)
  },
  beforeRouteUpdate(
    {
      params: { code }
    },
    from,
    next
  ) {
    // called when the route that renders this component has changed,
    // but this component is reused in the new route.
    // For example, for a route with dynamic params `/foo/:code`, when we
    // navigate between `/foo/1` and `/foo/2`, the same `Foo` component instance
    // will be reused, and this hook will be called when that happens.
    // has access to `this` component instance.
    if (this.code && this.code !== code) {
      this.$store.dispatch('subject/getCourses', code)
    }
    next()
  }
}
</script>

<style scoped src='../css/subject.less' lang='less'>
