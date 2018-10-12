import router from './routes'
import store from '../store'

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
