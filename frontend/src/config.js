import Vue from 'vue'

// GLOBALS
import LoadingSpinner from '@/components/LoadingSpinner'
import AppLogo from '@/components/AppLogo'
import AppBreadCrumb from '@/components/AppBreadCrumb'

Vue.config.productionTip = false

Vue.component('LoadingSpinner', LoadingSpinner)
Vue.component('AppLogo', AppLogo)
Vue.component('AppBreadCrumb', AppBreadCrumb)
