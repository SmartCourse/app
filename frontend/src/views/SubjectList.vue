<template>
  <div class="main-content subject-list">
    <AppBreadCrumb/>
    <TilesContainer>
        <Tile :key="item.code" v-for="item in subjects">
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
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Tile from '@/components/Tile';
import TilesContainer from '@/components/Tile/Container';

export default {
  name: 'subjectList',
  computed: {
    ...mapGetters('subject', {
      subjects: 'subjectList'
    })
  },
  components: {
    Tile,
    TilesContainer
  }
}
</script>

<style scoped src='../css/subject.less' lang='less'>
</style>
