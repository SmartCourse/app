import { expect } from 'chai'
import { shallowMount, RouterLinkStub } from '@vue/test-utils'
import QuestionCard from '@/components/questions-answers/QuestionCard'

describe('QuestionCard.vue', () => {
  before(function () {
    this.card = {
      id: 1,
      likes: 10,
      published: new Date().toDateString(),
      title:
        'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
      body:
        'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto'
    }
    this.wrapper = shallowMount(QuestionCard, {
      propsData: { ...this.card },
      stubs: {
        'router-link': RouterLinkStub
      }
    })
  })
  it('renders question data', function () {
    expect(this.wrapper.findAll('p').at(1).text()).to.include(this.card.likes)
  })

  it('renders question title', function () {
    expect(this.wrapper.find('h2').text()).to.include(this.card.title)
  })

  it('renders question publish time', function () {
    expect(new Date(this.wrapper.find('time').text()).toDateString()).to.deep.equal(this.card.published)
  })

  it('renders question body', function () {
    expect(this.wrapper.findAll('p').at(3).text()).to.include(this.card.body)
  })
})
