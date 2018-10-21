<template>
  <div class="main-content subject-course">
    <AppBreadCrumb/>
    <FilterSearch v-model="search"/>
    <TilesContainer v-if="filtered.length">
      <Tile :key="item.code" v-for="item in filtered">
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
    <h2 class="sorry" v-else-if="!loading && !courses.length">
        Sorry, it looks like there are no courses for this subject area
    </h2>
    <h2 class="sorry" v-else-if="!loading && !filtered.length">
        Sorry, it looks like there are no courses that match that keyword
    </h2>
    <div style="text-align:center;" v-else>
      <LoadingSpinner/>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Tile from '@/components/Tile'
import TilesContainer from '@/components/Tile/Container'
import FilterSearch from '@/components/Search/Filter'

export default {
  name: 'subjectCourses',
  data() {
    return {
      search: ''
    }
  },
  computed: {
    courses() {
      if (this.loading) return []
      // filter courses to ones which match this subject code
      return this.allCourses.filter(course => course.code.slice(0, 4) === this.code)
    },
    filtered() {
      if (this.loading) return []
      const lower = this.search.toLowerCase()
      return this.courses
        .filter(item => item.code.toLowerCase().match(lower) || item.name.toLowerCase().match(lower))
    },
    ...mapGetters({
      loading: 'loading',
      allCourses: 'courses'
    })
  },
  components: {
    Tile,
    TilesContainer,
    FilterSearch
  },
  props: {
    code: String
  }
}
</script>

<style scoped src='../css/subject.less' lang='less'/>
