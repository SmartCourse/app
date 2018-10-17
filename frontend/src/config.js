import Vue from 'vue'

// GLOBALS
import LoadingSpinner from '@/components/LoadingSpinner'
import AppLogo from '@/components/AppLogo'
import AppBreadCrumb from '@/components/AppBreadCrumb'

// import VTooltip from 'v-tooltip'
// Vue.use(VTooltip)

Vue.config.productionTip = false

// TODO remove me
Vue.config.devtools = true

Vue.component('LoadingSpinner', LoadingSpinner)
Vue.component('AppLogo', AppLogo)
Vue.component('AppBreadCrumb', AppBreadCrumb)
