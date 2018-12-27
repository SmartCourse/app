<template>
  <div id="app">
    <AppNavBar/>
    <main>
      <router-view/>
    </main>
    <AppFooter v-if="!authpage"/>
  </div>
</template>

<script>
import AppNavBar from '@/components/AppNavBar'
import AppFooter from '@/components/AppFooter'

export default {
  components: { AppNavBar, AppFooter },
  computed: {
    authpage() {
      const { name } = this.$route
      return name === 'Login' || name === 'Sign Up' || name === 'Forgot Password'
    }
  },
  created() {
    this.$store.dispatch('getCourses')
    this.$store.dispatch('auth/checkAuth')
    this.$store.dispatch('subject/getSubjects')
    this.$store.dispatch('getFaculties')
    this.$store.dispatch('getDegrees')
  }
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
  font-size: 14px;
  line-height: 1.4;
  font-family: -apple-system, BlinkMacSystemFont, 'Open Sans', 'Helvetica Neue', sans-serif;
}

:root {
  // for text
  --white: #fefefe;
  --soft-white: #aaa;
  --black: #111;
  --soft-black: rgba(#111, 0.5);
  --black-p: rgba(0,0,0,.72);
  // recommended / not
  --color-positive: rgba(1, 160, 1, 0.7);
  --color-negative: rgba(200, 0, 0, 0.6);
  // borders
  --color-gray: #d5d5d5;
  --color-light-gray: #eaeaea;
  --color-very-light-gray: #f9f9f9;
  --border-dark: 1px solid var(--color-gray);
  --border: 1px solid var(--color-light-gray);
  --border-thick: 2px solid rgba(160, 178, 178, 0.5);
  --box-shadow-active: 0px 0px 0px 1px #ddd;
  --theme: #00a99d;
  --theme-light: rgb(102, 203, 196);
  --color-blue: #2196f3;
  --color-purple:  #673ab7;
  // font format
  --header-1: 600 2.5rem /1.2 -apple-system, BlinkMacSystemFont, 'Open Sans', 'Helvetica Neue', sans-serif;
  --header-1-mobile: 600 1.75rem /1.1 -apple-system, BlinkMacSystemFont, 'Open Sans', 'Helvetica Neue', sans-serif;
  --header-2: 600 2rem /1.2 -apple-system, BlinkMacSystemFont, 'Open Sans', 'Helvetica Neue', sans-serif;
  --header-2-mobile: 600 1.5rem /1.2 -apple-system, BlinkMacSystemFont, 'Open Sans', 'Helvetica Neue', sans-serif;
  --header-3: 400 1.4rem /1.3 -apple-system, BlinkMacSystemFont, 'Open Sans', 'Helvetica Neue', sans-serif;
  --header-3-mobile: 400 1.3rem /1.2 -apple-system, BlinkMacSystemFont, 'Open Sans', 'Helvetica Neue', sans-serif;
  --header-4: 400 1.1rem /1.4 -apple-system, BlinkMacSystemFont, 'Open Sans', 'Helvetica Neue', sans-serif;
  --body-copy-1: 400 1rem /1.6 -apple-system, BlinkMacSystemFont, 'Open Sans', 'Helvetica Neue', sans-serif;
  --body-copy-2: 400 0.95rem /1.6 -apple-system, BlinkMacSystemFont, 'Open Sans', 'Helvetica Neue', sans-serif;
  --body-copy-3: 400 0.8rem /1.6 -apple-system, BlinkMacSystemFont, 'Open Sans', 'Helvetica Neue', sans-serif;
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

p {
  // default unless specified
  font: var(--body-copy-1);
  color: var(--black-p);
}

#app {
  background-color: var(--color-very-light-gray);
}

.main-content {
  /* arbitrary */
  min-height: calc(100vh - 64px);;
  max-width: 800px;
  margin: auto;
  margin-bottom: 20px;
}

.auth-page {
  height: calc(100vh - 64px);
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

a, a:hover {
  cursor: pointer;
  color: inherit;
  text-decoration: inherit;
}

ol, ul {
  margin: 0;
  padding: 0;
}

li {
  list-style-type: none;
}

input, textarea {
  outline: none;
  border: none;
}

textarea {
  border: var(--border);
  border-radius: 2px;
  font: inherit;
  resize: none;
  padding: 10px;
  outline: none;
  margin: 10px 0px;
  width: calc(100% - 20px);
  height: 100px;
  transition: 0.2s border ease-in-out;
}

textarea:focus, textarea:active {
  border: 1px solid #acc;
}

.fade-slide-enter-active {
  transition: opacity 0.5s ease-in-out;
}
.fade-slide-enter {
  opacity: 0;
}

.tooltip {
  display: block !important;
}

</style>
