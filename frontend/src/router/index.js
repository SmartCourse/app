import routes from '.'
import store from '../store'
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// requires meta field to be be added to routes object
const router = new Router(routes)

router.beforeEach((to, from, next) => {
  const authState = store.getters['auth/isLoggedIn']

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (authState) {
      next()
    } else {
      next('/login')
    }
  } else if (to.matched.some(record => record.meta.preAuth)) {
    if (!authState) {
      next()
    } else {
      next('/subjects')
    }
  } else {
    next()
  }
})

export default router
