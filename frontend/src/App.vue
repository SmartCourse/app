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
  --color-very-light-gray: #f2f2f2;
  --border-dark: 1px solid var(--color-gray);
  --border: 1px solid var(--color-light-gray);
  --border-thick: 2px solid rgba(160, 178, 178, 0.5);
  --box-shadow-active: 0px 0px 0px 1px #ddd;
  --theme: #00a99d;
  /*--theme-light: rgba(#00a99d, 0.6);*/
  --theme-light: rgba(102, 203, 196);
  --font-large: 40px;
  --font-large-mobile: 24px;
  --font-small: 16px;
  --font-small-mobile: 12px;
}

#app {
  background-color: var(--color-very-light-gray);
}

.main-content {
  /* arbitrary */
  min-height: calc(100vh - 150px);
  max-width: 768px;
  min-height: 100vh;
  margin: auto;
}

a {
  color:inherit;
  text-decoration:inherit;
}

a:hover {
  color:inherit;
  text-decoration:inherit;
  cursor:pointer;
}

ol, ul {
  margin: 0;
  padding: 0;
}

li {
  list-style-type: none;
}
</style>
