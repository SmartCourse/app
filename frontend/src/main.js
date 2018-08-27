import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

import LoadingSpinner from '@/components/LoadingSpinner'

Vue.config.productionTip = false
Vue.component('LoadingSpinner', LoadingSpinner)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
