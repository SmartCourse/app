import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import Feed from '@/components/Feed.vue'

describe('Feed.vue', () => {
  it('renders props.title when passed', () => {
    const title = 'new message'
    const wrapper = shallowMount(Feed, {
      propsData: { title }
    })
    expect(wrapper.text()).to.include(title)
  })
})
