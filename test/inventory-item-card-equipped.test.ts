import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import { ref } from 'vue'
import InventoryItemCard from '../src/components/inventory/ItemCard.vue'

vi.mock('vue-i18n', () => ({ useI18n: () => ({ t: (k: string) => k }) }))
vi.mock('../src/stores/itemUsage', () => ({ useItemUsageStore: () => ({ used: {}, markUsed: vi.fn() }) }))
vi.mock('../src/stores/shortcuts', () => ({ useShortcutsStore: () => ({ shortcuts: ref([]) }) }))
vi.mock('../src/stores/itemShortcutModal', () => ({ useItemShortcutModalStore: () => ({ open: vi.fn() }) }))
vi.mock('../src/stores/ui', () => ({ useUIStore: () => ({ isMobile: ref(false) }) }))
vi.mock('../src/stores/battleItemCooldown', () => ({ useBattleItemCooldownStore: () => ({ isActive: false }) }))

describe('inventoryItemCard equipped state', () => {
  it('disables only the action button when item is equipped', () => {
    const item = { id: 'test', name: 'test', description: 'desc', wearable: true, category: 'activable', icon: 'i-test' }
    const wrapper = mount(InventoryItemCard, {
      props: { item, qty: 1, disabled: false, actionDisabled: true },
      global: {
        stubs: {
          UiListItem: { props: ['disabled'], template: '<div class="list-item" :data-disabled="disabled"><slot /></div>' },
          UiButton: { props: ['disabled'], template: '<button :disabled="disabled"><slot /></button>' },
          UiModal: { template: '<div><slot /></div>' },
          UiKbd: true,
          UiImageByBackground: true,
        },
      },
    })
    const list = wrapper.get('.list-item')
    expect(list.attributes('data-disabled')).toBe('false')
    const btn = wrapper.get('button')
    expect(btn.attributes()).toHaveProperty('disabled')
  })
})
