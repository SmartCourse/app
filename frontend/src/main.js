import Vue from 'vue'
import VueAnalytics from 'vue-analytics'

import App from './App'
import router from './router'
import store from './store'
import injectInitialState from './utils/inject-state'
import './config'

// bring in analytics here after app is booted
// https://github.com/MatteoGabriele/vue-analytics/blob/master/docs/page-tracking.md
Vue.use(VueAnalytics, {
  id: 'UA-133002215-1',
  router
})

const app = new Vue({ // eslint-disable-line no-new
  router,
  store,
  render: h => h(App)
})

// reference: https://markus.oberlehner.net/blog/how-to-pre-render-vue-powered-websites-with-webpack/

// During pre-rendering the initial state is
// injected into the global scope, here we
// fill the store with the initial state.
if (window.__INITIAL_STATE__) store.replaceState(window.__INITIAL_STATE__)

router.beforeResolve(async (to, from, next) => {
  try {
    const components = router.getMatchedComponents(to)

    // By using `await` we make sure to wait
    // for the API request made by the `fetch()`
    // method to resolve before rendering the view.
    await Promise.all(components.map(x => x.fetch && x.fetch({ store })))

    // The `injectInitialState()` function injects
    // the current state as a global variable
    // `__INITIAL_STATE__` if the page is currently
    // pre-rendered.
    if (window.__PRERENDER_INJECTED) injectInitialState(store.state)
  } catch (error) {
    // This is the place for error handling in
    // case the API request fails for example.
    console.log(error)
  }

  return next()
})

app.$mount('#app')
