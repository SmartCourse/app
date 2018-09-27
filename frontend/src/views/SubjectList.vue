<template>
  <div class="main-content subject-list">
    <AppBreadCrumb/>
    <div class="subject-content">
      <div class="card-container">
        <div class="subject-card" :key="item.code" v-for="item in subjects">
          <router-link v-if="item.code" class="card-header" tag="div" :to="{ name: 'subjectCourses', params: { code:item.code }}">
            <h4>
              {{ item.code }}: {{ item.name }}
            </h4>
          </router-link>
          <a class="handbook-link" target=_blank :href="item.handbookURL">Handbook Link</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'subjectList',
  computed: {
    ...mapGetters('subject', {
      subjects: 'subjectList'
    })
  }
}
</script>

<style scoped src='../css/subject.less' lang='less'>
</style>
