import { createPinia, setActivePinia } from 'pinia'
import { describe, expect, it } from 'vitest'
import { carapouffe } from '../src/data/shlagemons/carapouffe'
import { useShlagedexStore } from '../src/stores/shlagedex'

describe('busy shlagemon restrictions', () => {
  it('cannot be set as active when busy', () => {
    setActivePinia(createPinia())
    const dex = useShlagedexStore()
    const mon = dex.createShlagemon(carapouffe)
    mon.busy = true
    dex.setActiveShlagemon(mon)
    expect(dex.activeShlagemon).toBeNull()
  })
})
