import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home'
import Design from './views/Design'

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
      component: () => import('./views/NewQuestion')
    },
    {
      path: '/course/:code/question/:id',
      name: 'question',
      props: ({params: { code, id }}) => ({
        code,
        id
      }),
      component: () => import('./views/Question')
    },
    {
      path: '/course/:code/review/new',
      name: 'newReview',
      props: ({params: { code }}) => ({
        code
      }),
      component: () => import('./views/NewReview')
    },
    {
      path: '/course/:code/review/:id',
      name: 'review',
      props: ({params: { code, id }}) => ({
        code,
        id
      }),
      component: () => import('./views/Review')
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
