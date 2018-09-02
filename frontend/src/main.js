import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

// GLOBALS
import LoadingSpinner from '@/components/LoadingSpinner'
import AppLogo from '@/components/AppLogo'

Vue.config.productionTip = false
Vue.component('LoadingSpinner', LoadingSpinner)
Vue.component('AppLogo', AppLogo)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
