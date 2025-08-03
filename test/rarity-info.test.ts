import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { createI18n } from 'vue-i18n'
import RarityInfo from '../src/components/shlagemon/RarityInfo.vue'

describe('component RarityInfo.vue', () => {
  it('renders rarity value with tooltip', () => {
    const i18n = createI18n({
      legacy: false,
      locale: 'en',
      messages: { en: { components: { shlagemon: { RarityInfo: { tooltip: 'Rarity' } } } } },
    })

    const wrapper = mount(RarityInfo, {
      props: { rarity: 42 },
      global: { plugins: [i18n] },
    })

    expect(wrapper.text()).toContain('42')
    expect(wrapper.html()).toMatchSnapshot()
  })
})
