import { expect } from 'chai'
import { mount } from '@vue/test-utils'
import ReviewForm from '@/components/Reviews/ReviewForm'
import Options from '@/components/Reviews/ReviewOptions'
import AppButton from '@/components/AppButton'

describe('ReviewForm.vue', () => {
  before(function () {
    this.review = { title: 'test review title', body: 'test review', recommend: '', enjoy: '' }
    this.cbstub = () => true

    this.wrapper = mount(ReviewForm, {
      propsData: { callback: this.cbstub },
      stubs: {}
    })
    this.wrapper.find('input').setValue(this.review.title)
    this.wrapper.find('textarea').setValue(this.review.body)
    this.wrapper.findAll(Options).at(0).trigger('click')
    this.wrapper.findAll(Options).at(1).trigger('click')
    this.wrapper.findAll(Options).at(2).trigger('click')
    this.wrapper.find(AppButton).trigger('click')
  })

  it('prop data contains review title', function () {
    expect(this.wrapper.vm.$data.title).to.include(this.review.title)
  })

  it('prop data contains review body', function () {
    expect(this.wrapper.vm.$data.body).to.include(this.review.body)
  })

  it('prop data contains review recommend correctly matched', function () {
    expect(this.wrapper.vm.$data.recommend).to.include(this.review.recommend)
  })

  it('prop data contains enjoy correctly matched', function () {
    expect(this.wrapper.vm.$data.enjoy).to.include(this.review.enjoy)
  })
})
