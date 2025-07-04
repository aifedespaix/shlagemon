import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { describe, expect, it } from 'vitest'
import ZonePanel from '../src/components/panels/ZonePanel.vue'
import ZoneActions from '../src/components/village/ZoneActions.vue'
import { carapouffe } from '../src/data/shlagemons'
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
    store.setZone('grotte-du-slip')
    expect(store.current.id).toBe('grotte-du-slip')
  })
})

describe('zone panel', () => {
  it('renders actions', () => {
    const pinia = createPinia()
    setActivePinia(pinia)
    const wrapper = mount(ZonePanel, {
      global: { plugins: [pinia] },
    })
    // first zone is the noobi room which has no actions
    expect(wrapper.text()).toContain('La Chambre du Noobi')
  })

  it('filters zones by level', async () => {
    const pinia = createPinia()
    setActivePinia(pinia)
    const dex = useShlagedexStore()
    const progress = useZoneProgressStore()
    const mon = dex.createShlagemon(carapouffe)
    const wrapper = mount(ZonePanel, {
      global: { plugins: [pinia] },
    })
    let btn = wrapper.findAll('button').find(b => b.text().includes('Grotte du Slip'))
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
    btn = wrapper.findAll('button').find(b => b.text().includes('Grotte du Slip'))
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
    expect(wrapper.text()).toContain('Défier le roi de la zone')
  })

  it('disables zone buttons during trainer battle', async () => {
    const pinia = createPinia()
    setActivePinia(pinia)
    const dex = useShlagedexStore()
    dex.createShlagemon(carapouffe)
    const panel = useMainPanelStore()
    const wrapper = mount(ZonePanel, { global: { plugins: [pinia] } })
    panel.showTrainerBattle()
    await wrapper.vm.$nextTick()
    const buttons = wrapper.findAll('div.flex-wrap button')
    expect(buttons.length).toBeGreaterThan(0)
    expect(buttons.every(b => b.attributes('disabled') !== undefined)).toBe(true)
  })

  it('disables zone buttons when dialog is visible', async () => {
    const pinia = createPinia()
    setActivePinia(pinia)
    const wrapper = mount(ZonePanel, { global: { plugins: [pinia] } })
    await wrapper.vm.$nextTick()
    const buttons = wrapper.findAll('div.flex-wrap button')
    expect(buttons.length).toBeGreaterThan(0)
    expect(buttons.every(b => b.attributes('disabled') !== undefined)).toBe(true)
  })
})
