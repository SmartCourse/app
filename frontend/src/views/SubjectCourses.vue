<template>
  <div class="main-content subject-course">
    <AppBreadCrumb/>
    <FilterSearch v-model="search"/>
    <TilesContainer v-if="filtered.length">
      <Tile :key="item.code" v-for="item in filtered">
        <router-link v-if="item.code" tag="div" class="tile-header" :to="{ name: 'info', params: { code:item.code }}">
          <div class="tile-header-top">
            <h4>
              {{ item.code }}
            </h4>
            <h6 v-if="item.recommend > -1" :class="recommendClass(item.recommend)">
              {{ recommendText(item.recommend) }}
            </h6>
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
      const filtered = this.allCourses.filter(course => course.code.slice(0, 4) === this.code)
      // sort them
      filtered.sort(({recommend:r1}, {recommend:r2}) => r1 < r2)

      return filtered
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
  methods: {
    recommendClass(recommend) {
      if (recommend >= 60) return 'positive'
      else if (recommend <= 40) return 'negative'
      else return 'neutral'
    },
    recommendText(recommend) {
      if (recommend >= 60) return 'Mostly positive'
      else if (recommend <= 40) return 'Mostly negative'
      else return 'Mixed reviews'
    }
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
<style scoped>
h6 {
    width:120px;
    text-align:right;
}
.positive {
  color:var(--color-positive);
}

.neutral {
  color:var(--soft-black);
}

.negative {
  color:var(--color-negative);
}
</style>
