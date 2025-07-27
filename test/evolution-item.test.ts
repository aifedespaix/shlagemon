import { createPinia, setActivePinia } from 'pinia'
import { describe, expect, it, vi } from 'vitest'
import { thunderStone } from '../src/data/items'
import { pikachiant } from '../src/data/shlagemons/15-20/pikachiant'
import { useEvolutionStore } from '../src/stores/evolution'
import { useShlagedexStore } from '../src/stores/shlagedex'

describe('item evolution', () => {
  it('prompts even when evolution is disabled', async () => {
    setActivePinia(createPinia())
    const dex = useShlagedexStore()
    const evo = useEvolutionStore()
    const spy = vi.spyOn(evo, 'requestEvolution').mockResolvedValue(true)
    const mon = dex.createShlagemon(pikachiant)
    mon.allowEvolution = false
    const result = await dex.evolveWithItem(mon, thunderStone)
    expect(result).toBe(true)
    expect(spy).toHaveBeenCalled()
    expect(mon.base.id).toBe('raichiotte')
  })
})
