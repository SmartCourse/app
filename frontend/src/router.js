import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home'

Vue.use(Router)

const questionView = () => import('./views/Question')
const reviewView = () => import('./views/Review')
const newQuestionView = () => import('./views/NewQuestion')
const newReviewView = () => import('./views/NewReview')

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
      component: newQuestionView
    },
    {
      path: '/question/:id',
      name: 'question',
      props: ({params: { id }}) => ({
        id: String(id)
      }),
      component: questionView
    },
    {
      path: '/review',
      name: 'newReview',
      props: ({query: { cid }}) => ({
        courseID: String(cid)
      }),
      component: newReviewView
    },
    {
      path: '/review/:id',
      name: 'review',
      props: ({params: { id }}) => ({
        id: String(id)
      }),
      component: reviewView
    }
  ]
})
