import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home'

Vue.use(Router)

const questionView = () => import('../views/Question')
const reviewView = () => import('../views/Review')
const newQuestionView = () => import('../views/NewQuestion')
const newReviewView = () => import('../views/NewReview')
const courseQuestions = () => import('../views/course/CourseQuestions')
const courseReviews = () => import('../views/course/CourseReviews')
const subjectList = () => import('../views/SubjectList')
const subjectCourses = () => import('../views/SubjectCourses')
const ErrorPage = () => import('../views/404')

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
      path: '/subject/:code([\\w]{4})',
      name: 'subjectCourses',
      props: ({ params: { code } }) => ({
        code
      }),
      component: subjectCourses
    },
    {
      path: '/course/:code([\\w]{8})/',
      props: ({params: { code }}) => ({
        code
      }),
      children: [
        {
          path: 'questions',
          name: 'questions',
          component: courseQuestions,
          props: ({ params: { code } }) => ({
            code
          })
        },
        {
          path: '/',
          name: 'info',
          component: courseReviews,
          props: ({ params: { code } }) => ({
            code
          })
        }
      ],
      // route level code-splitting
      // this generates a separate chunk (course.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/course')
    },
    {
      path: '/course/:code([\\w]{8})/question/new',
      name: 'newQuestion',
      props: ({ params: { code } }) => ({
        code
      }),
      component: newQuestionView,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/course/:code([\\w]{8})/question/:id',
      name: 'question',
      props: ({ params: { code, id } }) => ({
        code,
        id
      }),
      component: questionView
    },
    {
      path: '/course/:code([\\w]{8})/review/new',
      name: 'newReview',
      props: ({ params: { code } }) => ({
        code
      }),
      component: newReviewView,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/course/:code([\\w]{8})/review/:id',
      name: 'review',
      props: ({ params: { code, id } }) => ({
        code,
        id
      }),
      component: reviewView
    },
    {
      path: '/signup',
      name: 'Sign Up',
      component: () => import('../views/SignUp')
    },
    {
      path: '/create-profile',
      name: 'Create Profile',
      component: () => import('../views/CreateProfile')
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('../views/Login')
    },
    {
      path: '/profile',
      name: 'My Profile',
      component: () => import('../views/MyProfile')
    },
    {
      path: '/profile/:id',
      name: 'Profile',
      props: ({ params: { id } }) => ({
        id
      }),
      component: () => import('../views/Profile')
    },
    {
      path: '/password-reset',
      name: 'Forgot Password',
      component: () => import('../views/ForgotPassword')
    },
    {
      path: '/terms-of-service',
      name: 'terms-of-service',
      component: () => import('../views/TermsOfService')
    },
    {
      path: '/privacy-policy',
      name: 'privacy-policy',
      component: () => import('../views/PrivacyPolicy')
    },
    {
      path: '/fonts',
      component: () => import('../views/Design')
    },
    {
      // match any other route
      path: '*',
      component: ErrorPage
    }
  ]
})
