import { expect } from 'chai'
import { mount } from '@vue/test-utils'
import AnswerForm from '@/components/questions-answers/AnswerForm'
import AppButton from '@/components/AppButton'

describe('AnswerForm.vue', () => {
  before(function () {
    this.answer = { body: 'test answer' }
    this.wrapper = mount(AnswerForm, {
      propsData: {},
      stubs: {}
    })
    this.wrapper.find('textarea').setValue(this.answer.body)
    this.wrapper.find(AppButton).trigger('click')
  })

  it('prop data contains answer body', function () {
    expect(this.wrapper.vm.$data.body).to.include(this.answer.body)
  })

  it('button event fired once with correct answer body', function () {
    expect(this.wrapper.emitted().submitAnswerForm.length).to.equal(1)
    expect(this.wrapper.emitted().submitAnswerForm[0][0].body).to.equal(this.answer.body)
  })
})
