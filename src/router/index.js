import router from './routes'
import store from '../store'

router.beforeEach(async function(to, from, next) {
  // wait here until auth check is completed
  await store.getters['auth/authCV'].wait()

  const authState = store.getters['auth/isLoggedIn']

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (authState) {
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})

export default router
