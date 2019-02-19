import Vue from 'vue'
import Router from 'vue-router'
import homeRoutes from './home'
import courseRoutes from './course'

Vue.use(Router)

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
    homeRoutes,
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
    ...courseRoutes,
    {
      path: '/signup',
      name: 'Sign Up',
      component: () => import('../views/SignUp')
    },
    {
      path: '/verify-email',
      name: 'Verify Email',
      component: () => import('../views/VerifyEmail')
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
