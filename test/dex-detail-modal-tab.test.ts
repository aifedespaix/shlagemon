import { createPinia, setActivePinia } from 'pinia'
import { describe, expect, it } from 'vitest'
import { createApp } from 'vue'
import { carapouffe } from '../src/data/shlagemons/carapouffe'
import { useDexDetailModalStore } from '../src/stores/dexDetailModal'
import { useMobileTabStore } from '../src/stores/mobileTab'
import { useShlagedexStore } from '../src/stores/shlagedex'

describe('dex detail modal', () => {
  it('does not change mobile tab when opened', () => {
    const pinia = createPinia()
    const app = createApp({})
    app.use(pinia)
    setActivePinia(pinia)

    const dex = useShlagedexStore()
    const mon = dex.createShlagemon(carapouffe)

    const mobile = useMobileTabStore()
    mobile.set('inventory')

    const modal = useDexDetailModalStore()
    modal.open(mon)

    expect(mobile.current).toBe('inventory')
  })
})
