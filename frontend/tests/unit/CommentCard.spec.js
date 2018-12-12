import { expect } from 'chai'
import { mount, RouterLinkStub } from '@vue/test-utils'
import CommentCard from '@/components/Comments/CommentCard'
import Vote from '@/components/Vote'

describe('CommentCard.vue', () => {
  before(function () {
    this.card = {
      id: 1,
      likes: 10,
      published: new Date().toDateString(),
      body:
        'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto',
      user: {
        displayName: 'Henry',
        id: 0
      }
    }
    this.wrapper = mount(CommentCard, {
      propsData: { comment: this.card },
      stubs: {
        'router-link': RouterLinkStub
      }
    })
  })

  it('renders comment data', function () {
    expect(this.wrapper.find(Vote).text()).to.include(this.card.likes)
  })

  it('renders comment publish time', function () {
    expect(this.wrapper.find('time').text()).to.include(this.card.published)
  })

  it('renders comment body', function () {
    expect(this.wrapper.find('.content').text()).to.include(this.card.body)
  })
})
