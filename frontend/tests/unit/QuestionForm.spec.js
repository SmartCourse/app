import { expect } from 'chai'
import { mount } from '@vue/test-utils'
import QuestionForm from '@/components/questions-answers/QuestionForm'
import AppButton from '@/components/AppButton'

describe('QuestionForm.vue', () => {
  before(function () {
    this.question = { title: 'test question title', body: 'test question' }
    this.wrapper = mount(QuestionForm, {
      propsData: {},
      stubs: {}
    })
    this.wrapper.find('input').setValue(this.question.title)
    this.wrapper.find('textarea').setValue(this.question.body)
    this.wrapper.find(AppButton).trigger('click')
  })

  it('prop data contains question data', function () {
    expect(this.wrapper.vm.$data.title).to.include(this.question.title)
    expect(this.wrapper.vm.$data.body).to.include(this.question.body)
  })

  it('button event fired once with correct answer body', function () {
    expect(this.wrapper.emitted().submitQuestionForm.length).to.equal(1)
    expect(this.wrapper.emitted().submitQuestionForm[0][0]).to.deep.equal(this.question)
  })
})
