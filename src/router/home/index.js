import HomeRoute from '../../views/HomeRoute'
import Feed from '../../views/Feed'
import Home from '../../views/Home'

const children = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/questions',
    name: 'Questions',
    component: Feed,
    props: {
      feedType: 'questions'
    }
  },
  {
    path: '/reviews',
    name: 'Reviews',
    component: Feed,
    props: {
      feedType: 'reviews'
    }
  }
]

export default {
  path: '/',
  component: HomeRoute,
  children,
  props: {
    routes: children
  }
}
