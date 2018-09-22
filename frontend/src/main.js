import Vue from 'vue'
import App from './App'

import router from './router'
import store from './store'

// GLOBALS
import LoadingSpinner from '@/components/LoadingSpinner'
import AppLogo from '@/components/AppLogo'

Vue.config.productionTip = false
Vue.config.devtools = true
Vue.component('LoadingSpinner', LoadingSpinner)
Vue.component('AppLogo', AppLogo)

// read this on a blog == basically if the auth doesn't get ready in time
// it can not realise the user is authenticated.
// Notably this happens on page load / refresh.
new Vue({ // eslint-disable-line no-new
  el: '#app',
  router,
  store,
  render: h => h(App)
})
