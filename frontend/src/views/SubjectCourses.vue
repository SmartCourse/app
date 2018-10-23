<template>
  <div class="main-content subject-course">
    <AppBreadCrumb/>
    <FilterSearch v-model="search"/>
    <div class="options">
      <p>Sort By:</p> <Radio v-model="sortBy" :options="['Rating', 'Code', 'Name']"/>
    </div>
    <TilesContainer v-if="filtered.length">
      <Tile :key="item.code" v-for="item in filtered">
        <router-link v-if="item.code" tag="div" class="tile-header" :to="{ name: 'info', params: { code:item.code }}">
          <div class="tile-header-top">
            <h4>
              {{ item.code }}
            </h4>
            <Category v-if="item.recommend > -1" :recommend="item.recommend">
              <h6>{{ recommendText(item.recommend) }}</h6>
            </Category>
            <h6 v-else>No reviews</h6>
          </div>
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
import Category from '@/components/Category'
import Radio from '@/components/AppRadioOptions'

export default {
  name: 'subjectCourses',
  data() {
    return {
      search: '',
      sortBy: 'Rating'
    }
  },
  computed: {
    courses() {
      if (this.loading) return []
      // filter courses to ones which match this subject code
      return this.allCourses.filter(course => course.code.slice(0, 4) === this.code)
    },
    sorted() {
      if (this.loading) return []
      // copy
      const s = this.courses.map(a => a)
      // sort
      if (this.sortBy === 'Name') {
        s.sort(({ name: x }, { name: y }) => x > y)
      } else if (this.sortBy === 'Code') {
        s.sort(({ code: x }, { code: y }) => x > y)
      } else {
        s.sort(({ recommend: x }, { recommend: y }) => x < y)
      }
      return s
    },
    filtered() {
      if (this.loading) return []
      const lower = this.search.toLowerCase()
      return this.sorted
        .filter(item => item.code.toLowerCase().match(lower) || item.name.toLowerCase().match(lower))
    },
    ...mapGetters({
      loading: 'loading',
      allCourses: 'courses'
    })
  },
  methods: {
    recommendText(recommend) {
      if (recommend >= 60) return 'Mostly positive'
      else if (recommend <= 40) return 'Mostly negative'
      else return 'Mixed reviews'
    }
  },
  components: {
    Tile,
    TilesContainer,
    FilterSearch,
    Radio,
    Category
  },
  props: {
    code: String
  }
}
</script>

<style scoped src='../css/subject.less' lang='less'/>
<style scoped>
h6 {
  width:120px;
  text-align:right;
}
.options {
  display:flex;
  align-items: center;
  margin:0 10px 5px 15px;
}
</style>
