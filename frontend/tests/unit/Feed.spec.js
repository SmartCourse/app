import { expect } from 'chai'
import { mount, RouterLinkStub } from '@vue/test-utils'
import Feed from '@/components/course/Feed'
import ReviewCard from '@/components/reviews-replies/ReviewCard'
import QuestionCard from '@/components/questions-answers/QuestionCard'

describe('Feed.vue Reviews', () => {
  before(function() {
    this.items = [
      { id: '1', title: 'hey', body: 'wow', likes: 2, published: new Date().toDateString() },
      { id: '2', title: 'blurggh', body: 'wowzers', likes: 3, published: new Date().toDateString() }
    ]
    this.wrapper = mount(Feed, {
      propsData: {
        feedType: 'ReviewCard',
        items: this.items
      },
      stubs: {
        'router-link': RouterLinkStub
      }
    })
  })

  it('Has correct number and type of items', function () {
    expect(this.wrapper.findAll(ReviewCard).length).to.equal(this.items.length)
  })
})

describe('Feed.vue Questions', () => {
  before(function() {
    this.items = [
      { id: '1', title: 'hey', body: 'wow', likes: 2, published: new Date().toDateString() },
      { id: '2', title: 'blurggh', body: 'wowzers', likes: 3, published: new Date().toDateString() },
      { id: '3', title: 'blurggh', body: 'woawders', likes: 3, published: new Date().toDateString() },
      { id: '4', title: 'blurggh', body: 'wdiajdw', likes: 3, published: new Date().toDateString() }
    ]
    this.wrapper = mount(Feed, {
      propsData: {
        feedType: 'QuestionCard',
        items: this.items
      },
      stubs: {
        'router-link': RouterLinkStub
      }
    })
  })

  it('Has correct number and type of items', function () {
    expect(this.wrapper.findAll(QuestionCard).length).to.equal(this.items.length)
  })
})
