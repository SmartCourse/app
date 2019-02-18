import courseView from '../../views/course'

const questionView = () => import('../../views/Question')
const reviewView = () => import('../../views/Review')
const newQuestionView = () => import('../../views/NewQuestion')
const newReviewView = () => import('../../views/NewReview')
const courseQuestions = () => import('../../views/course/CourseQuestions')
const courseReviews = () => import('../../views/course/CourseReviews')

export default [
  {
    path: '/course/:code([\\w]{8})/',
    props: ({ params: { code } }) => ({
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
    component: courseView
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
  }
]
