import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import AnswerCard from '@/components/questions-answers/AnswerCard'

describe('AnswerCard.vue', () => {
  before(function () {
    this.card = {
      id: 1,
      likes: 10,
      published: new Date().toDateString(),
      body:
        'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto'
    }
    this.wrapper = shallowMount(AnswerCard, {
      propsData: { answer: this.card },
      stubs: {}
    })
  })

  it('renders answer data', function () {
    expect(this.wrapper.findAll('p').at(1).text()).to.include(this.card.likes)
  })

  it('renders answer publish time', function () {
    expect(this.wrapper.find('time').text()).to.include(this.card.published)
  })

  it('renders answer body', function () {
    expect(this.wrapper.findAll('p').at(3).text()).to.include(this.card.body)
  })
})
