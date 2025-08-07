import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import ShopItemCard from '../src/components/shop/ItemCard.vue'
import ShopItemDetail from '../src/components/shop/ItemDetail.vue'
import { hyperShlageball, superShlageball } from '../src/data/items/shlageball'

vi.mock('vue-i18n', () => ({ useI18n: () => ({ t: (k: string) => k }) }))
vi.mock('../src/stores/game', () => ({
  useGameStore: () => ({ shlagidolar: 1000, shlagidiamond: 0 }),
}))

describe('shop ball hue rotation', () => {
  it('applies hue rotation on super shlageball card', () => {
    const wrapper = mount(ShopItemCard, {
      props: { item: superShlageball },
      global: {
        stubs: {
          UiListItem: { template: '<div><slot name="left"/><slot/><slot name="right"/></div>' },
          UiCurrencyAmount: true,
        },
      },
    })
    const img = wrapper.get('img')
    expect(img.attributes('style')).toContain('hue-rotate(120deg)')
  })

  it('applies hue rotation on hyper shlageball detail', () => {
    const wrapper = mount(ShopItemDetail, {
      props: { item: hyperShlageball },
      global: {
        stubs: {
          UiCurrencyAmount: true,
          UiButton: true,
          UiNumberInput: true,
        },
      },
    })
    const img = wrapper.get('img')
    expect(img.attributes('style')).toContain('hue-rotate(240deg)')
  })
})
