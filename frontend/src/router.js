import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home'
import Design from './views/Design'

Vue.use(Router)

const questionView = () => import('./views/Question')
const reviewView = () => import('./views/Review')
const newQuestionView = () => import('./views/NewQuestion')
const newReviewView = () => import('./views/NewReview')
const courseInfo = () => import('./views/CourseInfo')
const courseQuestions = () => import('./views/CourseQuestions')
const courseReviews = () => import('./views/CourseReviews')

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/course/:code/',
      props: ({params: { code }}) => ({
        code
      }),
      children: [
        {
          path: '',
          name: 'info',
          component: courseInfo,
          props: ({params: { code }}) => ({
            code
          })
        },
        {
          path: 'questions',
          name: 'questions',
          component: courseQuestions,
          props: ({params: { code }}) => ({
            code
          })
        },
        {
          path: 'reviews',
          name: 'reviews',
          component: courseReviews,
          props: ({params: { code }}) => ({
            code
          })
        }
      ],
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
    },
    {
      path: '/signup',
      component: () => import('./views/SignUp')
    },
    {
      path: '/login',
      component: () => import('./views/Login')
    },
    {
      path: '/fonts',
      component: Design
    }
  ]
})
