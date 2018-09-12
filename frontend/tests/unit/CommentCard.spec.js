import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import CommentCard from '@/components/comments/CommentCard'

describe('CommentCard.vue', () => {
  before(function () {
    this.card = {
      id: 1,
      likes: 10,
      published: new Date().toDateString(),
      body:
        'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto'
    }
    this.wrapper = shallowMount(CommentCard, {
      propsData: { comment: this.card },
      stubs: {}
    })
  })

  it('renders comment data', function () {
    expect(this.wrapper.findAll('p').at(1).text()).to.include(this.card.likes)
  })

  it('renders comment publish time', function () {
    expect(this.wrapper.find('time').text()).to.include(this.card.published)
  })

  it('renders comment body', function () {
    expect(this.wrapper.findAll('p').at(3).text()).to.include(this.card.body)
  })
})