import { createPinia, setActivePinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { describe, expect, it } from 'vitest'
import { createApp } from 'vue'
import { allShlagemons } from '../src/data/shlagemons'
import { useEggStore } from '../src/stores/egg'
import { eggSerializer } from '../src/utils/egg-serialize'

describe('egg persistence', () => {
  it('restores incubator from storage', () => {
    const pinia = createPinia()
    pinia.use(piniaPluginPersistedstate)
    const app = createApp({})
    app.use(pinia)
    setActivePinia(pinia)

    const stored = eggSerializer.serialize({
      incubator: [
        {
          id: 1,
          type: 'feu',
          base: allShlagemons[0],
          rarity: 42,
          startedAt: 1000,
          hatchesAt: 2000,
          isBreeding: true,
          forcedMonId: allShlagemons[0].id,
          forcedRarity: 200,
        },
      ],
    })
    window.localStorage.setItem('egg', stored)

    const eggs = useEggStore()
    expect(eggs.incubator.length).toBe(1)
    const egg = eggs.incubator[0]
    expect(egg.startedAt).toBe(1000)
    expect(egg.hatchesAt).toBe(2000)
    expect(egg.rarity).toBe(42)
    expect(egg.base.id).toBe(allShlagemons[0].id)
    expect(egg.isBreeding).toBe(true)
    expect(egg.forcedMonId).toBe(allShlagemons[0].id)
    expect(egg.forcedRarity).toBe(100)
  })

  it('restores legacy incubator without breeding metadata', () => {
    const pinia = createPinia()
    pinia.use(piniaPluginPersistedstate)
    const app = createApp({})
    app.use(pinia)
    setActivePinia(pinia)

    const legacy = JSON.stringify([
      {
        id: 1,
        type: 'feu',
        baseId: allShlagemons[0].id,
        rarity: 42,
        startedAt: 1000,
        hatchesAt: 2000,
      },
    ])
    window.localStorage.setItem('egg', legacy)

    const eggs = useEggStore()
    expect(eggs.incubator.length).toBe(1)
    const egg = eggs.incubator[0]
    expect(egg.startedAt).toBe(1000)
    expect(egg.hatchesAt).toBe(2000)
    expect(egg.rarity).toBe(42)
    expect(egg.base.id).toBe(allShlagemons[0].id)
    expect(egg.isBreeding).toBeUndefined()
    expect(egg.forcedMonId).toBeUndefined()
    expect(egg.forcedRarity).toBeUndefined()
  })
})
