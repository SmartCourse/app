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

:root {
  --color-gray: #d5d5d5;
  --color-light-gray: #eaeaea;
  --border-thin: 1px solid var(--color-gray);
  --border: 1px solid var(--color-light-gray);
  --border-dark: 1px solid rgba(160, 178, 178, 0.5);
  --theme: #00a99d;
  --theme-light: rgba(#00a99d, 0.9);
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
