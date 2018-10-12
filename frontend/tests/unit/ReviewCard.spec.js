import { expect } from 'chai'
import { mount, RouterLinkStub } from '@vue/test-utils'
import ReviewCard from '@/components/reviews-replies/ReviewCard'
import CardHeader from '@/components/Card/Header'

describe('ReviewCard.vue', () => {
  before(function () {
    this.card = {
      id: '1',
      likes: 10,
      published: new Date().toDateString(),
      title:
        'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
      body:
        'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto'
    }
    this.wrapper = mount(ReviewCard, {
      propsData: { ...this.card, code: 'COMP4920' },
      stubs: {
        'router-link': RouterLinkStub
      }
    })
  })
  it('renders review data', function () {
    expect(this.wrapper.findAll('p').at(1).text()).to.include(this.card.likes)
  })

  it('renders review title', function () {
    expect(this.wrapper.find(CardHeader).text()).to.include(this.card.title)
  })

  it('renders review publish time', function () {
    expect(this.wrapper.find('time').text()).to.equal(this.card.published)
  })

  it('renders review body', function () {
    expect(this.wrapper.findAll('p').at(3).text()).to.include(this.card.body)
  })
})
