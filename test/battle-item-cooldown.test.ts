import { createPinia, setActivePinia } from 'pinia'
import { describe, expect, it, vi } from 'vitest'
import { hyperPotion, potion, superPotion } from '../src/data/items'
import { useBattleItemCooldownStore } from '../src/stores/battleItemCooldown'
import { useInventoryStore } from '../src/stores/inventory'
import { useMainPanelStore } from '../src/stores/mainPanel'

describe('battle item cooldown', () => {
  it('prevents using multiple battle items during cooldown', async () => {
    vi.useFakeTimers()
    setActivePinia(createPinia())
    const inventory = useInventoryStore()
    const panel = useMainPanelStore()
    const cooldown = useBattleItemCooldownStore()

    panel.current = 'trainerBattle'
    inventory.add(potion.id, 1)
    inventory.add(superPotion.id, 1)

    expect(inventory.useItem(potion.id)).toBe(true)
    expect(cooldown.isActive).toBe(true)
    expect(inventory.useItem(superPotion.id)).toBe(false)
    await vi.advanceTimersByTimeAsync(3000)
    expect(cooldown.isActive).toBe(false)
    expect(inventory.useItem(superPotion.id)).toBe(true)
    cooldown.reset()
    vi.useRealTimers()
  })

  it('applies correct cooldowns for super and hyper potions', () => {
    vi.useFakeTimers()
    setActivePinia(createPinia())
    const inventory = useInventoryStore()
    const panel = useMainPanelStore()
    const cooldown = useBattleItemCooldownStore()

    panel.current = 'trainerBattle'
    inventory.add(superPotion.id, 1)
    inventory.add(hyperPotion.id, 1)

    expect(inventory.useItem(superPotion.id)).toBe(true)
    expect(cooldown.remaining).toBe(superPotion.battleCooldown)
    vi.advanceTimersByTime(superPotion.battleCooldown * 1000)
    expect(cooldown.isActive).toBe(false)

    expect(inventory.useItem(hyperPotion.id)).toBe(true)
    expect(cooldown.remaining).toBe(hyperPotion.battleCooldown)
    vi.advanceTimersByTime(hyperPotion.battleCooldown * 1000)
    expect(cooldown.isActive).toBe(false)
    cooldown.reset()
    vi.useRealTimers()
  })
})
