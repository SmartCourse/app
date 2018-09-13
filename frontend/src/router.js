import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home'

Vue.use(Router)

const questionView = () => import('./views/Question')
const reviewView = () => import('./views/Review')

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
      component: questionView
    },
    {
      path: '/question/:id',
      name: 'question',
      props: ({params: { id }}) => ({
        questionID: String(id)
      }),
      component: questionView
    },
    {
      path: '/review',
      name: 'newReview',
      props: ({query: { cid }}) => ({
        courseID: String(cid)
      }),
      component: reviewView
    },
    {
      path: '/review/:id',
      name: 'review',
      props: ({params: { id }}) => ({
        reviewID: String(id)
      }),
      component: reviewView
    }
  ]
})
