import { expect } from 'chai'
import { mount } from '@vue/test-utils'
import CommentForm from '@/components/comments/CommentForm'
import AppButton from '@/components/AppButton'

describe('CommentForm.vue', () => {
  before(function () {
    this.comment = { body: 'test comment' }
    this.cbstub = (commentData) => expect(commentData).to.deep.equal(this.comment)

    this.wrapper = mount(CommentForm, {
      propsData: { callback: this.cbstub, type: 'Answer' },
      stubs: {}
    })

    this.wrapper.find('textarea').setValue(this.comment.body)
    this.wrapper.find(AppButton).trigger('click')
  })

  it('comment body is correcto', function () {
    expect(this.wrapper.vm.$data.body).to.include(this.comment.body)
  })
  it('comment form type is rendered in title and button', function () {
    expect(this.wrapper.find('h3').text()).to.include('Answer')
    expect(this.wrapper.find(AppButton).text()).to.include('Answer')
  })
})
