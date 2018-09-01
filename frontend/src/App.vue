<template>
  <div id="app">
    <AppNavBar/>
    <main>
      <router-view/>
    </main>
    <AppFooter/>
  </div>
</template>

<script>
import AppNavBar from '@/components/AppNavBar'
import AppFooter from '@/components/AppFooter'

export default {
  components: { AppNavBar, AppFooter }
}
</script>


<style lang="less">
/* global styles live here */
html, body {
  margin: 0;
  padding: 0;
  font-size: medium;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

* {
  --border: 2px solid #f5f5f5;
}

main {
  /* arbitrary */
  max-width: 768px;
  margin: auto;
}

ol, ul {
  margin: 0;
  padding: 0;
}

li {
  list-style-type: none;
}
</style>
