<template>
    <div>
        <SubNav :routes="routes"/>
        <router-view class="main-content"/>
    </div>
</template>

<script>
import SubNav from '@/components/Nav/SubNav'

export default {
  components: {
    SubNav
  },
  props: {
    routes: Array
  },
  created() {
    this.$store.dispatch('getFeeds')
  }
}
</script>

<style>
.main-content {
    min-height: calc(100vh - 128px);
}
</style>
