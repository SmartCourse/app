import { expect } from 'chai'
import { mount } from '@vue/test-utils'
import QuestionForm from '@/components/Questions/QuestionForm'
import AppButton from '@/components/AppButton'

describe('QuestionForm.vue', () => {
  before(function () {
    this.question = { title: 'test question title', body: 'test question' }
    this.cbstub = (questionData) => expect(questionData).to.deep.equal(this.question)

    this.wrapper = mount(QuestionForm, {
      propsData: { callback: this.cbstub },
      stubs: {}
    })
    this.wrapper.find('input').setValue(this.question.title)
    this.wrapper.find('textarea').setValue(this.question.body)
    this.wrapper.find(AppButton).trigger('click')
  })

  it('has the right body', function () {
    expect(this.wrapper.vm.$data.body).to.include(this.question.body)
  })

  it('has the right title', function () {
    expect(this.wrapper.vm.$data.title).to.include(this.question.title)
  })
})
