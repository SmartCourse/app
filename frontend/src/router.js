import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home'

Vue.use(Router)

const questionView = () => import('./views/Question')
const reviewView = () => import('./views/Review')
const newQuestionView = () => import('./views/NewQuestion')
const newReviewView = () => import('./views/NewReview')
const courseInfo = () => import('./views/course/CourseInfo')
const courseQuestions = () => import('./views/course/CourseQuestions')
const courseReviews = () => import('./views/course/CourseReviews')
const subjectList = () => import('./views/SubjectList')
const subjectCourses = () => import('./views/SubjectCourses')

export default new Router({
  mode: 'history',
  scrollBehavior (to, from, savedPosition) {
    // scroll to top of page on following a route, unless history state used
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/subject',
      name: 'subjectList',
      component: subjectList
    },
    {
      path: '/subject/:code',
      name: 'subjectCourses',
      props: ({params: { code }}) => ({
        code
      }),
      component: subjectCourses
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
      component: () => import('./views/course')
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
      name: 'Sign Up',
      component: () => import('./views/SignUp')
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('./views/Login')
    },
    {
      path: '/fonts',
      component: () => import('./views/Design')
    }
  ]
})
