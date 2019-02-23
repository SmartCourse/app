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
  async created() {
    return Promise.all([
      this.$store.dispatch('getCourses'),
      this.$store.dispatch('auth/checkAuth'),
      this.$store.dispatch('subject/getSubjects'),
      this.$store.dispatch('getFaculties'),
      this.$store.dispatch('getDegrees'),
      this.$store.dispatch('getSessions')
    ])
  }
}

</script>

<style lang="less">
#app {
  background-color: var(--color-very-light-gray);
}

.main-content {
  /* arbitrary */
  min-height: calc(100vh - 64px);
  max-width: 850px;
  margin: auto;
  margin-bottom: 20px;
}

.auth-page {
  min-height: calc(100vh - 64px);
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
  resize: vertical;
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
