<template>
  <div class="main-content subject-list">
    <FilterSearch v-model="search"/>
    <TilesContainer v-if="filtered.length">
        <Tile :key="item.code" v-for="item in filtered">
          <router-link v-if="item.code" class="tile-header" tag="div" :to="{ name: 'subjectCourses', params: { code:item.code }}">
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
    <h2 class="sorry" v-else-if="!loading">Sorry, there are no subjects that match that keyword.</h2>
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
  name: 'subjectList',
  data() {
    return {
      search: ''
    }
  },
  computed: {
    ...mapGetters('subject', {
      subjects: 'subjectList',
      loading: 'loading'
    }),
    filtered() {
      if (this.loading) return []
      const lower = this.search.toLowerCase()
      return this.subjects
        .filter(item => item.code.toLowerCase().match(lower) || item.name.toLowerCase().match(lower))
    }
  },
  components: {
    Tile,
    TilesContainer,
    FilterSearch
  }
}
</script>

<style scoped src='../css/subject.less' lang='less'/>
