import { createPinia, setActivePinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { describe, expect, it } from 'vitest'
import { allShlagemons } from '../src/data/shlagemons'
import { useEggStore } from '../src/stores/egg'
import { eggSerializer } from '../src/utils/egg-serialize'

describe('egg persistence', () => {
  it('restores incubator from storage', () => {
    const pinia = createPinia()
    pinia.use(piniaPluginPersistedstate)
    setActivePinia(pinia)

    const stored = eggSerializer.serialize({
      incubator: [
        {
          id: 1,
          type: 'feu',
          base: allShlagemons[0],
          startedAt: 1000,
          hatchesAt: 2000,
        },
      ],
    })
    window.localStorage.setItem('egg', stored)

    const eggs = useEggStore()
    expect(eggs.incubator.length).toBe(1)
    const egg = eggs.incubator[0]
    expect(egg.startedAt).toBe(1000)
    expect(egg.hatchesAt).toBe(2000)
    expect(egg.base.id).toBe(allShlagemons[0].id)
  })
})
