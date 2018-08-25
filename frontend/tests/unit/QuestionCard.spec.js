import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import QuestionCard from '@/components/QuestionCard.vue'

describe('QuestionCard.vue', () => {
  it('renders question data', () => {
    const card = {}
    const wrapper = shallowMount(QuestionCard, {
      propsData: { question: card }
    })
    expect(wrapper.text()).to.include(JSON.stringify(card))
  })
})
