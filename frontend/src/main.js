import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

// GLOBALS
import LoadingSpinner from '@/components/LoadingSpinner'
import AppLogo from '@/components/AppLogo'
import AppBreadCrumb from '@/components/AppBreadCrumb'

Vue.config.productionTip = false
Vue.config.devtools = true
Vue.component('LoadingSpinner', LoadingSpinner)
Vue.component('AppLogo', AppLogo)
Vue.component('AppBreadCrumb', AppBreadCrumb)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
