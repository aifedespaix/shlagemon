import { createPinia, setActivePinia } from 'pinia'
import { describe, expect, it } from 'vitest'
import { nextTick } from 'vue'
import { useBallStore } from '../src/stores/ball'
import { useInventoryStore } from '../src/stores/inventory'

/**
 * Ensures the ball store automatically equips balls based on inventory changes.
 */
describe('ball store', () => {
  it('auto-equips a ball when bought without one equipped', async () => {
    setActivePinia(createPinia())
    const inventory = useInventoryStore()
    const store = useBallStore()

    expect(store.current).toBeNull()

    inventory.add('super-shlageball')
    await nextTick()

    expect(store.current).toBe('super-shlageball')
  })

  it('equips the next best ball after using the last one', async () => {
    setActivePinia(createPinia())
    const inventory = useInventoryStore()
    const store = useBallStore()

    inventory.add('hyper-shlageball')
    inventory.add('shlageball')
    await nextTick()
    expect(store.current).toBe('hyper-shlageball')

    inventory.remove('hyper-shlageball')
    await nextTick()
    expect(store.current).toBe('shlageball')

    inventory.remove('shlageball')
    await nextTick()
    expect(store.current).toBeNull()
  })
})
