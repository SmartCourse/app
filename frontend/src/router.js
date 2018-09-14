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
      path: '/course/:code',
      props: ({params: { code }}) => ({
        code
      }),
      // route level code-splitting
      // this generates a separate chunk (course.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('./views/Course')
    },  
    {
      path: '/course/:code/question/new',
      name: 'newQuestion',
      props: ({params: { code }}) => ({
        code
      }),
      component: newQuestionView
    },
    {
      path: '/course/:code/question/:id',
      name: 'question',
      props: ({params: { code, id }}) => ({
        code,
        id
      }),
      component: questionView
    },
    {
      path: '/course/:code/review/new',
      name: 'newReview',
      props: ({params: { code }}) => ({
        code
      }),
      component: newReviewView
    },
    {
      path: '/course/:code/review/:id',
      name: 'review',
      props: ({params: { code, id }}) => ({
        code,
        id
      }),
      component: reviewView
    }
  ]
})
