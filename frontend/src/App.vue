<template>
  <div id="app">
    <AppNavBar/>
    <main>
      <router-view :key="$route.path"/>
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
  letter-spacing: 0;
  font-weight: 400;
  font-style: normal;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: rgba(0,0,0,.84);
  font-size: 16px;
  line-height: 1.4;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

:root {
  // for text
  --white: snow;
  --soft-white: #aaa;
  --black: #111;
  --soft-black: rgba(#111, 0.65);
  // borders
  --color-gray: #d5d5d5;
  --color-light-gray: #eaeaea;
  --color-very-light-gray: #f4f4f4;
  --border-dark: 1px solid var(--color-gray);
  --border: 1px solid var(--color-light-gray);
  --border-thick: 2px solid rgba(160, 178, 178, 0.5);
  --box-shadow-active: 0px 0px 0px 1px #ddd;
  --theme: #00a99d;
  /*--theme-light: rgba(#00a99d, 0.6);*/
  --theme-light: rgba(102, 203, 196);
  // font format
  --header-1: 600 3rem /1.2 sans-serif;
  --header-1-mobile: 600 2rem /1.1 sans-serif;
  --header-2: 600 2.25rem /1.2 sans-serif;
  --header-2-mobile: 600 1.625rem /1.2 sans-serif;
  --header-3: 400 1.75rem /1.3 sans-serif;
  --header-3-mobile: 400 1.4rem /1.2 sans-serif;
  --header-4: 400 1.15rem /1.4 sans-serif;
  --body-copy-1: 400 1rem /1.6 sans-serif;
  --body-copy-2: 400 0.85rem /1.6 sans-serif;
  --font-large: 40px;
  --font-large-mobile: 24px;
  --font-medium: 20px;
  --font-medium-mobile: 16px;
  --font-small: 16px;
  --font-small-mobile: 12px;
}

h1, h2, h3, h4, h5, h6 {
  letter-spacing: normal;
}

.form-success {
  color: green;
}
.form-failure {
  color: red;
}

#app {
  background-color: var(--color-very-light-gray);
}

.main-content {
  /* arbitrary */
  min-height: calc(100vh - 148px);
  max-width: 768px;
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
