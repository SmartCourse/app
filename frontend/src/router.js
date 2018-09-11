import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/course/:id',
      props: ({params: { id }}) => ({
        id
      }),
      // route level code-splitting
      // this generates a separate chunk (course.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('./views/Course')
    },
    {
      path: '/question',
      name: 'newQuestion',
      props: ({query: { cid }}) => ({
        courseID: String(cid)
      }),
      component: () => import('./views/Question')
    },
    {
      path: '/question/:id',
      name: 'question',
      props: ({params: { id }}) => ({
        questionID: String(id)
      }),
      component: () => import('./views/Question')
    },
    {
      path: '/review/:id',
      name: 'review',
      props: ({params: { id }}) => ({
        id
      }),
      component: () => import('./views/Review')
    }
  ]
})
