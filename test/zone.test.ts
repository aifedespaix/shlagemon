import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { describe, expect, it, vi } from 'vitest'
import ZonePanel from '../src/components/panel/Zone.vue'
import ZoneActions from '../src/components/village/ZoneActions.vue'
import { carapouffe } from '../src/data/shlagemons/carapouffe'
import { useMainPanelStore } from '../src/stores/mainPanel'
import { useShlagedexStore } from '../src/stores/shlagedex'
import { useZoneStore } from '../src/stores/zone'
import { useZoneProgressStore } from '../src/stores/zoneProgress'
import { xpForLevel } from '../src/utils/dexFactory'

describe('zone store', () => {
  it('changes current zone', () => {
    setActivePinia(createPinia())
    const store = useZoneStore()
    expect(store.current.id).toBe(store.zones[0].id)
    store.setZone('chemin-du-slip')
    expect(store.current.id).toBe('chemin-du-slip')
  })
})

describe('zone panel', () => {
  it('renders actions', () => {
    const pinia = createPinia()
    setActivePinia(pinia)
    const wrapper = mount(ZonePanel, {
      global: { plugins: [pinia], provide: { selectZone: vi.fn() } },
    })
    // first zone is now the Plaine Kékette
    expect(wrapper.text()).toContain('Plaine Kékette')
  })

  it('filters zones by level', async () => {
    const pinia = createPinia()
    setActivePinia(pinia)
    const dex = useShlagedexStore()
    const progress = useZoneProgressStore()
    const mon = dex.createShlagemon(carapouffe)
    const wrapper = mount(ZonePanel, {
      global: { plugins: [pinia], provide: { selectZone: vi.fn() } },
    })
    let btn = [
      ...wrapper.findAll('#savages button'),
      ...wrapper.findAll('#villages button'),
    ].find(b => b.text().includes('Chemin du Slip'))
    expect(btn).toBeUndefined()
    for (let i = 0; i < 20; i++)
      progress.addWin('plaine-kekette')
    for (let i = 0; i < 20; i++)
      progress.addWin('bois-de-bouffon')
    progress.defeatKing('plaine-kekette')
    progress.defeatKing('bois-de-bouffon')
    for (let i = 0; i < 9; i++)
      await dex.gainXp(mon, xpForLevel(mon.lvl))
    await wrapper.vm.$nextTick()
    btn = [
      ...wrapper.findAll('#savages button'),
      ...wrapper.findAll('#villages button'),
    ].find(b => b.text().includes('Chemin du Slip'))
    expect(btn).toBeDefined()
  })

  it('shows king button after 20 wins', async () => {
    const pinia = createPinia()
    setActivePinia(pinia)
    const progress = useZoneProgressStore()
    const zone = useZoneStore()
    const wrapper = mount(ZoneActions, { global: { plugins: [pinia] } })
    zone.setZone('plaine-kekette')
    await wrapper.vm.$nextTick()
    expect(wrapper.text()).not.toContain('Défier le roi')
    for (let i = 0; i < 20; i++)
      progress.addWin('plaine-kekette')
    await wrapper.vm.$nextTick()
    expect(wrapper.text()).toContain('Défier la roi de la zone')
  })

  it('disables zone buttons during trainer battle', async () => {
    const pinia = createPinia()
    setActivePinia(pinia)
    const dex = useShlagedexStore()
    dex.createShlagemon(carapouffe)
    const panel = useMainPanelStore()
    const wrapper = mount(ZonePanel, {
      global: { plugins: [pinia], provide: { selectZone: vi.fn() } },
    })
    panel.showTrainerBattle()
    await wrapper.vm.$nextTick()
    const buttons = [
      ...wrapper.findAll('#savages button'),
      ...wrapper.findAll('#villages button'),
    ]
    expect(buttons.length).toBeGreaterThan(0)
    expect(buttons.every(b => b.attributes('disabled') !== undefined)).toBe(true)
  })

  it('disables zone buttons when dialog is visible', async () => {
    const pinia = createPinia()
    setActivePinia(pinia)
    const wrapper = mount(ZonePanel, {
      global: { plugins: [pinia], provide: { selectZone: vi.fn() } },
    })
    await wrapper.vm.$nextTick()
    const buttons = [
      ...wrapper.findAll('#savages button'),
      ...wrapper.findAll('#villages button'),
    ]
    expect(buttons.length).toBeGreaterThan(0)
    expect(buttons.every(b => b.attributes('disabled') !== undefined)).toBe(true)
  })
})
