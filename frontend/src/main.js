import Vue from 'vue'
import VTooltip from 'v-tooltip'
import App from './App'
import router from './router'
import store from './store'
import './config'

Vue.use(VTooltip)

new Vue({ // eslint-disable-line no-new
  el: '#app',
  router,
  store,
  render: h => h(App)
})
