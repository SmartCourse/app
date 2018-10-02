import { expect } from 'chai'
import { mount } from '@vue/test-utils'
import ReviewForm from '@/components/reviews-replies/ReviewForm'
import AppButton from '@/components/AppButton'

describe('ReviewForm.vue', () => {
  before(function () {
    this.review = { title: 'test review title', body: 'test review', recommend: 'true', difficulty: 2 }
    this.cbstub = (reviewData) => expect(reviewData).to.deep.equal(this.review)

    this.wrapper = mount(ReviewForm, {
      propsData: { callback: this.cbstub },
      stubs: {}
    })
    this.wrapper.find('input').setValue(this.review.title)
    this.wrapper.find('textarea').setValue(this.review.body)
    this.wrapper.findAll('input').at('1').trigger('click')
    this.wrapper.find(AppButton).trigger('click')
  })

  it('prop data contains review data', function () {
    expect(this.wrapper.vm.$data.title).to.include(this.review.title)
    expect(this.wrapper.vm.$data.body).to.include(this.review.body)
    expect(this.wrapper.vm.$data.recommend).to.include(this.review.recommend)
  })
})
