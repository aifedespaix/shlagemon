import { createPinia, setActivePinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { beforeEach, describe, expect, it } from 'vitest'
import { createApp } from 'vue'
import { useAchievementsFilterStore } from '../src/stores/achievementsFilter'
import { useDexFilterStore } from '../src/stores/dexFilter'
import { useInventoryFilterStore } from '../src/stores/inventoryFilter'

function initPinia() {
  const pinia = createPinia()
  pinia.use(piniaPluginPersistedstate)
  const app = createApp({})
  app.use(pinia)
  setActivePinia(pinia)
}

describe('filter sort order persistence', () => {
  beforeEach(() => {
    window.localStorage.clear()
  })

  it('restores dex filter sort order', () => {
    window.localStorage.setItem('dexFilter', JSON.stringify({ search: '', sortBy: 'name', sortAsc: false }))
    initPinia()
    const filter = useDexFilterStore()
    expect(filter.sortBy).toBe('name')
    expect(filter.sortAsc).toBe(false)
  })

  it('restores inventory filter sort order', () => {
    window.localStorage.setItem('inventoryFilter', JSON.stringify({ search: '', sortBy: 'price', sortAsc: true, category: 'all' }))
    initPinia()
    const filter = useInventoryFilterStore()
    expect(filter.sortBy).toBe('price')
    expect(filter.sortAsc).toBe(true)
  })

  it('restores achievements filter sort order', () => {
    window.localStorage.setItem('achievementsFilter', JSON.stringify({ search: '', status: 'all', sortBy: 'date', sortAsc: true }))
    initPinia()
    const filter = useAchievementsFilterStore()
    expect(filter.sortBy).toBe('date')
    expect(filter.sortAsc).toBe(true)
  })
})
