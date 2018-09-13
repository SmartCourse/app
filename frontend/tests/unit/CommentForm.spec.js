import { expect } from 'chai'
import { mount } from '@vue/test-utils'
import CommentForm from '@/components/comments/CommentForm'
import AppButton from '@/components/AppButton'

describe('CommentForm.vue', () => {
  before(function () {
    this.comment = { body: 'test comment' }
    this.wrapper = mount(CommentForm, {
      propsData: {},
      stubs: {}
    })
    this.wrapper.find('textarea').setValue(this.comment.body)
    this.wrapper.find(AppButton).trigger('click')
  })

  it('prop data contains comment body', function () {
    expect(this.wrapper.vm.$data.body).to.include(this.comment.body)
  })

  it('button event fired once with correct comment body', function () {
    expect(this.wrapper.emitted().submitCommentForm.length).to.equal(1)
    expect(this.wrapper.emitted().submitCommentForm[0][0]).to.deep.equal(this.comment)
  })
})
