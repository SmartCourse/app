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
    <div class="sorry" v-if="!loading">
        Sorry, it looks like there are no courses for this subject area
    </div>
    <div style="text-align:center;" v-else>
      <LoadingSpinner/>
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
    courses() {
      if (this.loading) return []
      // filter courses to ones which match this subject code
      return this.allCourses.filter(course => course.code.slice(0, 4) === this.code)
    },
    ...mapGetters({
      loading: 'loading',
      allCourses: 'courses'
    })
  },
  components: {
    Tile,
    TilesContainer
  },
  props: {
    code: String
  }
}
</script>

<style scoped src='../css/subject.less' lang='less'>
