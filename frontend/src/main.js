import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import './config'

new Vue({ // eslint-disable-line no-new
  el: '#app',
  router,
  store,
  render: h => h(App)
})
